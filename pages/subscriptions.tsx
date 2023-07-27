import Bio from "@/components/Bio";
import Dislike from "@/components/Dislike";
import EmptyFeed from "@/components/EmptyFeed";
import LeftArrow from "@/components/LeftArrow";
import Like from "@/components/Like";
import Loading from "@/components/Loading";
import { ChoiceQuestion, TextQuestion } from "@/components/Question";
import RightArrow from "@/components/RightArrow";
import { SUBSCRIBE, UNSUBSCRIBE } from "@/graphql/mutations";
import { SUBSCRIPTIONS } from "@/graphql/queries";
import {
  ChoiceAnswer,
  ChoiceField,
  FieldType,
  TextAnswer,
  User,
} from "@/lib/__codegen__/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import Error404 from "./404";

export default function Subscriptions() {
  const [cursor, setCursor] = useState(0);
  const [unsubscribedIds, setUnsubscribedIds] = useState<number[]>([]);

  const { data, loading, error } = useQuery<{
    me: User;
  }>(SUBSCRIPTIONS);

  useEffect(() => setCursor(0), [data]);

  const [subscribe] = useMutation(SUBSCRIBE);
  const [unsubscribe] = useMutation(UNSUBSCRIBE);

  if (loading) return <Loading />;

  if (error) {
    return <Error404 />;
  }
  if (!data) {
    return <EmptyFeed />;
  }

  return (
    <div className="flex flex-col items-center dark:bg-white">
      {data.me.subscriptionCount === 0 ? <EmptyFeed /> : (
        <>
          <Bio profile={data.me.subscriptions[cursor].profile} />
          {data.me.subscriptions[cursor].answers.map((answer) => {
            return answer.type === FieldType.Text
              ? (
                <TextQuestion
                  key={answer.field.id}
                  question={answer.field.question}
                  answer={(answer as TextAnswer).value}
                />
              )
              : (
                <ChoiceQuestion
                  key={answer.field.id}
                  question={answer.field.question}
                  options={(answer.field as ChoiceField).options}
                  indeces={(answer as ChoiceAnswer).indices}
                />
              );
          })}
          <div className="flex w-screen justify-center">
            <button
              className="bg-black w-2/6 flex justify-center"
              onClick={() => {
                setCursor((cursor + 1) % data.me.subscriptionCount);
                window.scrollTo({ top: 0 });
              }}
            >
              <LeftArrow />
            </button>
            <button
              className={`w-2/6 flex justify-center align-middle content-center" ${
                unsubscribedIds.includes(data.me.subscriptions[cursor].id)
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
              onClick={() => {
                if (
                  !unsubscribedIds.includes(data.me.subscriptions[cursor].id)
                ) {
                  unsubscribe({
                    variables: {
                      userId: data.me.subscriptions[cursor].id,
                    },
                  });
                  setUnsubscribedIds(
                    unsubscribedIds.concat(data.me.subscriptions[cursor].id),
                  );
                } else {
                  subscribe({
                    variables: {
                      userId: data.me.subscriptions[cursor].id,
                    },
                  });
                  setUnsubscribedIds(
                    unsubscribedIds.filter(
                      (id) => id !== data.me.subscriptions[cursor].id,
                    ),
                  );
                }
              }}
            >
              {unsubscribedIds.includes(data.me.subscriptions[cursor].id)
                ? <Like />
                : <Dislike /> }
            </button>
            <button
              className="bg-black w-2/6 flex justify-center"
              onClick={() => {
                setCursor(
                  (data.me.subscriptionCount + cursor - 1) %
                    data.me.subscriptionCount,
                );
                window.scrollTo({ top: 0 });
              }}
            >
              <RightArrow />
            </button>
          </div>
        </>
      )}
    </div>
  );
}