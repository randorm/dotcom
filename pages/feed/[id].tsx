import Bio from "@/components/Bio";
import EmptyFeed from "@/components/EmptyFeed";
import FinishedDistribution from "@/components/FinishedDistribution";
import LeftArrow from "@/components/LeftArrow";
import Loading from "@/components/Loading";
import { ChoiceQuestion, TextQuestion } from "@/components/Question";
import RightArrow from "@/components/RightArrow";
import { MARK_VIEWED, SUBSCRIBE } from "@/graphql/mutations";
import { FEED } from "@/graphql/queries";
import {
  ChoiceAnswer,
  ChoiceField,
  Distribution,
  FieldType,
  TextAnswer,
  User,
} from "@/lib/__codegen__/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Error404 from "../404";

export default function Feed() {
  const router = useRouter();
  const distributionId = Number(router.query.id);

  const [cursor, setCursor] = useState(0);

  const { data, loading, error, refetch } = useQuery<{
    distribution: Distribution;
    recommend: readonly User[];
  }>(
    FEED,
    { variables: { distributionId } },
  );

  useEffect(
    () => {
      if (!data) return;

      if (cursor >= data.recommend.length) {
        refetch({ distributionId });
      }

      window.scrollTo({ top: 0 });
    },
    [cursor],
  );
  useEffect(() => setCursor(0), [data]);

  const [markViewed] = useMutation(MARK_VIEWED);
  const [subscribe] = useMutation(SUBSCRIBE);

  if (loading) return <Loading />;

  if (error) {
    return <Error404 />;
  }
  if (!data) {
    return <EmptyFeed />;
  }

  if (Date.now() != new Date(2023, 3, 1, 10, 30, 0, 0).getMilliseconds()) {
    return <FinishedDistribution />
  }

  return (
    <div className="flex flex-col items-center dark:bg-white">
      {data.recommend.length === 0
        ? <EmptyFeed />
        : cursor >= data.recommend.length
        ? <Loading />
        : (
          <>
            <Bio profile={data.recommend[cursor].profile} />
            {data.distribution.fields.map((field) => {
              const answer = data.recommend[cursor].answers
                .find((answer) => answer.field.id === field.id);

              if (!answer) return;

              return answer.type === FieldType.Text
                ? (
                  <TextQuestion
                    key={`${data.recommend[cursor].id}:${answer.field.id}`}
                    question={answer.field.question}
                    answer={(answer as TextAnswer).value}
                  />
                )
                : (
                  <ChoiceQuestion
                    key={`${data.recommend[cursor].id}:${answer.field.id}`}
                    question={answer.field.question}
                    options={(answer.field as ChoiceField).options}
                    indeces={(answer as ChoiceAnswer).indices}
                  />
                );
            })}
            <div className="flex w-screen justify-center">
              <button
                className="bg-black w-3/6 flex justify-center"
                onClick={() => {
                  markViewed({
                    variables: { userId: data.recommend[cursor].id },
                  });
                  setCursor(cursor + 1);
                }}
              >
                <LeftArrow />
              </button>
              <button
                className="bg-green-600 w-3/6 flex justify-center"
                onClick={() => {
                  markViewed({
                    variables: { userId: data.recommend[cursor].id },
                  });
                  subscribe({
                    variables: { userId: data.recommend[cursor].id },
                  });
                  setCursor(cursor + 1);
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
