import { useEffect, useState } from "react";

export interface IOption {
    readonly option: string;
  }

export default function Option({option}: IOption) {
  const [optionText, setOptionText] = useState("");
    useEffect(() => {
        setOptionText(option)
    }, [])

  return (
    <div className="flex items-center" key={`${optionText}`}>
      <img src="../option.svg" alt="" />
      <input
        defaultValue={optionText}
        onBlur={(e) => {
          setOptionText(e.target.value);
        }}
        className="ml-1 text-sm"
      />
    </div>
  );
}
