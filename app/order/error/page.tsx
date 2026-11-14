import type { Metadata } from "next";
import { OrderLayout, OrderMessage } from "../OrderMessage";

export const metadata: Metadata = {
  title: "Захиалга амжилтгүй",
  robots: { index: false },
};

export default function OrderErrorPage() {
  return (
    <OrderLayout>
      <OrderMessage title="Захиалга үүсгэж чадсангүй">
        Төлбөрийн хуудсыг нээхэд алдаа гарлаа. Түр хүлээгээд дахин оролдоно уу.
      </OrderMessage>
    </OrderLayout>
  );
}
