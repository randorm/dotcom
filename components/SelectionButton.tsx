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
  const [markViewed, { data: viewed }] = useMutation(
    MARK_VIEWED,
  );

  const [subscribe, { data: subscribed }] = useMutation(
    SUBSCRIBE,
  );

  const addSubscription = () => {
    console.log("Subscribed")
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
    console.log("Next, user with id: " + userId)
    markViewed({
      variables: {
        userId: userId,
      },
    });
  };

  useEffect(() => {
    if (viewed) {
      console.log("Just viewed user with id: " + userId)
    }

    if (subscribed) {
      console.log("Just subsribed user with id: " + userId)
    }
  }, [viewed, subscribed])
  return (
    <div className="flex w-screen justify-center">
      <button onClick={nextUser} className="bg-black w-3/6 flex justify-center">
        <Image src={leftArrow} alt="Dislike the person" />
      </button>
      <button onClick={addSubscription} className="bg-green-500 w-3/6 flex justify-center">
        <Image src={righrArrow} alt="Like the person" />
      </button>
    </div>
  );
}
