import { useEffect } from "react";
import { useStore } from "../store/state";
import { ChatDiscussion } from "./ChatDiscussion";
import { EmptyHelloChatScreen } from "./EmptyHelloChatScreen";
import { SideNav } from "./sidenav/sidenav";

export const ChatHome = () => {
  const { selectedThread, getThreads } = useStore().chat;

  useEffect(() => {
    getThreads();
  }, []);

  return (
    <>
      <SideNav>
        {selectedThread?.discussion?.length ? (
          <ChatDiscussion />
        ) : (
          <EmptyHelloChatScreen />
        )}
      </SideNav>
    </>
  );
};
