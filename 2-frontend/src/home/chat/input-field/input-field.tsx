import { SendHorizonal } from "lucide-react";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useStore } from "../../store/state";

interface Props {
  sendMessage: (message: string) => void;
}
export const InputField = ({ sendMessage }: Props) => {
  const { isChatResponseEnded } = useStore().chat;

  const [userInput, setUserInput] = useState("");

  const handleKeyDown = (e: any) => {
    // Enter sends message. Shift + Enter adds new row

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent newline insertion
      handleSendMessage(); // Submit the message
    }
  };

  const handleSendMessage = () => {
    const trimmed = userInput.trim();
    if (trimmed === "" || !isChatResponseEnded) return;
    sendMessage(userInput);
    setUserInput("");
  };

  return (
    <div className="relative w-full">
      <TextareaAutosize
        style={{ backgroundColor: "#414045" }}
        placeholder="Message to Berry"
        className="flex w-full resize-none rounded-2xl border border-input bg-background px-3 py-2 pr-10 text-sm text-white ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        maxRows={8}
        minRows={3}
        value={userInput}
        onChange={(event) => setUserInput(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={() => sendMessage}
        className="cursor-pointer absolute bottom-2.5 right-2.5 text-white hover:text-gray-300"
      >
        <SendHorizonal size={18} />
      </button>
    </div>
  );

  return (
    <section>
      <div className="flex items-center gap-4 my-3.5">
        <TextareaAutosize
          style={{ backgroundColor: "#414045" }}
          placeholder="Message to Berry"
          className="flex-grow resize-none rounded-2xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          maxRows={8}
          minRows={3}
          value={userInput}
          onChange={(event) => setUserInput(event.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
      </div>
    </section>
  );
};
