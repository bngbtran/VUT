"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const CODE_RE = /^[A-Z0-9]{2}\d{1,4}[A-Z]?$/;

export function FlightSearch({ initial = "" }: { initial?: string }) {
  const router = useRouter();
  const [value, setValue] = useState(initial);
  const [error, setError] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const code = value.replace(/\s+/g, "").toUpperCase();
    if (!CODE_RE.test(code)) {
      setError(true);
      return;
    }
    router.push(`/flight/${code}`);
  }

  return (
    <form onSubmit={submit} className="w-full max-w-xl">
      <div
        className={`flex items-center gap-2 rounded-2xl bg-ink-900/80 p-1.5 ring-1 backdrop-blur transition ${
          error ? "ring-status-cancelled/60" : "ring-white/10 focus-within:ring-terracotta/60"
        }`}
      >
        <input
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            setError(false);
          }}
          placeholder="Mã chuyến bay, vd VN213"
          aria-label="Mã chuyến bay"
          aria-invalid={error}
          autoCapitalize="characters"
          className="min-w-0 flex-1 bg-transparent px-3 py-2.5 font-mono text-base tracking-wide text-bone uppercase placeholder:font-sans placeholder:tracking-normal placeholder:text-ink-500 placeholder:normal-case focus:outline-none"
        />
        <button
          type="submit"
          className="shrink-0 rounded-xl bg-terracotta px-5 py-2.5 text-sm font-semibold text-bone transition hover:brightness-110 active:scale-[0.98]"
        >
          Tra cứu
        </button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-status-cancelled">
          Mã chuyến gồm 2 ký tự hãng + số hiệu, vd VN213, VJ121.
        </p>
      )}
    </form>
  );
}
