import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GET_DISTRIBUTION } from "@/graphql/queries";
import { Distribution } from "@/lib/__codegen__/graphql";
import Header from "@/components/Header";
import AddButton from "@/components/AddButton";
import SideBar from "@/components/SideBar";
import ChoiseQuestion from "@/components/ChoiseQuestion";
import TextQuestion from "@/components/TextQuestion";

export default function CurrentDistribution() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useQuery(GET_DISTRIBUTION, {
    variables: { distributionId: Number(id), userId: 1 },
  });

  const [distr, setDistr] = useState<Distribution>({} as Distribution);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  useEffect(() => {
    if (data) {
      setDistr(data.distribution);
      setFirstname(data.user.profile.firstName);
      setLastname(data.user.profile.lastName);
    }
  }, [data]);

  return (
    <>
      <Header firstname={firstname} lastname={lastname}></Header>
      <div className="flex flex-col mt-20">
        <div className="grid justify-items-center">
          <div className="grid grid-cols-2 mb-4 gap-x-150">
            <div className="font-extralight text-xl">
              <p>{distr.name}</p>
              <p className="text-sm opacity-40">2 questions</p>
            </div>
            <button>
              <AddButton imageSrc="../plus.png" text="New Question" />
            </button>
          </div>
          <div className="flex w-10/12 justify-items-center">
            <div className="flex-none flex-col w-8/12">
              <ChoiseQuestion />
              <TextQuestion />
            </div>
            <div className="flex-auto w-9/12">
              <SideBar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
