import { Loader2, SendHorizonal } from "lucide-react";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useStore } from "../../store/state";

export const InputField = () => {
  const { sendMessage, isSendMessageLoading } = useStore().chat;

  const [userInput, setUserInput] = useState("");

  const handleKeyDown = (e: any) => {
    // Enter sends message. Shift + Enter adds new row

    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent newline insertion
      handleSendMessage(); // Submit the message
    }
  };

  const handleSendMessage = () => {
    console.log("handleSendMessage");

    const trimmed = userInput.trim();
    if (trimmed === "") return;
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
        disabled={isSendMessageLoading}
        onClick={handleSendMessage}
        className={`cursor-pointer absolute bottom-2.5 right-2.5 text-white hover:text-gray-300 ${
          isSendMessageLoading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isSendMessageLoading ? (
          <div className="flex items-center justify-center gap-2">
            <Loader2 className="animate-spin" size={20} />
          </div>
        ) : (
          <SendHorizonal size={18} />
        )}
      </button>
    </div>
  );
};
