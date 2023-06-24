export interface PropsType {
  name: string;
  info: string;
  bio: string;
}

export default function Bio({ name, info, bio }: PropsType) {
  return (
    <div className="bioSection">
      <p className="text-lg">{name}</p>
      <p className="mb-3 opacity-40">{info}</p>
      <div className="opacity-90 leading-normal">{bio}</div>
    </div>
  );
}
