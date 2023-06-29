import Link from "next/link";

interface IHeader {
    readonly username: string
}

export default function Header({username}: IHeader) {
  return (
    <div className="flex justify-between">
      <Link href="/home">
        <img
          className="w-52 m-5"
          src="../short-logo-t-b.png"
        />
      </Link>
      <div className="text-neutral-900 text-lg font-extralight m-5 mr-8">
        {username}
      </div>
    </div>
  );
}
