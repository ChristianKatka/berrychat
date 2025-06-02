"use client";

import { useEffect, useState } from "react";
import { TopLoader } from "./components/ui/topLoader";
import { useStore } from "./home/store/state";
import { MainAuthLayer } from "./z-main-auth-layer";

// CHECK IF THERE ARE TOKENS IN LOCALSTORAGE
export const TokenCheck = () => {
  const { setTokensFromLocalStorage } = useStore().auth;
  const [isTokenChecked, setIsTokenChecked] = useState(false);

  useEffect(() => {
    // need to be try catch otherwise http error in nextjs if not found
    try {
      const savedTokensRaw = localStorage.getItem("tokens");

      if (savedTokensRaw) {
        try {
          console.log("Found tokens from local storage. set them to state");
          const tokens = JSON.parse(savedTokensRaw);
          setTokensFromLocalStorage(tokens);
        } catch (e) {
          console.error("Failed to parse tokens", e);
        }
      }
    } catch (e) {
      console.error("No tokens in storage", e);
    } finally {
      setIsTokenChecked(true);
    }
  }, [setTokensFromLocalStorage]);

  if (!isTokenChecked) {
    // checking tokens from storage.
    return (
      <TopLoader
        whatIsBeingLoaded={"waiting to see if theres tokens in local storage"}
      ></TopLoader>
    );
  }

  return <MainAuthLayer />;
};
