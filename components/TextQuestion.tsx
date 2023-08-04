import { UPDATE_DISTRIBUTION_FIELDS } from "@/graphql/mutations";
import { Field } from "@/lib/__codegen__/graphql";
import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import Delete from "./Delete";

export interface ITextQuestion {
  readonly question: string;
  readonly sample: string | undefined | null;
  readonly required: boolean;
  readonly format: string | undefined | null;
  readonly fields: Field[];
  readonly id: number;
  readonly distributionId: number;
}

export default function TextQuestion(
  { question, sample, required, format, fields, id, distributionId }:
    ITextQuestion,
) {
  const [checked, setChecked] = useState(false);
  const [sampleText, setSampleText] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");
  const [updateFields] = useMutation(UPDATE_DISTRIBUTION_FIELDS, {
    onCompleted() {
      window.location.reload();
    },
  });

  useEffect(() => {
    setChecked(required);
    setSelectedFormat(format ? format : "text");
    setQuestionText(question);
    if (sample) {
      setSampleText(sample);
    }
  }, []);

  function deleteField() {
    let updatedList = fields.filter((field) => field.id != id);
    let fieldsIds = updatedList.map((field) => {
      return field.id;
    });
    updateFields({
      variables: {
        distributionId: distributionId,
        fieldIds: fieldsIds,
      },
    });
  }

  return (
    <div className="area">
      <div className="flex justify-between items-center mb-1 p-1">
        <input
          defaultValue={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="w-full whitespace-pre-wrap"
        />
        <div className="ml-4 grid grid-cols-3 gap-1">
          <img src="../swap.svg" alt="" />
          <button onClick={deleteField}>
            <Delete />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-52 p-1">
        <input
          type={selectedFormat}
          defaultValue={sampleText}
          onChange={(e) => setSampleText(e.target.value)}
          className="area text-xxs text-opacity-50 text-black"
        />
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
            <select
              className="bg-whight"
              onChange={(e) => setSelectedFormat(e.target.value)}
              defaultValue={selectedFormat}
            >
              {/*Maybe just format */}
              <option className="ml-1 text-sm" value="text">Text</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
