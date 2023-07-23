import { MARK_VIEWED, SUBSCRIBE } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import { useEffect } from "react";
import leftArrow from "../public/left-arrow.svg";
import righrArrow from "../public/right-arrow.svg";

interface ISelectionButton {
  readonly userId: number;
  callback: () => void;
}

export default function SelectionButton({ userId, callback }: ISelectionButton) {
  const [markViewed, { data: viewed }] = useMutation(
    MARK_VIEWED,
  );

  const [subscribe, { data: subscribed }] = useMutation(
    SUBSCRIBE,
  );

  return (
    <div className="flex w-screen justify-center">
      <button
        onClick={() =>
          markViewed({
            variables: {
              userId: userId,
            },
          })}
        className="bg-black w-3/6 flex justify-center"
      >
        <Image src={leftArrow} alt="Dislike the person" />
      </button>
      <button
        onClick={() => {
          subscribe({
            variables: {
              userId: userId,
            },
          });
          markViewed({
            variables: {
              userId: userId,
            },
          });
          callback();
        }}
        className="bg-green-600 w-3/6 flex justify-center"
      >
        <Image src={righrArrow} alt="Like the person" />
      </button>
    </div>
  );
}
