import { StateCreator } from "zustand";
import { Discussion } from "../../../models/discussion";
import { State } from "../../state";

export interface ChatSlice {
  chat: {
    threads: any;
    selectedThreadId: any;
    discussion: Discussion[];
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
      // const contextFromState = get().chat.context;
      // await processSendStreamedMessageFlow(set, get, message, contextFromState);
      // // meaby not neccesary, but "force" response ended here, so submit/send button is enabled again
      // set((state) => ({
      //   chat: {
      //     ...state.chat,
      //     isChatResponseEnded: true,
      //   },
      // }));
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
