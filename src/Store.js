import create from "zustand";

const useStore = create((set) => ({
   Login: false,
   setLogin: () => set((state) => ({ Login: true })),
   setLogout: () => set((state) => ({ Login: false })),
   googleLoginInfo: {},
   setGoogleLoginInfo: (googleLoginInfo) =>
      set((state) => ({ googleLoginInfo: googleLoginInfo })),
}));

export default useStore;
