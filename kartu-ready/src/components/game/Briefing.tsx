"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Compass,
  Lightbulb,
  ListOrdered,
  ShieldQuestion,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FlowStep, SectionTitle } from "./ui";
import { NOTATION_BRIEF } from "@/lib/gameData";
import { useGame } from "@/lib/store";

export default function BriefingScreen() {
  const setPhase = useGame((s) => s.setPhase);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:py-12">
      <SectionTitle
        eyebrow="BRIEFING MISI"
        title="Sebelum berangkat, pahami medannya"
        desc="Tiga hal singkat: apa itu algoritma, kenapa urutan berarti hidup-mati bagi sebuah solusi, dan bagaimana cara memainkan Kartu Dilema Digital."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="glass rounded-2xl p-6"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#3bd6ff]/12">
            <Compass className="h-5 w-5 text-[#3bd6ff]" />
          </div>
          <h3 className="text-lg font-bold text-white">Apa itu algoritma?</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            Algoritma adalah <span className="text-[#3bd6ff]">urutan langkah yang logis dan
            sistematis</span> untuk menyelesaikan masalah — seperti resep, arah rute, atau langkah
            login ke aplikasi. Di komputer, algoritma dituliskan dengan{" "}
            <span className="text-[#3bd6ff]">notasi</span> supaya jelas, runtut, dan tidak ambigu.
          </p>
          <div className="mt-4 rounded-lg border border-white/10 bg-[#050a18] p-3 font-mono-code text-[12px] leading-relaxed text-slate-300">
            <p className="text-[#ff7a1a]">MULAI</p>
            <p>INPUT suara</p>
            <p>IF suara = "ya" THEN</p>
            <p className="pl-3">OUTPUT "Presensi tercatat"</p>
            <p className="text-[#ff7a1a]">SELESAI</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="glass rounded-2xl p-6"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#ff7a1a]/12">
            <Lightbulb className="h-5 w-5 text-[#ff7a1a]" />
          </div>
          <h3 className="text-lg font-bold text-white">Kenapa urutan penting?</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            Karena setiap langkah <span className="text-[#ff7a1a]">menyiapkan kondisi</span> untuk
            langkah berikutnya. Tukar dua langkah yang saling bergantung — misalnya{" "}
            <span className="text-slate-100">mengaduk sebelum menuang air panas</span> — dan hasilnya
            langsung kacau. Algoritma yang baik: logis, runtut, jelas, dan tidak ambigu.
          </p>
          <div className="mt-4 space-y-2 text-[12px]">
            <p className="rounded-md border border-[#3ddc97]/25 bg-[#3ddc97]/8 px-3 py-2 text-[#3ddc97]">
              ✓ Rebus air → Tuang → Aduk → jadi teh manis
            </p>
            <p className="rounded-md border border-[#ff5470]/25 bg-[#ff5470]/8 px-3 py-2 text-[#ff5470]">
              ✗ Aduk → Rebus → Tuang → gelas kosong teraduk
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.19 }}
          className="glass rounded-2xl p-6"
        >
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#3ddc97]/12">
            <ListOrdered className="h-5 w-5 text-[#3ddc97]" />
          </div>
          <h3 className="text-lg font-bold text-white">Notasi yang akan kamu temui</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">
            Fokusnya pada <span className="text-[#3ddc97]">makna</span>, bukan sintaks bahasa
            pemrograman tertentu. Enam notasi ini cukup untuk seluruh misi:
          </p>
          <div className="mt-3 space-y-1.5">
            {NOTATION_BRIEF.map((n) => (
              <div
                key={n.notation}
                className="flex items-baseline gap-2 rounded-md border border-white/10 bg-white/[0.03] px-2.5 py-1.5"
              >
                <span className="shrink-0 font-mono-code text-[11px] font-bold text-[#ff7a1a]">
                  {n.notation}
                </span>
                <span className="text-[11px] text-slate-400">{n.meaning}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.26 }}
        className="mt-6 rounded-2xl border border-[#ff7a1a]/25 bg-gradient-to-br from-[#ff7a1a]/8 to-transparent p-6"
      >
        <div className="mb-4 flex items-center gap-2">
          <ShieldQuestion className="h-5 w-5 text-[#ff7a1a]" />
          <h3 className="text-lg font-bold text-white">Cara memainkan Kartu Dilema</h3>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <FlowStep
            n={1}
            label="Kenali skenario & pilih"
            desc="Baca masalah yang dekat dengan hidupmu, bandingkan 2–3 alternatif algoritma, pilih yang paling tepat."
          />
          <FlowStep
            n={2}
            label="Komitmen: kunci alasannya"
            desc="Tuliskan atau pilih alasanmu SEBELUM melihat hasil. Berpikir dulu, bukan menebak."
          />
          <FlowStep
            n={3}
            label="Saksikan konsekuensinya"
            desc="Simulasi menunjukkan apa yang terjadi jika algoritma itu dijalankan — bukan sekadar benar/salah."
          />
          <FlowStep
            n={4}
            label="Feedback, revisi, refleksi"
            desc="Cek bagian yang benar dan yang bermasalah, perbaiki pilihanmu, lalu refleksikan."
          />
        </div>
      </motion.div>

      <div className="mt-8 flex justify-end">
        <Button
          onClick={() => setPhase("tutorial")}
          size="lg"
          className="bg-[#ff7a1a] font-bold text-[#1a0e05] hover:bg-[#ff8c3a]"
        >
          LANJUT KE TUTORIAL <ArrowRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
