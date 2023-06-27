export interface PropsType {
  question: string;
  answer: string;
}

export default function Question({ question, answer }: PropsType) {
  return (
    <div className="py-2 w-9/12">
      <p className="text-sm font-light">{question}</p>
      <p className="text-xs font-extralight opacity-80">{answer}</p>
    </div>
  );
}
