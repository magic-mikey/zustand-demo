import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface BearState {
  bears: number;
  food: number;
  addABear: () => void;
  removeABear: () => void;
  addFood: () => void;
  removeFood: () => void;
}

export const useBearStore = create<BearState>()(
  persist(
    (set, get) => ({
      bears: 0,
      food: 0,
      addABear: () => set({ bears: get().bears + 1 }),
      removeABear: () => set({ bears: get().bears - 1 }),
      addFood: () => set({ food: get().food + 1 }),
      removeFood: () => set({ food: get().food - 1 }),
    }),
    {
      name: "food-storage", // name of item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default the 'localStorage' is used
      partialize: (state) => ({ bears: state.bears }),
      onRehydrateStorage: (state) => {
        console.log(state);
        console.log("hydration starts");
        return (state, error) => {
          if (error) {
            console.log("an error happened during hydration", error);
          } else {
            console.log(state);
            console.log("hydration finished");
          }
        };
      },
    }
  )
);
