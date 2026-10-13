"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpenText,
  BrainCircuit,
  GitBranch,
  MousePointerClick,
  ShieldAlert,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGame } from "@/lib/store";

export default function LandingScreen() {
  const startGame = useGame((s) => s.startGame);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const begin = () => {
    if (name.trim().length < 2) {
      setError("Tulis namamu dulu (minimal 2 huruf) agar hasil belajarmu tercatat.");
      return;
    }
    startGame(name);
  };

  return (
    <div className="grid-dots relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      {/* glow dekoratif */}
      <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-[#ff7a1a]/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#3bd6ff]/10 blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-3xl"
      >
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
          <span className="rounded-md border border-[#3bd6ff]/30 bg-[#3bd6ff]/10 px-2.5 py-1 font-mono-code text-[11px] tracking-widest text-[#3bd6ff]">
            INFORMATIKA
          </span>
          <span className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono-code text-[11px] tracking-widest text-slate-300">
            KELAS X / FASE E
          </span>
          <span className="rounded-md border border-[#ff7a1a]/30 bg-[#ff7a1a]/10 px-2.5 py-1 font-mono-code text-[11px] tracking-widest text-[#ff7a1a]">
            X.AP.1 — NOTASI DAN PENULISAN ALGORITMA
          </span>
        </div>

        <div className="glass rounded-3xl p-8 text-center sm:p-12">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#ff7a1a] to-[#ffb26b] shadow-[0_0_40px_rgba(255,122,26,0.45)]">
            <GitBranch className="h-8 w-8 text-[#1a0e05]" />
          </div>

          <h1 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">
            KARTU DILEMA
            <span className="block bg-gradient-to-r from-[#ff7a1a] via-[#ffb26b] to-[#ff7a1a] bg-clip-text text-transparent text-glow-ember">
              DIGITAL
            </span>
          </h1>
          <p className="mt-3 font-mono-code text-sm font-semibold tracking-[0.35em] text-[#3bd6ff] text-glow-volt sm:text-base">
            ALGORITHM QUEST
          </p>
          <p className="mt-4 text-base italic text-slate-300 sm:text-lg">
            &ldquo;Setiap langkah punya konsekuensi.&rdquo;
          </p>

          <div className="mx-auto mt-8 grid max-w-xl gap-3 sm:grid-cols-3">
            {[
              { icon: MousePointerClick, t: "Pilih algoritma", d: "Baca, bandingkan, dan kunci pilihanmu beserta alasannya." },
              { icon: ShieldAlert, t: "Lihat konsekuensinya", d: "Simulasi menunjukkan apa yang benar-benar terjadi." },
              { icon: TrendingUp, t: "Perbaiki & tumbuh", d: "Revisi setelah feedback, ukur kemampuanmu." },
            ].map((f) => (
              <div key={f.t} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left">
                <f.icon className="mb-2 h-5 w-5 text-[#ff7a1a]" />
                <p className="text-sm font-semibold text-white">{f.t}</p>
                <p className="mt-1 text-[11px] leading-relaxed text-slate-400">{f.d}</p>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-md">
            <label
              htmlFor="player-name"
              className="mb-2 block text-left text-xs font-medium tracking-wide text-slate-400"
            >
              NAMAMU (UNTUK PENCATATAN HASIL)
            </label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                id="player-name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && begin()}
                placeholder="cth. Nadia Putri"
                className="h-11 border-white/15 bg-[#0b1425] text-white placeholder:text-slate-600"
                maxLength={40}
              />
              <Button
                onClick={begin}
                size="lg"
                className="pulse-ring h-11 bg-[#ff7a1a] px-6 font-bold text-[#1a0e05] hover:bg-[#ff8c3a]"
              >
                MULAI MISI <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
            {error && <p className="mt-2 text-left text-xs text-[#ff5470]">{error}</p>}
          </div>

          <div className="mt-8 flex items-center justify-center gap-2 text-[11px] text-slate-500">
            <BrainCircuit className="h-3.5 w-3.5" />
            <span>
              Media tindakan PTK: meningkatkan kemampuan berpikir algoritmik pada materi Notasi dan
              Penulisan Algoritma
            </span>
          </div>
        </div>

        <p className="mt-5 flex items-center justify-center gap-1.5 text-center text-[11px] text-slate-500">
          <BookOpenText className="h-3.5 w-3.5" />
          Berbasis Modul Ajar X.AP.1 • Problem-Based Learning dengan Kartu Dilema Digital
        </p>
      </motion.div>
    </div>
  );
}
