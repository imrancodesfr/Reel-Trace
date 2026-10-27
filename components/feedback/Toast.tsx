"use client";

import { useReeltrace } from "@/lib/context/reeltrace-context";

export default function Toast() {
  const { toastMessage } = useReeltrace();

  return (
    <div
      className={`toast ${toastMessage ? "show" : ""}`}
      role="status"
      aria-live="polite"
    >
      {toastMessage}
    </div>
  );
}
