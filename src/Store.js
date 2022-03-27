import create from "zustand";

const useStore = create((set) => ({
   Login: false,
   setLogin: () => set((state) => ({ Login: true })),
   setLogout: () => set((state) => ({ Login: false })),
}));

export default useStore;
