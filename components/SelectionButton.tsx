import { MARK_VIEWED, SUBSCRIBE } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";
import Image from "next/image";

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
    markViewed({
      variables: {
        userId: userId,
      },
    });
  };

  return (
    <div className="flex w-screen justify-center">
      <div className="bg-black bg-opacity-90 w-3/6 flex justify-center">
        <Image src="../left-arrow.svg" alt="Dislike the person" />
      </div>
      <div className="bg-green-600 bg-opacity-90 w-3/6 flex justify-center">
        <Image src="../right-arrow.svg" alt="Like the person" />
      </div>
    </div>
  );
}
