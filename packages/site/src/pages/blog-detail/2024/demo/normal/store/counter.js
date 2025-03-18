import { create } from "zustand";

export const useCounter = create((set) => ({
  count: 0,
  country: "zh-cn",
  increaseCount() {
    set((pre) => ({
      count: pre.count + 1,
    }));
  },
  updateCountry(country) {
    set({
      country,
    });
  },
}));
