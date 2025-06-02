export const Chat = () => {
  return (
    <div className="w-screen h-screen flex justify-center pt-[33vh]">
      <div className="w-full max-w-md px-4 text-center space-y-4">
        <h1 className="text-2xl font-semibold">Hi, I'm Blueberry.</h1>
        <p>How can I help you today?</p>
        <textarea
          rows={2}
          style={{ backgroundColor: "#414045" }}
          className="w-full px-4 py-2 rounded-2xl border border-gray-700 focus:outline-none resize-none text-white"
        />
      </div>
    </div>
  );
};
