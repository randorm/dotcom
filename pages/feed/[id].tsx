import Bio from "@/components/Bio";
import EmptyFeed from "@/components/EmptyFeed";
import Loading from "@/components/Loading";
import { ChoiceQuestion, TextQuestion } from "@/components/Question";
import SelectionButton from "@/components/SelectionButton";
import { FEED } from "@/graphql/queries";
import { MARK_VIEWED, SUBSCRIBE } from "@/graphql/mutations";
import { useMutation } from "@apollo/client";
import Image from "next/image";
import leftArrow from "../public/left-arrow.svg";
import righrArrow from "../public/right-arrow.svg";

import {
  ChoiceAnswer,
  ChoiceField,
  Field,
  FieldType,
  Profile,
  TextAnswer,
} from "@/lib/__codegen__/graphql";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useUpdateEffect } from "usehooks-ts";

export default function Feed() {
  const router = useRouter();
  const { id } = router.query;

  function showNextUser() {
    window.scrollTo(0, 0);
    markViewed({
      variables: {
        userId: userId,
      },
    });

    if (
      (data.recommend.length > userNumber + 1) && (data.recommend.length > 1)
    ) {
      setUserNumber(userNumber + 1);
    } else {
      refetch({ distributionId: Number(id) });
      setUserNumber(0);

      if (data.recommend.length == 0) {
        window.location.reload();
      }
    }
  }

  const { data, error, loading, refetch } = useQuery(FEED, {
    variables: { distributionId: Number(id) },
  });
  const [markViewed, { data: viewed }] = useMutation(
    MARK_VIEWED,
  );

  const [subscribe, { data: subscribed }] = useMutation(
    SUBSCRIBE,
  );

  const [profile, setProfile] = useState<Profile>({} as Profile);
  const [answers, setAnswers] = useState<(TextAnswer | ChoiceAnswer)[]>();
  const [userNumber, setUserNumber] = useState(0);
  const [userId, setUserId] = useState(0);
  const [fl, setFl] = useState(true);

  useEffect(() => {
    const answersArray: (TextAnswer | ChoiceAnswer)[] = [];
    const distributionQuestionsArray: number[] = [];

    if (data && fl) {
      console.log(data);
      if (data.recommend.length != 0) {
        data.distribution.fields?.map((field: Field) => (
          distributionQuestionsArray.push(field.id)
        ));

        for (var i = 0; i < data.recommend[userNumber].answers.length; i++) {
          if (
            data.recommend[userNumber].answers[i].value &&
            distributionQuestionsArray.includes(
              data.recommend[userNumber].answers[i].field.id,
            )
          ) {
            answersArray.push(data.recommend[userNumber].answers[i]);
          } else if (
            data.recommend[userNumber].answers[i].indices &&
            distributionQuestionsArray.includes(
              data.recommend[userNumber].answers[i].field.id,
            )
          ) {
            answersArray.push(data.recommend[userNumber].answers[i]);
          } else {
            continue;
          }
        }

        setProfile(data.recommend[userNumber].profile);
        setAnswers(answersArray);
        setUserId(data.recommend[userNumber].id);
        setFl(false);
      }
    }
  }, [data]);

  useUpdateEffect(() => {
    console.log("update");
    const answersArray: (TextAnswer | ChoiceAnswer)[] = [];
    const distributionQuestionsArray: number[] = [];

    if (data) {
      console.log(data);
      if (data.recommend.length != 0) {
        data.distribution.fields?.map((field: Field) => (
          distributionQuestionsArray.push(field.id)
        ));

        for (var i = 0; i < data.recommend[userNumber].answers.length; i++) {
          if (
            data.recommend[userNumber].answers[i].value &&
            distributionQuestionsArray.includes(
              data.recommend[userNumber].answers[i].field.id,
            )
          ) {
            answersArray.push(data.recommend[userNumber].answers[i]);
          } else if (
            data.recommend[userNumber].answers[i].indices &&
            distributionQuestionsArray.includes(
              data.recommend[userNumber].answers[i].field.id,
            )
          ) {
            answersArray.push(data.recommend[userNumber].answers[i]);
          } else {
            continue;
          }
        }

        setProfile(data.recommend[userNumber].profile);
        setAnswers(answersArray);
        setUserId(data.recommend[userNumber].id);
      }
    }
  }, [userNumber]);

  return (
    <div className="flex flex-col items-center last:mb-10 dark:bg-white">
      {loading && <Loading />}
      {(data?.recommend.length == 0 || data?.recommend.length == undefined)
        ? <EmptyFeed />
        : (
          <>
            <Bio
              profile={profile}
            />
            {answers?.map((answer) =>
              answer.type === FieldType.Text
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
                    options={(answer.field as ChoiceField).options}
                    question={answer.field.question}
                    indeces={(answer as ChoiceAnswer).indices}
                  />
                )
            )}
            {
              /* <button
              disabled={loading}
              className="fixed bottom-0"
              onClick={showNextUser}
            >
              <SelectionButton userId={userId} />
            </button> */
            }
            <div className="flex w-screen justify-center">
              <button
                disabled={loading}
                onClick={() => showNextUser}
                className="bg-black w-3/6 flex justify-center"
              >
                <Image src={leftArrow} alt="Dislike the person" />
              </button>
              <button
                disabled={loading}
                onClick={() => {
                  subscribe({
                    variables: {
                      userId: userId,
                    },
                  });
                  showNextUser;
                  refetch({ distributionId: Number(id) });
                  setUserNumber(0);
                }}
                className="bg-green-600 w-3/6 flex justify-center"
              >
                <Image src={righrArrow} alt="Like the person" />
              </button>
            </div>
          </>
        )}
    </div>
  );
}
