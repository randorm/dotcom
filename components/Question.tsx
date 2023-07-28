export interface ITextQuestion {
  readonly question: string;
  readonly answer: string;
}

export interface IChoiceQuestion {
  readonly question: string;
  readonly options: readonly string[];
  readonly indeces: number[];
}

export function TextQuestion({ question, answer }: ITextQuestion) {
  return (
    <div className="py-2 w-9/12">
      <p className="text-sm font-light whitespace-pre-wrap">{question}</p>
      <p className="text-xs font-extralight opacity-80">{answer}</p>
    </div>
  );
}

export function ChoiceQuestion({ question, options, indeces }: IChoiceQuestion) {
  return (
    <div className="py-2 w-9/12">
      <p className="text-sm font-light whitespace-pre-wrap">{question}</p>
      <p className="text-xs font-extralight opacity-80">{indeces.map((i) => options[i])}</p>
    </div>
  );
}