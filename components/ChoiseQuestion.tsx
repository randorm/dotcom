import { useEffect, useState } from "react";
import Option from "./Option";

export interface IChoiceQuestion {
  readonly question: string;
  readonly options: string[];
  readonly required: boolean;
  readonly multiple: boolean;
}

export default function ChoiseQuestion(
  { question, options, required, multiple }: IChoiceQuestion,
) {
  const [checked, setChecked] = useState(false);
  const [questionText, setQuestionText] = useState("");
  const [selectedChoice, setSelectedChoice] = useState("");

  useEffect(() => {
    setChecked(required);
    setQuestionText(question);
    if (multiple) {
      setSelectedChoice("multiple");
    } else {
      setSelectedChoice("single");
    }
  }, []);

  return (
    <div className="area">
      <div className="flex justify-between items-center mb-1 p-1">
        <textarea
          defaultValue={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          rows={5}
          className="w-full"
        />
        <div className="ml-4 grid grid-cols-3 gap-1">
          <img src="../edit.svg" alt="" />
          <img src="../swap.svg" alt="" />
          <img src="../delete.svg" alt="" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-52 p-1">
        <div>
          {options.map((option, i) => {
            return <Option key={i} option={option} />;
          })}
        </div>
        <div className="text-sm">
          <div className="flex items-center align-middle">
            <input
              type="checkbox"
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
              className="default:ring-2"
            />
            <div className="ml-1 text-sm">Required</div>
          </div>
          <div className="flex items-center align-middle">
            <select className="bg-whight" onChange={(e) => setSelectedChoice(e.target.value)} defaultValue={multiple ? "multiple" : "single"}>
              <option className="ml-1 text-sm" value="multiple">Multiple choice</option>
              <option className="ml-1 text-sm" value="single">Single choice</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
