import create from "zustand";

const useStore = create((set) => ({
   Login: false,
   setLogin: () => set((state) => ({ Login: true })),
   SearchUrl: "",
   setSearchUrl: (Url) => set({ SearchUrl: Url }),
}));

export default useStore;
