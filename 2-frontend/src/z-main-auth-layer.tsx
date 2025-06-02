"use-client";

import { useEffect } from "react";
import App from "./App";
import { TopLoader } from "./components/ui/topLoader";
import { useStore } from "./home/store/state";

export const MainAuthLayer = () => {
  const { isLoading, initAuth } = useStore().auth;

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  if (isLoading) {
    return (
      <TopLoader
        whatIsBeingLoaded={
          "waiting if current tokens are not expired and is trying to get new tokens with refresh token"
        }
      ></TopLoader>
    );
  }

  return <App />;
};
