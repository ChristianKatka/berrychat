import { StoreApi } from "zustand";
import { State } from "../../../state";
import { sendSendMessageService } from "../../../../services/chat.service";
import { Message } from "../../../../../models/message";
import { parseClaudeResponse } from "./utils/parseClaudeResponse";

export const processSendMessageFlow = async (
  set: StoreApi<State>["setState"],
  get: StoreApi<State>["getState"],
  message: string
) => {
  const prevDiscussion = get().chat.discussion;
  const selectedThreadId = get().chat.selectedThreadId;

  const newDiscussion: Message[] = [
    ...prevDiscussion,
    { role: "User", text: message },
  ];

  set((state) => ({
    chat: {
      ...state.chat,
      discussion: newDiscussion,
    },
  }));
  try {
    const idToken = get().auth.tokens.IdToken;

    const res = await sendSendMessageService(
      idToken,
      message,
      selectedThreadId
    );
    const { parsedText, citations } = parseClaudeResponse(res.claudeResponse);
    // mocking api res for now
    const currentDiscussion = get().chat.discussion;
    const updatedDiscussion: Message[] = [
      ...currentDiscussion,
      {
        role: "Assistant",
        text: parsedText,
        citations,
      },
    ];

    set((state) => ({
      chat: {
        ...state.chat,
        selectedThreadId: res.threadId,
        discussion: updatedDiscussion,
      },
    }));
  } catch (err) {
    console.log("error:");
    console.log(err);

    set((state) => ({
      chat: {
        ...state.chat,
        error: "Failed to send message",
      },
    }));
  }
};
