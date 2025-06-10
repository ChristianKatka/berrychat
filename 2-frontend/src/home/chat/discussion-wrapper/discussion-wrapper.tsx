import { Message } from "../../../models/thread";
import { useStore } from "../../store/state";
import { AiResponse } from "./ai-response/ai-response";
import { InitialEmptyMessageScreen } from "./initial-empty-message-screen/initial-hello-message";
import { UserMessage } from "./user-message/user-message";

export const DiscussionWrapper = () => {
  const { selectedThread } = useStore().chat;

  return (
    <main>
      {selectedThread?.discussion.length === 0 ? (
        <InitialEmptyMessageScreen /> //
      ) : (
        selectedThread?.discussion.map((chatBubble: Message, i: number) =>
          chatBubble.role === "assistant" ? (
            <AiResponse
              key={i}
              content={chatBubble.content}
              citations={chatBubble.citations}
            />
          ) : (
            <UserMessage key={i} content={chatBubble.content} />
          )
        )
      )}
    </main>
  );
};
