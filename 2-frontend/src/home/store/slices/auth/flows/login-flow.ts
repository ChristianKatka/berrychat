import { StoreApi } from "zustand";
import { AuthSlice } from "../auth.slice";
import { loginService } from "../../../../services/auth.service";
import { jwtDecode } from "jwt-decode";
import { navigateTo } from "../../../../../router";

export const loginFlow = async (
  set: StoreApi<AuthSlice>["setState"],
  get: StoreApi<AuthSlice>["getState"],
  email: string,
  password: string
) => {
  try {
    set((state) => ({
      auth: {
        ...state.auth,
        isLoginLoading: true,
      },
    }));

    const res = await loginService(email, password);

    console.log("LOGIN RESPONSE::::");
    console.log(res);

    const decodedAccessToken = jwtDecode(res.AuthenticationResult.AccessToken);
    const decodedIdToken = jwtDecode(res.AuthenticationResult.IdToken);
    const tokens = { ...res.AuthenticationResult, decodedAccessToken };
    localStorage.setItem("tokens", JSON.stringify(tokens));
    navigateTo("/");

    set((state) => ({
      auth: {
        ...state.auth,
        isLoginLoading: false,

        tokens,
        decodedAccessToken,
        decodedIdToken,
      },
    }));
  } catch (err) {
    set((state) => ({
      auth: {
        ...state.auth,
        isLoginLoading: false,
        tokens: undefined,
        decodedAccessToken: undefined,
        decodedIdToken: undefined,
        error: err,
      },
    }));
    return err;
  }
};
