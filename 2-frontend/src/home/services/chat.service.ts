import { API_URL } from "../../constants";

export const sendSendMessageService = async (
  idToken: string,
  message: string
) => {
  const response = await fetch(`${API_URL}/message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: idToken,
    },
    body: JSON.stringify({ text: message }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("error in sendSendMessageService:", errorText);
    throw new Error(`HTTP ${response.status}: ${errorText}`);
  }

  const res = await response.json();

  console.log("res:");
  console.log(res);

  return res;
};
