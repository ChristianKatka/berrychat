import { Citation } from "./citation";

export interface Message {
  role: "User" | "Assistant";
  text: string;
  citations?: Citation[];
}
