import Bio from "@/components/Bio";
import { ChoiceQuestion, TextQuestion } from "@/components/Question";
import SelectionButton from "@/components/SelectionButton";
import { FEED } from "@/graphql/queries";
import { ChoiceAnswer, Profile, TextAnswer } from "@/lib/__codegen__/graphql";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

export default function Feed() {
  function showNextUser() {
    if (data.recommend.length > userNumber+1) {
      setUserNumber(userNumber + 1)
    } else {
      setUserNumber(0)
      refetch({ distributionId: 539 })
    }
    
  }

  const { data, error, refetch } = useQuery(FEED, {
    variables: { distributionId: 539 },
  });
  const [profile, setProfile] = useState<Profile>({} as Profile);
  const [textAnswers, setTextAnswer] = useState<TextAnswer[]>();
  const [choiceAnswers, setChoiceAnswer] = useState<ChoiceAnswer[]>();
  const [userNumber, setUserNumber] = useState(0);
  useEffect(() => {
    if (data) {
      setProfile(data.recommend[userNumber].profile);
      setTextAnswer(data.recommend[userNumber].answers);
      setChoiceAnswer(data.recommend[userNumber].answers);
      console.log(data.recommend[userNumber].answers);
    }
  }, [data, userNumber]);

  return (
    <div className="flex flex-col items-center last:mb-10">
      <Bio
        profile={profile}
      />
      {textAnswers?.map((textAnswer) => (
        textAnswer.value &&
        <TextQuestion
          question={textAnswer.field.question}
          answer={textAnswer.value}
        />
      ))}
      {choiceAnswers?.map((choiceAnswer) => (
        choiceAnswer.indices &&
        <ChoiceQuestion
          question={choiceAnswer.field.question}
          indeces={choiceAnswer.indices}
        />
      ))}
      <button className="fixed bottom-0" onClick={showNextUser}><SelectionButton /></button>
    </div>
  );
}
