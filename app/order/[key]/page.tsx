import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { AlertIcon, ChevronLeft } from "@/components/icons";
import { formatMnt, isOrderableKey, ORDERABLE } from "@/lib/orderable";
import { OrderCard, OrderLayout, OrderSteps, ReceiptRow } from "../OrderMessage";
import { CheckoutForm } from "./CheckoutForm";

export const metadata: Metadata = {
  title: "Захиалга шалгах",
  robots: { index: false },
};

/** Byl-ийн хуудсанд асуух мэдээлэл — хэрэглэгч урьдчилан бэлдэнэ (feedforward) */
const ASKED = ["Овог, нэр", "Утасны дугаар", "Имэйл — баримт илгээнэ", "Хүргэлтийн хаяг"];

export default function OrderReviewPage({ params, searchParams }: PageProps<"/order/[key]">) {
  return (
    <OrderLayout>
      <OrderSteps current={1} />
      {/* params, searchParams нь request үеийн өгөгдөл тул Suspense дотор уншина */}
      <Suspense fallback={<OrderCard className="h-[640px] animate-pulse" />}>
        <Review params={params} searchParams={searchParams} />
      </Suspense>
    </OrderLayout>
  );
}

async function Review({
  params,
  searchParams,
}: {
  params: PageProps<"/order/[key]">["params"];
  searchParams: PageProps<"/order/[key]">["searchParams"];
}) {
  const [{ key }, { canceled }] = await Promise.all([params, searchParams]);
  if (!isOrderableKey(key)) notFound();
  const product = ORDERABLE[key];
  const amount = formatMnt(product.amount);

  return (
    <>
      {/* Feedback: Byl дээрээс цуцлаад буцсан бол юу болсныг тодорхой хэлнэ */}
      {canceled && (
        <div role="status" className="mb-4 flex items-start gap-2.5 rounded-card bg-white px-4 py-3 text-sm text-ink-2">
          <AlertIcon className="mt-px size-4 shrink-0 text-ink-3" />
          <p>
            <span className="font-medium text-ink">Төлбөр хийгдээгүй.</span> Та төлбөрийн хуудсыг цуцалсан. Бэлэн болсон
            үедээ доорх товчоор дахин оролдоно уу.
          </p>
        </div>
      )}

      <OrderCard>
        <div className="relative aspect-[16/9] bg-[#eef1f4]">
          <Image src={product.image} alt={product.alt} fill sizes="560px" className="object-cover" priority />
        </div>

        <div className="p-5 md:p-7">
          <p className="text-sm text-ink-3">{product.kind}</p>
          <h1 className="mt-0.5 font-display text-[28px]/9 font-medium tracking-[-.3px] text-ink">{product.title}</h1>

          {/* Metaphor: баримт — юу төлөхөө төлөхөөс өмнө харна */}
          <dl className="mt-5 divide-y divide-line/70 border-y border-line/70">
            <ReceiptRow label="Бүтээгдэхүүн">{product.title}</ReceiptRow>
            <ReceiptRow label="Төрөл">{product.kind}</ReceiptRow>
            <ReceiptRow label="Одоо төлөх урьдчилгаа" strong>
              {amount}
            </ReceiptRow>
          </dl>

          <div className="mt-5">
            <h2 className="text-sm font-medium text-ink">Дараагийн алхамд оруулах мэдээлэл</h2>
            <ul className="mt-2 grid grid-cols-1 gap-x-4 gap-y-1.5 text-sm text-ink-3 sm:grid-cols-2">
              {ASKED.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span aria-hidden="true" className="size-1 rounded-full bg-ink-3" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <ol className="mt-5 space-y-1 rounded-btn bg-gray-bg px-4 py-3 text-[13px]/5 text-ink-2">
            <li>1. Byl-ийн хуудсанд мэдээллээ оруулж, төлбөрийн хэлбэрээ сонгоно.</li>
            <li>2. Төлбөр орсны дараа энэ сайт руу автоматаар буцна.</li>
            <li>3. Захиалгын дугаар дэлгэцэнд гарч, баримт имэйлээр очно.</li>
          </ol>

          <div className="mt-6">
            <CheckoutForm productKey={key} amountLabel={amount} />
          </div>
        </div>
      </OrderCard>

      <Link
        href="/"
        className="mt-4 inline-flex items-center gap-1 rounded-btn py-2 text-sm text-ink-3 transition-colors hover:text-ink"
      >
        <ChevronLeft className="size-4" />
        Нүүр хуудас руу буцах
      </Link>
    </>
  );
}
