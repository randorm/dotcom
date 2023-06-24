export interface PropsType {
    text: string;
}

export default function Button({text}: PropsType) {
  return (
    <div className={"btn"}>
      <p className={`text-slate-50 text-sm font-extralight`}>
        {text}
      </p>
    </div>
  );
}
