export const HeadingH1 = ({ text }: { text: string }) => {
  return <h1 className="p-4 text-3xl">{text}</h1>;
};

export const FetchStatusText = ({ text }: { text: string }) => {
  return <p className="mt-4 text-center font-bold text-red-500">{text}</p>;
};
