import { StateCreator } from "zustand";
import { Message } from "../../../../models/message";
import { State } from "../../state";
import { processSendMessageFlow } from "./flows/process-send-message-flow";

export interface ChatSlice {
  chat: {
    threads: any;
    selectedThreadId: any;
    discussion: Message[];
    isLoadingThreads: boolean;
    isChatResponseEnded: boolean;
    error: string | null;
    context: any;
    startNewMessagingThread: () => void;
    getThreads: () => void;
    selectThread: (id: string) => void;
    deleteThread: (id: string) => void;
    setContext: (context: any) => void;
    suggestTitleWithAi: () => void;
    sendMessage: (message: string) => Promise<void>;
    giveFeedBackOnAssistanceResponse: (
      run_id: string,
      type: "POSITIVE" | "NEGATIVE"
    ) => void;
    reportRunWithUserComment: (runId: string, comment: string) => Promise<void>;
    clearError: () => void;
  };
}

export const createChatSlice: StateCreator<State, [], [], ChatSlice> = (
  set,
  get
) => ({
  chat: {
    threads: {},
    selectedThreadId: undefined,
    discussion: [],
    isLoadingThreads: false,
    isLoadingSelectedThread: false,
    isChatResponseEnded: true,
    error: null,
    context: undefined, // context comes from host
    getThreads: async () => {
      // await processGetThreadsFlow(set, get);
    },
    startNewMessagingThread: () => {
      // set((state) => ({
      //   chat: {
      //     ...state.chat,
      //     selectedThreadId: undefined,
      //     discussion: [],
      //   },
      // }));
    },
    selectThread: async (id: string) => {
      // await selectThreadFlow(set, get, id);
    },
    deleteThread: async (id: string) => {
      // await deleteThreadFlow(set, get, id);
    },
    setContext: (context: any) => {
      // console.log("context asetettu");
      // set((state) => ({
      //   chat: {
      //     ...state.chat,
      //     context,
      //   },
      // }));
    },
    suggestTitleWithAi: () => {
      // set((state) => ({
      //   chat: {
      //     ...state.chat,
      //     isSuggestTitleWithAi: true,
      //   },
      // }));
    },
    sendMessage: async (message: string) => {
      console.log("sendMessage slice");

      await processSendMessageFlow(set, get, message);
    },
    giveFeedBackOnAssistanceResponse: async (
      run_id: string,
      type: "POSITIVE" | "NEGATIVE"
    ) => {
      // await processGiveFeedBackOnAssistanceResponseFlow(set, get, run_id, type);
    },
    reportRunWithUserComment: async (runId: string, comment: string) => {
      // await processReportRunWithUserCommentFlow(set, get, runId, comment);
    },
    clearError: () =>
      set((state) => ({
        chat: {
          ...state.chat,
          error: null,
        },
      })),
  },
});
