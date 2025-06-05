import { useStore } from "../store/state";
import { ChatDiscussion } from "./ChatDiscussion";
import { EmptyHelloChatScreen } from "./EmptyHelloChatScreen";
import { SideNav } from "./sidenav/sidenav";

export const ChatHome = () => {
  const { discussion } = useStore().chat;
  return (
    <>
      <SideNav>
        {discussion.length > 0 ? <ChatDiscussion /> : <EmptyHelloChatScreen />}
      </SideNav>
    </>
  );
};
