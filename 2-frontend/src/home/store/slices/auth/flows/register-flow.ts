import { StoreApi } from "zustand";
import { AuthSlice } from "../auth.slice";
import { registerService } from "../../../../services/auth.service";
import { jwtDecode } from "jwt-decode";

export const registerFlow = async (
  set: StoreApi<AuthSlice>["setState"],
  get: StoreApi<AuthSlice>["getState"],
  email: string,
  password: string
) => {
  try {
    const res = await registerService(email, password);

    console.log("register RESPONSE::::");
    console.log(res);

    const decodedAccessToken = jwtDecode(res.AuthenticationResult.AccessToken);
    const decodedIdToken = jwtDecode(res.AuthenticationResult.IdToken);
    const tokens = { ...res.AuthenticationResult, decodedAccessToken };
    localStorage.setItem("tokens", JSON.stringify(tokens));

    set((state) => ({
      auth: {
        ...state.auth,
        tokens,
        decodedAccessToken,
        decodedIdToken,
      },
    }));
  } catch (err) {
    set((state) => ({
      auth: {
        ...state.auth,
        tokens: undefined,
        decodedAccessToken: undefined,
        decodedIdToken: undefined,
        error: err,
      },
    }));
    return err;
  }
};
