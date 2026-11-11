import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Нэвтрэх | Admin",
};

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-[calc(100dvh-72px)] items-center justify-center bg-gray-bg px-4 py-12">
      <div className="w-full max-w-sm rounded-card bg-white p-8 shadow-[0_8px_32px_rgba(0,0,0,.06)]">
        <h1 className="font-display text-2xl font-medium">Admin</h1>
        <p className="mt-1 text-sm text-ink-3">Картуудыг засахын тулд нэвтэрнэ үү.</p>
        <LoginForm />
      </div>
    </main>
  );
}
