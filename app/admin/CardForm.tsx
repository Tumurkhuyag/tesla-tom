"use client";

import { startTransition, useActionState, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import type { AdminCard } from "@/lib/admin";
import {
  BUTTON_VARIANTS,
  IMAGE_BUCKET,
  IMAGE_MAX_BYTES,
  IMAGE_MIME_TYPES,
  isAllowedImageUrl,
  MAX_BUTTONS,
  type FormState,
} from "@/lib/admin-shared";
import { cn } from "@/lib/cn";
import { createSupabaseBrowserClient } from "@/lib/supabase-browser";
import { saveVehicleCard } from "./actions";
import { inputClass, labelClass, primaryButtonClass, secondaryButtonClass } from "./ui";

const EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
};

const VARIANT_LABELS: Record<(typeof BUTTON_VARIANTS)[number], string> = {
  primary: "Primary (улаан)",
  light: "Light (цагаан)",
  dark: "Dark (хар)",
  ghost: "Ghost (саарал)",
};

export function CardForm({ card }: { card: AdminCard }) {
  const [state, formAction, pending] = useActionState<FormState, FormData>(saveVehicleCard, { status: "idle" });
  const [image, setImage] = useState(card.image);
  const [dirty, setDirty] = useState(false);
  const [upload, setUpload] = useState<{ status: "idle" | "uploading" } | { status: "error"; message: string }>({
    status: "idle",
  });
  const fileInput = useRef<HTMLInputElement>(null);
  const p = `card-${card.id}`;

  /** Сонгосон зургийг Supabase Storage руу upload хийж, URL талбарыг шинэчилнэ (хадгалах товч дарах хүртэл картад орохгүй) */
  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    e.stopPropagation();
    const file = e.target.files?.[0];
    e.target.value = ""; // ижил файлыг дахин сонгож болно
    if (!file) return;

    if (!IMAGE_MIME_TYPES.includes(file.type)) {
      setUpload({ status: "error", message: "Зөвхөн JPG, PNG, WebP, AVIF зураг оруулна уу." });
      return;
    }
    if (file.size > IMAGE_MAX_BYTES) {
      setUpload({ status: "error", message: `Зураг ${IMAGE_MAX_BYTES / 1024 / 1024}MB-аас бага байх ёстой.` });
      return;
    }

    setUpload({ status: "uploading" });
    const supabase = createSupabaseBrowserClient();
    const path = `vehicle/${card.id}-${Date.now()}.${EXTENSIONS[file.type]}`;
    const { error } = await supabase.storage
      .from(IMAGE_BUCKET)
      .upload(path, file, { contentType: file.type, cacheControl: "31536000", upsert: false });

    if (error) {
      setUpload({ status: "error", message: `Upload амжилтгүй: ${error.message}` });
      return;
    }

    setImage(supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path).data.publicUrl);
    setDirty(true);
    setUpload({ status: "idle" });
  }

  // <form action> нь React 19-д хадгалалтын дараа формыг цэвэрлэдэг. Алдаа гарахад оруулсан утга алга болохгүйн тулд
  // onSubmit-ээр action-ыг дуудна.
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setDirty(false);
    startTransition(() => formAction(formData));
  }

  const buttonSlots = Array.from({ length: MAX_BUTTONS }, (_, i) => card.buttons[i]);

  return (
    <form
      onSubmit={handleSubmit}
      onChange={() => setDirty(true)}
      aria-labelledby={`${p}-heading`}
      className="overflow-hidden rounded-card bg-white"
    >
      <input type="hidden" name="id" value={card.id} />

      <div className="flex items-center justify-between gap-4 border-b border-line px-5 py-4 md:px-6">
        <h2 id={`${p}-heading`} className="flex min-w-0 items-center gap-2 text-base font-medium">
          <span className="truncate">{card.title}</span>
          {!card.is_published && (
            <span className="shrink-0 rounded-full bg-gray-bg px-2 py-0.5 text-xs font-normal text-ink-3">Нуусан</span>
          )}
        </h2>
        <span className="shrink-0 text-xs text-ink-3">#{card.id}</span>
      </div>

      <div className="grid gap-6 p-5 md:grid-cols-[240px_1fr] md:p-6">
        {/* Зургийн урьдчилсан харагдац */}
        <div>
          <div className="relative aspect-4/5 overflow-hidden rounded-card bg-gray-bg">
            {upload.status === "uploading" && (
              <div className="absolute inset-0 z-1 flex items-center justify-center bg-white/70 text-sm text-ink-2">
                Upload хийж байна…
              </div>
            )}
            {isAllowedImageUrl(image) ? (
              // Admin-д засварлах үед дурын URL-ийг шууд харуулна (next/image-ийн домэйн шалгалтгүй)
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="flex h-full items-center justify-center p-4 text-center text-xs text-ink-3">
                Зургийн URL зөвшөөрөгдсөн домэйноос биш байна
              </div>
            )}
          </div>

          <input
            ref={fileInput}
            type="file"
            accept={IMAGE_MIME_TYPES.join(",")}
            onChange={handleFile}
            className="hidden"
            aria-hidden="true"
            tabIndex={-1}
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              disabled={upload.status === "uploading" || pending}
              className={cn(secondaryButtonClass, "flex-1 disabled:opacity-60")}
            >
              Зураг солих
            </button>
            {image !== card.image && (
              <button
                type="button"
                onClick={() => {
                  setImage(card.image);
                  setUpload({ status: "idle" });
                }}
                className={cn(secondaryButtonClass, "px-3")}
              >
                Буцаах
              </button>
            )}
          </div>
          <p className={cn("mt-2 text-xs", upload.status === "error" ? "text-red-700" : "text-ink-3")} aria-live="polite">
            {upload.status === "error"
              ? upload.message
              : image !== card.image
                ? "Шинэ зураг. Картад оруулахын тулд «Хадгалах» дарна уу."
                : "JPG, PNG, WebP, AVIF · 5MB хүртэл · босоо 4:5 харьцаа тохиромжтой"}
          </p>
        </div>

        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field id={`${p}-title`} label="Гарчиг *">
              <input id={`${p}-title`} name="title" defaultValue={card.title} required maxLength={120} className={inputClass} />
            </Field>
            <Field id={`${p}-eyebrow`} label="Eyebrow (дээд жижиг текст)">
              <input id={`${p}-eyebrow`} name="eyebrow" defaultValue={card.eyebrow ?? ""} maxLength={120} className={inputClass} />
            </Field>
          </div>

          <fieldset className="grid gap-4 sm:grid-cols-[1fr_1fr_96px]">
            <legend className="sr-only">Доод мөр</legend>
            <Field id={`${p}-sub_text`} label="Доод мөр (үнэ, тайлбар)">
              <input id={`${p}-sub_text`} name="sub_text" defaultValue={card.sub_text ?? ""} maxLength={200} className={inputClass} />
            </Field>
            <Field id={`${p}-sub_href`} label="Доод мөрийн холбоос">
              <input
                id={`${p}-sub_href`}
                name="sub_href"
                type="text"
                inputMode="url"
                defaultValue={card.sub_href ?? ""}
                placeholder="https://…"
                className={inputClass}
              />
            </Field>
            <Field id={`${p}-sub_footnote`} label="Зүүлт №">
              <input
                id={`${p}-sub_footnote`}
                name="sub_footnote"
                type="number"
                min={1}
                max={99}
                defaultValue={card.sub_footnote ?? ""}
                className={inputClass}
              />
            </Field>
          </fieldset>

          <div className="grid gap-4 sm:grid-cols-[1fr_1fr]">
            <Field id={`${p}-image`} label="Зургийн URL *">
              <input
                id={`${p}-image`}
                name="image"
                type="url"
                required
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className={inputClass}
              />
            </Field>
            <Field id={`${p}-alt`} label="Зургийн тайлбар (alt) *">
              <input id={`${p}-alt`} name="alt" defaultValue={card.alt} required maxLength={200} className={inputClass} />
            </Field>
          </div>

          <fieldset>
            <legend className={labelClass}>Товчнууд (текст, холбоос хоёул хоосон бол товч харагдахгүй)</legend>
            <div className="space-y-2">
              {buttonSlots.map((btn, i) => (
                <div key={i} className="grid gap-2 sm:grid-cols-[140px_1fr_150px]">
                  <input
                    name={`button_${i}_label`}
                    aria-label={`Товч ${i + 1}-ийн текст`}
                    defaultValue={btn?.label ?? ""}
                    placeholder={`Товч ${i + 1}`}
                    maxLength={40}
                    className={inputClass}
                  />
                  <input
                    name={`button_${i}_href`}
                    aria-label={`Товч ${i + 1}-ийн холбоос`}
                    type="text"
                    inputMode="url"
                    defaultValue={btn?.href ?? ""}
                    placeholder="https://…"
                    className={inputClass}
                  />
                  <select
                    name={`button_${i}_variant`}
                    aria-label={`Товч ${i + 1}-ийн загвар`}
                    defaultValue={btn?.variant ?? (i === 0 ? "primary" : "light")}
                    className={inputClass}
                  >
                    {BUTTON_VARIANTS.map((v) => (
                      <option key={v} value={v}>
                        {VARIANT_LABELS[v]}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </fieldset>

          <div className="flex flex-wrap items-end gap-4">
            <Field id={`${p}-position`} label="Дараалал" className="w-28">
              <input
                id={`${p}-position`}
                name="position"
                type="number"
                min={0}
                max={999}
                required
                defaultValue={card.position}
                className={inputClass}
              />
            </Field>
            <label className="flex h-10 cursor-pointer items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="is_published"
                defaultChecked={card.is_published}
                className="size-4 accent-blue"
              />
              Сайт дээр харуулах
            </label>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-4 border-t border-line bg-[#fafafa] px-5 py-3 md:px-6">
        <p aria-live="polite" className={cn("mr-auto text-sm", state.status === "error" ? "text-red-700" : "text-ink-3")}>
          {pending
            ? "Хадгалж байна…"
            : dirty
              ? "Хадгалаагүй өөрчлөлт байна"
              : state.status === "error"
                ? state.message
                : state.status === "saved"
                  ? `Хадгалагдлаа · ${new Date(state.at).toLocaleTimeString("mn-MN", { hour: "2-digit", minute: "2-digit" })}`
                  : ""}
        </p>
        <button type="submit" disabled={pending} className={primaryButtonClass}>
          Хадгалах
        </button>
      </div>
    </form>
  );
}

function Field({ id, label, className, children }: { id: string; label: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      {children}
    </div>
  );
}
