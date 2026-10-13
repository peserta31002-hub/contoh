"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  BookOpenCheck,
  CheckCircle2,
  Download,
  PencilLine,
  RefreshCcw,
  Sparkles,
  Target,
  Trophy,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Chip, Pseudo, SectionTitle } from "./ui";
import { CARDS, FINAL_MISSION } from "@/lib/gameData";
import { computeResults, buildCsv } from "@/lib/scoring";
import { useGame } from "@/lib/store";

export default function ResultsScreen() {
  const s = useGame();
  const r = useMemo(() => computeResults(s), [s]);
  const [openDiscuss, setOpenDiscuss] = useState(false);

  const downloadCsv = () => {
    const csv = buildCsv(s);
    const blob = new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `hasil-kdd-${(s.playerName || "siswa").replace(/\s+/g, "-").toLowerCase()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      {/* MISSION COMPLETE banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden rounded-3xl border border-[#ff7a1a]/30 bg-gradient-to-br from-[#ff7a1a]/12 via-transparent to-[#3bd6ff]/8 p-8 text-center"
      >
        <Sparkles className="mx-auto mb-3 h-10 w-10 text-[#ffd166]" />
        <p className="font-mono-code text-[11px] font-bold tracking-[0.35em] text-[#3bd6ff]">
          HALAMAN 7 • HASIL BELAJAR
        </p>
        <h2 className="mt-2 text-3xl font-black tracking-tight text-white sm:text-4xl">
          MISSION COMPLETE
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          {s.playerName ? `${s.playerName}, ` : ""}
          setiap langkahmu tadi punya konsekuensi — dan kamu menyelesaikannya.
        </p>
      </motion.div>

      {/* Skor utama */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6 text-center"
        >
          <Award className="mx-auto h-6 w-6 text-[#ff7a1a]" />
          <p className="mt-2 font-mono-code text-[11px] tracking-widest text-slate-400">
            SKOR AKHIR
          </p>
          <p className="mt-1 font-mono-code text-6xl font-black text-white">
            {r.score}
            <span className="text-xl text-slate-500">/100</span>
          </p>
          <div className="mt-3">
            {r.kktp ? (
              <Chip tone="mint">
                <CheckCircle2 className="h-3 w-3" /> MENCAPAI KKTP (≥ 70)
              </Chip>
            ) : (
              <Chip tone="coral">
                <XCircle className="h-3 w-3" /> BELUM MENCAPAI KKTP (≥ 70)
              </Chip>
            )}
          </div>
          <p className="mt-3 text-[11px] text-slate-500">
            {r.points} dari {r.maxPoints} poin • benar awal 10 poin, benar setelah revisi 6 poin,
            misi terakhir 10 poin
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="glass grid grid-cols-2 gap-3 rounded-2xl p-6"
        >
          <Stat
            icon={<BookOpenCheck className="h-4 w-4 text-[#3bd6ff]" />}
            value={`${r.cardsDone}/10`}
            label="Kartu selesai"
          />
          <Stat
            icon={<Target className="h-4 w-4 text-[#3ddc97]" />}
            value={`${r.firstCorrect}/10`}
            label="Jawaban awal benar"
          />
          <Stat
            icon={<PencilLine className="h-4 w-4 text-[#ffd166]" />}
            value={`${r.revisedCount}`}
            label="Jawaban direvisi"
          />
          <Stat
            icon={<RefreshCcw className="h-4 w-4 text-[#ff7a1a]" />}
            value={`${r.reasonQuality.sound}/${r.reasonQuality.total}`}
            label="Alasan berdasar"
          />
          <Stat
            icon={<Trophy className="h-4 w-4 text-[#ffd166]" />}
            value={s.finalDone ? (s.finalCorrect ? "LULUS" : "BELUM") : "—"}
            label="Final challenge"
          />
          <Stat
            icon={<RefreshCcw className="h-4 w-4 text-slate-400" />}
            value={`${s.finalTries}`}
            label="Percobaan final"
          />
        </motion.div>

        {/* Progress kemampuan */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16 }}
          className="glass rounded-2xl p-6"
        >
          <p className="font-mono-code text-[11px] font-bold tracking-widest text-slate-400">
            PROGRESS KEMAMPUAN
          </p>
          <div className="mt-4 space-y-4">
            {r.abilities.map((a, i) => (
              <div key={a.key}>
                <div className="mb-1 flex items-baseline justify-between gap-2">
                  <p className="text-sm font-semibold text-white">
                    {a.label}{" "}
                    <span className="font-mono-code text-[10px] text-slate-500">{a.bloom}</span>
                  </p>
                  <p className="font-mono-code text-xs text-slate-400">
                    {a.earned}/{a.max} • {a.pct}%
                  </p>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/5">
                  <motion.div
                    className={`h-full rounded-full ${
                      a.pct >= 70
                        ? "bg-gradient-to-r from-[#3ddc97] to-[#8cf5c7]"
                        : a.pct >= 40
                          ? "bg-gradient-to-r from-[#ff7a1a] to-[#ffb26b]"
                          : "bg-gradient-to-r from-[#ff5470] to-[#ff8aa0]"
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${a.pct}%` }}
                    transition={{ duration: 0.7, delay: 0.2 + i * 0.08 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Aksi */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Dialog open={openDiscuss} onOpenChange={setOpenDiscuss}>
          <DialogTrigger asChild>
            <Button size="lg" className="bg-[#3bd6ff] font-bold text-[#062029] hover:bg-[#5fe0ff]">
              <BookOpenCheck className="mr-1 h-4 w-4" /> LIHAT PEMBAHASAN
            </Button>
          </DialogTrigger>
          <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto border-white/10 bg-[#0c1528]">
            <DialogHeader>
              <DialogTitle className="text-white">Pembahasan Seluruh Kartu</DialogTitle>
              <DialogDescription className="text-xs text-slate-400">
                Kunci jawaban dan pembahasan setiap Kartu Dilema — bandingkan dengan pilihanmu untuk
                memperdalam pemahaman.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {CARDS.map((card) => {
                const rec = s.cards[card.id];
                const correct = card.options.find((o) => o.verdict === "optimal")!;
                return (
                  <div key={card.id} className="rounded-xl border border-white/10 bg-[#0e1a33]/70 p-4">
                    <div className="mb-2 flex flex-wrap items-center gap-2">
                      <Chip tone="ember">LEVEL {card.level}</Chip>
                      <p className="text-sm font-bold text-white">
                        {card.id} — {card.title}
                      </p>
                      {rec?.status === "done" ? (
                        rec.finalCorrect ? (
                          <Chip tone="mint">benar</Chip>
                        ) : (
                          <Chip tone="coral">belum tepat</Chip>
                        )
                      ) : (
                        <Chip tone="muted">belum dikerjakan</Chip>
                      )}
                    </div>
                    <div className="mb-3">
                      <Pseudo lines={correct.pseudo} compact />
                    </div>
                    <p className="text-xs leading-relaxed text-slate-300">{card.pembahasan}</p>
                  </div>
                );
              })}
              {s.finalDone && (
                <div className="rounded-xl border border-[#3ddc97]/25 bg-[#3ddc97]/6 p-4">
                  <p className="mb-2 text-sm font-bold text-white">
                    FINAL CHALLENGE — Mesin Air Mineral Cerdas
                  </p>
                  <p className="text-xs leading-relaxed text-slate-300">
                    {FINAL_MISSION.pembahasan}
                  </p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>

        <Button
          size="lg"
          variant="outline"
          onClick={downloadCsv}
          className="border-white/15 font-semibold text-slate-200 hover:text-white"
        >
          <Download className="mr-1 h-4 w-4" /> UNDUH DATA HASIL (CSV)
        </Button>

        <Button
          size="lg"
          onClick={() => s.setPhase("reflection")}
          className="bg-[#ff7a1a] font-bold text-[#1a0e05] hover:bg-[#ff8c3a]"
        >
          LANJUT: REFLEKSI AKHIR
        </Button>
      </div>

      <p className="mt-6 text-center text-[11px] text-slate-500">
        Data CSV ini dapat dilampirkan guru sebagai dokumen observasi Penelitian Tindakan Kelas
        (PTK): mencakup jawaban awal, revisi, kualitas argumen, dan refleksi.
      </p>
    </div>
  );
}

function Stat({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
      <p className="flex items-center gap-1.5 text-[10px] text-slate-400">
        {icon} {label.toUpperCase()}
      </p>
      <p className="mt-1 font-mono-code text-xl font-bold text-white">{value}</p>
    </div>
  );
}
