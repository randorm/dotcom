import Bio from "@/components/Bio";
import EmptyFeed from "@/components/EmptyFeed";
import Loading from "@/components/Loading";
import { ChoiceQuestion, TextQuestion } from "@/components/Question";
import SelectionButton from "@/components/SelectionButton";
import { FEED } from "@/graphql/queries";
import {
  ChoiceAnswer,
  Field,
  Profile,
  TextAnswer,
} from "@/lib/__codegen__/graphql";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Feed() {
  const router = useRouter();
  const { id } = router.query;

  function showNextUser() {
    if (data.recommend.length > userNumber + 1) {
      setUserNumber(userNumber + 1);
    } else {
      setUserNumber(0);
      refetch({ distributionId: Number(id) });
    }
  }

  const { data, error, loading, refetch } = useQuery(FEED, {
    variables: { distributionId: Number(id) },
  });
  const [profile, setProfile] = useState<Profile>({} as Profile);
  const [textAnswers, setTextAnswer] = useState<TextAnswer[]>();
  const [choiceAnswers, setChoiceAnswer] = useState<ChoiceAnswer[]>();
  const [userNumber, setUserNumber] = useState(0);
  const [userId, setUserId] = useState(0);
  const textAnswersArray: TextAnswer[] = [];
  const choiceAnswersArray: ChoiceAnswer[] = [];
  const distributionQuestionsArray: number[] = [];
  useEffect(() => {
    if (data) {
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
          textAnswersArray.push(data.recommend[userNumber].answers[i]);
        } else if (
          data.recommend[userNumber].answers[i].indices &&
          distributionQuestionsArray.includes(
            data.recommend[userNumber].answers[i].field.id,
          )
        ) {
          choiceAnswersArray.push(data.recommend[userNumber].answers[i]);
        } else {
          continue;
        }
      }

      setProfile(data.recommend[userNumber].profile);
      setTextAnswer(textAnswersArray);
      setChoiceAnswer(choiceAnswersArray);
      setUserId(data.recommend[userNumber].id);
    }
  }, [data, userNumber]);

  return (
    <div className="flex flex-col items-center last:mb-10">
      {data?.recommend.length == 0 && <EmptyFeed />}
      {loading && <Loading />}
      <Bio
        profile={profile}
      />
      {textAnswers?.map((textAnswer) => (
        <TextQuestion
          key={textAnswer.field.id}
          question={textAnswer.field.question}
          answer={textAnswer.value}
        />
      ))}
      {choiceAnswers?.map((choiceAnswer) => (
        <ChoiceQuestion
          key={choiceAnswer.field.id}
          question={choiceAnswer.field.question}
          indeces={choiceAnswer.indices}
        />
      ))}
      <p>{profile.firstName}</p>
      <button className="fixed bottom-0" onClick={showNextUser}>
        <SelectionButton userId={userId} />
      </button>
    </div>
  );
}
