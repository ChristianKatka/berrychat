import { InputField } from "./input-field/input-field";

export const EmptyHelloChatScreen = () => {
  return (
    <div className="w-screen h-screen flex justify-center pt-[33vh]">
      <div className="w-full max-w-xl sm:max-w-3xl px-4 text-center space-y-4">
        <h1 className="text-2xl font-semibold">Hi, I'm Blueberry.</h1>
        <p>How can I help you today?</p>

        <InputField></InputField>
      </div>
    </div>
  );
};
