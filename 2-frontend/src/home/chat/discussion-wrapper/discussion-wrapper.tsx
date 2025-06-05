import { useStore } from "../../store/state";
import { AiResponse } from "./ai-response/ai-response";
import { InitialEmptyMessageScreen } from "./initial-empty-message-screen/initial-hello-message";
import { UserMessage } from "./user-message/user-message";

export const DiscussionWrapper = () => {
  const { discussion } = useStore().chat;
  return (
    <main>
      {discussion.length === 0 ? (
        <InitialEmptyMessageScreen /> //
      ) : (
        discussion.map((chatBubble: any, i: number) =>
          chatBubble.role === "Assistant" ? (
            <AiResponse
              key={i}
              text={chatBubble.text}
              citations={chatBubble.citations}
            />
          ) : (
            <UserMessage key={i} text={chatBubble.text} />
          )
        )
      )}
    </main>
  );
};
