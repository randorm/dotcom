import { MARK_VIEWED, SUBSCRIBE } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import { useEffect } from "react";
import leftArrow from "../public/left-arrow.svg";
import righrArrow from "../public/right-arrow.svg";

interface ISelectionButton {
  readonly userId: number
}

export default function SelectionButton({userId}: ISelectionButton) {
  const [markViewed, { data: viewed, error }] = useMutation(
    MARK_VIEWED,
  );

  const [subscribe, { data: subscribed }] = useMutation(
    SUBSCRIBE,
  );

  const addSubscription = () => {
    markViewed({
      variables: {
        userId: userId,
      },
    });
    subscribe({
      variables: {
        userId: userId,
      }
    })
  }; 

  const nextUser = () => {
    if (error) return `Submission error! ${error.message}`;
    console.log("Next, user with id: " + userId)
    console.log(viewed)
    console.log("Viewed, user with id: " + viewed.user.id)
    markViewed({
      variables: {
        userId: userId,
      },
    });
  };

  return (
    <div className="flex w-screen justify-center">
      <button onClick={nextUser} className="bg-black w-3/6 flex justify-center">
        <Image src={leftArrow} alt="Dislike the person" />
      </button>
      <button onClick={addSubscription} className="bg-green-600 w-3/6 flex justify-center">
        <Image src={righrArrow} alt="Like the person" />
      </button>
    </div>
  );
}
