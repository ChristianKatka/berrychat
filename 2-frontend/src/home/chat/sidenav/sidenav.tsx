import { ChevronRight, LogOut, Menu, MessageCirclePlus } from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "../../../components/ui/avatar";
import { Button } from "../../../components/ui/button";
import { Separator } from "../../../components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../../components/ui/sheet";
import { cn } from "../../../lib/utils";
import { addHumanReadableTimesToThreads } from "../../../shared/add-human-readable-times-to-threads";
import { getInitials } from "../../../shared/get-initials";
import { useStore } from "../../store/state";
import { PrevChatItem } from "./prev-chat-item/prev-chat-item";

export const SideNav = ({ children }: { children: React.ReactNode }) => {
  const { logout, decodedIdToken } = useStore().auth;
  const {
    selectedThreadId,
    selectThread,
    deleteThread,
    startNewMessagingThread,
  } = useStore().chat;

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [usableThreads, setUsableThreads] = useState([]);

  const { threads } = useStore().chat;

  useEffect(() => {
    const threadsWithTimes: any = addHumanReadableTimesToThreads(
      Object.values(threads)
    );
    setUsableThreads(threadsWithTimes);
  }, [threads]);

  const onSelectThread = (id: string) => {
    selectThread(id);
    setMobileOpen(false);
  };

  const onStartNewMessagingThread = () => {
    startNewMessagingThread();
    setMobileOpen(false);
  };

  return (
    <div className="flex h-screen w-screen">
      {/* Desktop Sidebar */}
      <aside
        style={{ backgroundColor: "#212327" }}
        className={cn(
          "hidden lg:block border-r transition-all duration-300 ease-in-out",
          isCollapsed ? "w-20" : "w-64"
        )}
      >
        <main className="h-full">
          <div className="flex h-full flex-col gap-4 p-4">
            <div className="flex justify-between items-center">
              {isCollapsed ? null : (
                <p className="font-bold text-center">Blueberry chat</p>
              )}

              {/* Collapse Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="hidden lg:flex ml-auto h-8 w-8 cursor-pointer"
              >
                <ChevronRight
                  className={cn(
                    "h-4 w-4 transition-transform",
                    isCollapsed && "rotate-180"
                  )}
                />
              </Button>
            </div>

            <Button
              onClick={onStartNewMessagingThread}
              variant="default"
              className="px-4 cursor-pointer"
            >
              <MessageCirclePlus />
              {!isCollapsed && <span className="font-medium">New chat</span>}
            </Button>

            {/* PREV CHATS */}
            {isCollapsed ? (
              <div className="flex-1 overflow-auto"></div>
            ) : (
              <div className="flex-1 overflow-auto">
                <div className="flex flex-col gap-6">
                  {usableThreads.length > 0 ? (
                    usableThreads.map((prevChat: any) => (
                      <div key={prevChat.date} className="space-y-1">
                        <p className="font-medium text-muted-foreground">
                          {prevChat.date}
                        </p>
                        <div className="space-y-1">
                          {prevChat?.chats?.map((chat: any, i: number) => (
                            <PrevChatItem
                              key={i}
                              title={chat.title}
                              id={chat.id}
                              isSelected={chat.id === selectedThreadId}
                              selectThread={(id) => onSelectThread(id)}
                              deleteThread={(id) => deleteThread(id)}
                            ></PrevChatItem>
                          ))}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p></p>
                  )}
                </div>
              </div>
            )}

            {/* PREV CHATS */}

            <div>
              <Separator className="w-full" />

              <Button
                onClick={logout}
                variant="outline"
                className="mt-3 cursor-pointer"
              >
                <LogOut />
                {!isCollapsed && <span className="font-medium">Logout</span>}
              </Button>

              <div className="flex items-center pt-3">
                <Avatar>
                  <AvatarFallback>
                    {getInitials(
                      decodedIdToken?.given_name,
                      decodedIdToken?.family_name
                    )}
                  </AvatarFallback>
                </Avatar>
                {isCollapsed ? null : (
                  <p className="pl-3">{`${decodedIdToken?.given_name}  ${decodedIdToken?.family_name}`}</p>
                )}
              </div>
            </div>
          </div>
        </main>
      </aside>

      {/* ---------------------------------- */}
      {/* ---------------------------------- */}
      {/* ---------------------------------- */}
      {/* Mobile Navigation */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="lg:hidden fixed top-4 left-4 z-50"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="w-64 p-0 h-screen flex flex-col"
          aria-describedby={undefined}
        >
          <SheetHeader className="border-b">
            <SheetTitle>Blueberry chat</SheetTitle>
          </SheetHeader>

          <Button
            onClick={onStartNewMessagingThread}
            variant="default"
            className={"mt-4 mx-4"}
          >
            <MessageCirclePlus />
            <span className="font-medium">New chat</span>
          </Button>

          <nav className="flex flex-col flex-1 overflow-hidden">
            <div className="flex-1 overflow-auto p-4">
              <div className="flex flex-col gap-4 sm:gap-6">
                {usableThreads.length > 0 ? (
                  usableThreads.map((prevChat: any) => (
                    <div
                      key={prevChat.date}
                      className="space-y-0.5 sm:space-y-1"
                    >
                      <p className="font-medium text-muted-foreground">
                        {prevChat.date}
                      </p>
                      <div className="space-y-0.5 sm:space-y-1">
                        {prevChat?.chats?.map((chat: any, i: number) => (
                          <PrevChatItem
                            key={i}
                            title={chat.title}
                            id={chat.id}
                            isSelected={chat.id === selectedThreadId}
                            selectThread={(id) => onSelectThread(id)}
                            deleteThread={(id) => deleteThread(id)}
                          ></PrevChatItem>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <p></p>
                )}
              </div>
            </div>

            <Separator className="w-full" />
            <Button className="mt-3 mx-4" onClick={logout}>
              Logout
            </Button>
            <div className="flex items-center p-3 shrink-0 pb-24 md:pb-3">
              <Avatar>
                <AvatarFallback>
                  {getInitials(
                    decodedIdToken?.given_name,
                    decodedIdToken?.family_name
                  )}
                </AvatarFallback>
              </Avatar>
              <p className="pl-3">{`${decodedIdToken?.given_name} ${decodedIdToken?.family_name}`}</p>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
      {/* Main Content Area */}
      {children}
    </div>
  );
};
