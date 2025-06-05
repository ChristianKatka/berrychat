import { useEffect, useRef } from "react";
import { autoScrollToBottom } from "../../shared/auto-to-scroll-bottom";
import { useStore } from "../store/state";
import { DiscussionWrapper } from "./discussion-wrapper/discussion-wrapper";
import { InputField } from "./input-field/input-field";

export const ChatDiscussion = () => {
  const { discussion } = useStore().chat;

  // Auto-scroll to bottom when discussion updates
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    autoScrollToBottom(scrollContainerRef);
  }, [discussion]);

  return (
    <main className="flex flex-col items-center h-screen w-screen p-4 sm:p-7 transition-[width,height,top,left] duration-300 ease-in-out">
      <p>chat header</p>

      <div className="flex flex-1 w-full max-w-[700px] flex-col justify-between rounded-md p-3.5 overflow-hidden">
        {/* Scrollable Top Item */}
        <section
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto rounded-md pb-20"
        >
          <DiscussionWrapper />
        </section>

        {/* Bottom Item */}
        <section className="mt-3.5">
          <InputField></InputField>
        </section>
      </div>
    </main>
  );
};
