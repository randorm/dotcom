import Bio from "@/components/Bio";
import Question from "@/components/Question";
import SelectionButton from "@/components/SelectionButton";
import { PROFILE } from "@/graphql/queries";
import { Profile } from "@/lib/__codegen__/graphql";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
export default function Feed() {
  const { data, error } = useQuery(PROFILE, {
    variables: { userId: 1 }
  });
  const [profile, setProfile] = useState<Profile>({} as Profile);
  useEffect(() => {
    if (data) {
      setProfile(data.user.profile);
    }
  }, [data]);
  return (
    <div className="flex flex-col items-center">
      <Bio
        profile={profile}
      />
      <Question question="Where are you from?" answer="Moskow" />
      <Question question="What is your favourite fruit?" answer="Banana" />
      <Question question="Do you go to the gym?" answer="Yes" />
      <Question question="Are you smoking?" answer="No" />
      <Question question="Do you like partying?" answer="Absolutely" />
      <SelectionButton />
    </div>
  );
}
