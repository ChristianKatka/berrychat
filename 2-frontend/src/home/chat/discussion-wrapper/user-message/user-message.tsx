interface Props {
  text: string;
}
export const UserMessage = ({ text }: Props) => {
  return (
    <section className="flex justify-end mb-2">
      <div
        style={{ backgroundColor: "#404156" }}
        className="inline-block w-fit max-w-[80%] rounded-xl p-1 py-3"
      >
        <p className="whitespace-pre-wrap px-3">{text}</p>
      </div>
    </section>
  );
};
