import { StoreApi } from "zustand";
import { AuthSlice } from "../auth.slice";

export const logoutFlow = async (
  set: StoreApi<AuthSlice>["setState"],
  get: StoreApi<AuthSlice>["getState"]
) => {
  localStorage.removeItem("tokens");

  set((state) => ({
    auth: {
      ...state.auth,
      tokens: undefined,
      decodedAccessToken: undefined,
      decodedIdToken: undefined,
    },
  }));
};
