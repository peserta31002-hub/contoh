"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CARDS } from "./gameData";

export type Phase =
  | "landing"
  | "briefing"
  | "tutorial"
  | "cards"
  | "lab"
  | "final"
  | "results"
  | "reflection";

export interface CardRecord {
  status: "not" | "done";
  firstChoice?: string;
  firstReasonId?: string;
  firstReasonText?: string;
  revised: boolean;
  revisedChoice?: string;
  revisedReasonId?: string;
  revisedReasonText?: string;
  finalChoice?: string;
  firstCorrect: boolean;
  finalCorrect: boolean;
  miniReflection?: string;
}

interface GameState {
  phase: Phase;
  playerName: string;
  tutorialDone: boolean;
  cards: Record<string, CardRecord>;
  activeCard: string | null;
  lab1Done: boolean;
  lab2Done: boolean;
  finalDone: boolean;
  finalCorrect: boolean;
  finalTries: number;
  survey: { q1: string; q2: string; q3: string; saved: boolean };

  setPhase: (p: Phase) => void;
  startGame: (name: string) => void;
  completeTutorial: () => void;
  openCard: (id: string) => void;
  backToMap: () => void;
  saveCardAttempt: (
    cardId: string,
    data: {
      choice: string;
      reasonId?: string;
      reasonText?: string;
      isRevised: boolean;
      correct: boolean;
    }
  ) => void;
  finishCard: (cardId: string, miniReflection: string) => void;
  completeLab: (taskId: string) => void;
  completeFinal: (correct: boolean) => void;
  saveSurvey: (q1: string, q2: string, q3: string) => void;
  resetAll: () => void;
}

export const emptyCard = (): CardRecord => ({
  status: "not",
  revised: false,
  firstCorrect: false,
  finalCorrect: false,
});

const initialCards = (): Record<string, CardRecord> => {
  const obj: Record<string, CardRecord> = {};
  for (const c of CARDS) obj[c.id] = emptyCard();
  return obj;
};

export const useGame = create<GameState>()(
  persist(
    (set, get) => ({
      phase: "landing",
      playerName: "",
      tutorialDone: false,
      cards: initialCards(),
      activeCard: null,
      lab1Done: false,
      lab2Done: false,
      finalDone: false,
      finalCorrect: false,
      finalTries: 0,
      survey: { q1: "", q2: "", q3: "", saved: false },

      setPhase: (phase) => set({ phase }),

      startGame: (name) => set({ playerName: name.trim(), phase: "briefing" }),

      completeTutorial: () => set({ tutorialDone: true, phase: "cards" }),

      openCard: (id) => set({ activeCard: id, phase: "cards" }),

      backToMap: () => set({ activeCard: null }),

      saveCardAttempt: (cardId, data) => {
        const cards = { ...get().cards };
        const rec = cards[cardId] ?? emptyCard();
        if (!data.isRevised) {
          rec.firstChoice = data.choice;
          rec.firstReasonId = data.reasonId;
          rec.firstReasonText = data.reasonText;
          rec.firstCorrect = data.correct;
          rec.finalChoice = data.choice;
          rec.finalCorrect = data.correct;
        } else {
          rec.revised = true;
          rec.revisedChoice = data.choice;
          rec.revisedReasonId = data.reasonId;
          rec.revisedReasonText = data.reasonText;
          rec.finalChoice = data.choice;
          rec.finalCorrect = data.correct;
        }
        cards[cardId] = rec;
        set({ cards });
      },

      finishCard: (cardId, miniReflection) => {
        const cards = { ...get().cards };
        const rec = cards[cardId] ?? emptyCard();
        rec.status = "done";
        rec.miniReflection = miniReflection;
        cards[cardId] = rec;
        set({ cards });
      },

      completeLab: (taskId) =>
        set((s) => ({
          lab1Done: taskId === "lab1" ? true : s.lab1Done,
          lab2Done: taskId === "lab2" ? true : s.lab2Done,
        })),

      completeFinal: (correct) =>
        set((s) => ({
          finalDone: true,
          finalCorrect: correct,
          finalTries: s.finalTries + 1,
        })),

      saveSurvey: (q1, q2, q3) =>
        set({ survey: { q1, q2, q3, saved: true } }),

      resetAll: () =>
        set({
          phase: "landing",
          playerName: "",
          tutorialDone: false,
          cards: initialCards(),
          activeCard: null,
          lab1Done: false,
          lab2Done: false,
          finalDone: false,
          finalCorrect: false,
          finalTries: 0,
          survey: { q1: "", q2: "", q3: "", saved: false },
        }),
    }),
    {
      name: "kartu-dilema-digital-v1",
    }
  )
);

// ---------- Helpers unlock & progress ----------
export function isCardDone(s: GameState, id: string): boolean {
  return s.cards[id]?.status === "done";
}

export function isLevelUnlocked(s: GameState, level: number): boolean {
  if (level === 1) return s.tutorialDone;
  return LEVEL_DONE(s, level - 1);
}

export function LEVEL_DONE(s: GameState, level: number): boolean {
  return CARDS.filter((c) => c.level === level).every((c) =>
    isCardDone(s, c.id)
  );
}

export function allCardsDone(s: GameState): boolean {
  return CARDS.every((c) => isCardDone(s, c.id));
}

export function isLabUnlocked(s: GameState): boolean {
  return allCardsDone(s);
}

export function isLabTaskUnlocked(s: GameState, idx: number): boolean {
  if (idx === 0) return isLabUnlocked(s);
  return s.lab1Done;
}

export function isFinalUnlocked(s: GameState): boolean {
  return s.lab1Done && s.lab2Done;
}

export function isResultsUnlocked(s: GameState): boolean {
  return s.finalDone;
}

export function cardsDoneCount(s: GameState): number {
  return CARDS.filter((c) => isCardDone(s, c.id)).length;
}
