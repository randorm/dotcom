interface IDistributionButton {
  readonly imageSrc: string
  readonly text: string
}

export default function DistributionButton({imageSrc, text}: IDistributionButton) {
  return (
    <div className={"btn ml-1"}>
      <img className="mr-1 w-3" src={imageSrc} />
      <p className={`text-slate-50 text-sm font-extralight`}>
        {text}
      </p>
    </div>
  );
}
