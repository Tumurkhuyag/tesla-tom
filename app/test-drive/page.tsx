import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { AlertIcon, ChevronLeft } from "@/components/icons";
import { formatMnt, ORDERABLE, TEST_DRIVE_KEY } from "@/lib/orderable";
import { getTestDriveVehicles } from "@/lib/product-cards";
import { OrderCard, OrderLayout, OrderSteps, TEST_DRIVE_STEPS } from "../order/OrderMessage";
import { VehiclePicker } from "./VehiclePicker";

export const metadata: Metadata = {
  title: "Туршилтын жолоодлого",
  description: "Туршиж үзэх Tesla-гаа сонгоод цагаа захиална уу.",
};

/** Byl-ийн хуудсанд асуух мэдээлэл — хэрэглэгч урьдчилан бэлдэнэ (feedforward) */
const ASKED = ["Овог, нэр", "Утасны дугаар", "Имэйл — баримт илгээнэ"];

export default function TestDrivePage({ searchParams }: PageProps<"/test-drive">) {
  return (
    <OrderLayout>
      <OrderSteps current={1} steps={TEST_DRIVE_STEPS} />
      {/* searchParams нь request үеийн өгөгдөл тул Suspense дотор уншина */}
      <Suspense fallback={<OrderCard className="h-[640px] animate-pulse" />}>
        <TestDrive searchParams={searchParams} />
      </Suspense>
    </OrderLayout>
  );
}

async function TestDrive({ searchParams }: { searchParams: PageProps<"/test-drive">["searchParams"] }) {
  const [{ car, canceled }, vehicles] = await Promise.all([searchParams, getTestDriveVehicles()]);
  const amount = formatMnt(ORDERABLE[TEST_DRIVE_KEY].amount);
  const initial = typeof car === "string" && vehicles.some((v) => v.title === car) ? car : null;

  return (
    <>
      {/* Feedback: Byl дээрээс цуцлаад буцсан бол юу болсныг тодорхой хэлнэ */}
      {canceled && (
        <div role="status" className="mb-4 flex items-start gap-2.5 rounded-card bg-white px-4 py-3 text-sm text-ink-2">
          <AlertIcon className="mt-px size-4 shrink-0 text-ink-3" />
          <p>
            <span className="font-medium text-ink">Төлбөр хийгдээгүй.</span> Та төлбөрийн хуудсыг цуцалсан. Бэлэн болсон
            үедээ дахин оролдоно уу.
          </p>
        </div>
      )}

      <OrderCard className="p-5 md:p-7">
        <h1 className="font-display text-[28px]/9 font-medium tracking-[-.3px] text-ink">Туршилтын жолоодлого</h1>
        <p className="mt-1 text-sm/6 text-ink-3">
          Туршиж үзэх машинаа сонгоод {amount} баталгааны төлбөр төлсний дараа өөрт тохирох цагаа захиална.
        </p>

        {vehicles.length === 0 ? (
          <p className="mt-6 rounded-btn bg-gray-bg px-4 py-3 text-sm text-ink-2">
            Одоогоор туршилтын жолоодлогод бэлэн машин алга. Удахгүй дахин шалгана уу.
          </p>
        ) : (
          <VehiclePicker vehicles={vehicles} initial={initial} amountLabel={amount}>
            <div>
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

            <ol className="space-y-1 rounded-btn bg-gray-bg px-4 py-3 text-[13px]/5 text-ink-2">
              <li>1. Byl-ийн хуудсанд мэдээллээ оруулж, {amount} төлнө.</li>
              <li>2. Төлбөр орсны дараа энэ сайт руу автоматаар буцна.</li>
              <li>3. Сонгосон машиныхаа туршилтын цагийг календараас сонгоно.</li>
            </ol>
          </VehiclePicker>
        )}
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
