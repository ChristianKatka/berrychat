import { jwtDecode } from "jwt-decode";
import { StoreApi } from "zustand";
import { authenticateWithRefreshTokenService } from "../../../../services/auth.service";
import { AuthSlice } from "../auth.slice";
import { includeExistingRefreshTokenWithNewTokens } from "../utils/include-existing-refresh-token-with-new-tokens.util";

export const authenticateWithRefreshTokenFlow = async (
  set: StoreApi<AuthSlice>["setState"],
  get: StoreApi<AuthSlice>["getState"],
  RefreshToken: string
) => {
  try {
    console.log("authenticateWithRefreshTokenFlow");

    const res = await authenticateWithRefreshTokenService(RefreshToken);
    console.log("res");
    console.log(res);

    const decodedAccessToken = jwtDecode(res.AuthenticationResult.AccessToken);
    const decodedIdToken = jwtDecode(
      JSON.stringify(res.AuthenticationResult.IdToken)
    );

    console.log("decodedAccessToken");
    console.log(decodedAccessToken);

    const tokens = includeExistingRefreshTokenWithNewTokens(
      RefreshToken,
      res.AuthenticationResult
    );

    console.log("NewTokens with old refresh token included");
    console.log(tokens);

    localStorage.setItem("tokens", JSON.stringify(tokens));

    set((state) => ({
      auth: {
        ...state.auth,
        isLoading: false,
        tokens,
        decodedAccessToken,
        decodedIdToken,
      },
    }));
  } catch (err) {
    set((state) => ({
      auth: {
        ...state.auth,
        isLoading: false,
        tokens: undefined,
        decodedAccessToken: undefined,
        decodedIdToken: undefined,
        error: err,
      },
    }));
    return err;
  }
};
