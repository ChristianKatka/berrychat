import { jwtDecode } from "jwt-decode";
import type { StateCreator } from "zustand";
import { authenticateWithRefreshTokenFlow } from "./flows/authenticate-with-refresh-token-flow";
import { loginFlow } from "./flows/login-flow";
import { logoutFlow } from "./flows/logout-flow";
import { registerFlow } from "./flows/register-flow";

export interface AuthSlice {
  auth: {
    isLoading: boolean;
    isLoginLoading: boolean;
    tokens?: any;
    decodedAccessToken?: any;
    decodedIdToken?: any;
    register: (email: string, password: string) => void;
    login: (email: string, password: string) => void;
    initAuth: () => void;
    setTokensFromLocalStorage: (tokens: any) => void;
    authenticateWithRefreshToken: (payload: any) => Promise<any>;
    logout: () => void;
    getIsAuthenticated: () => boolean;
  };
}

export const createAuthSlice: StateCreator<AuthSlice, [], [], AuthSlice> = (
  set,
  get
) => ({
  auth: {
    isLoading: true,
    isLoginLoading: false,
    tokens: undefined,
    decodedAccessToken: undefined,
    decodedIdToken: undefined,

    register: async (email: string, password: string) => {
      return await registerFlow(set, get, email, password);
    },
    login: async (email: string, password: string) => {
      return await loginFlow(set, get, email, password);
    },
    async initAuth() {
      const { getIsAuthenticated, tokens, authenticateWithRefreshToken } =
        get().auth;

      // SET LOADING
      set((state) => ({
        auth: {
          ...state.auth,
          isLoading: true,
        },
      }));

      // User is authenticated, continue
      if (getIsAuthenticated()) {
        console.log("Already authenticated");

        set((state) => ({
          auth: {
            ...state.auth,
            isLoading: false,
          },
        }));
        return;
      }

      // Check do we have refresh token.
      const RefreshToken = tokens?.RefreshToken;
      console.log("Did we have refresh token::");
      console.log(RefreshToken);

      if (!RefreshToken) {
        set((state) => ({
          auth: {
            ...state.auth,
            isLoading: false,
          },
        }));
        return;
      }
      try {
        await authenticateWithRefreshToken(RefreshToken);
      } catch (err) {
        console.warn("Refresh token failed", err);
      } finally {
        set((state) => ({
          auth: {
            ...state.auth,
            isLoading: false,
          },
        }));
      }
    },

    setTokensFromLocalStorage: (tokens: any) => {
      const decodedAccessToken = jwtDecode(JSON.stringify(tokens.AccessToken));
      const decodedIdToken = jwtDecode(JSON.stringify(tokens.IdToken));
      set((state) => ({
        auth: {
          ...state.auth,
          tokens,
          decodedAccessToken,
          decodedIdToken,
        },
      }));
    },
    authenticateWithRefreshToken: async (RefreshToken: string) => {
      return await authenticateWithRefreshTokenFlow(set, get, RefreshToken);
    },

    logout: async () => {
      await logoutFlow(set, get);
    },

    getIsAuthenticated: () => {
      const decodedAccessToken = get().auth.decodedAccessToken;

      if (!decodedAccessToken) return false;

      const now = Math.floor(Date.now() / 1000);
      return decodedAccessToken.exp - 5 > now;
    },
  },
});
