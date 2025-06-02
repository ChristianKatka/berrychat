import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { AuthSlice, createAuthSlice } from "./slices/auth/auth.slice";
import { ChatSlice, createChatSlice } from "./slices/chat/chat.slice";

export interface State extends ChatSlice, AuthSlice {}

export const useStore = create<State>()(
  devtools(
    (set, get, store) => ({
      ...createChatSlice(set, get, store),
      ...createAuthSlice(set, get, store),
    }),
    { name: "ZustandStore" }
  )
);
