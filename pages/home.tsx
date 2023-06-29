import DistributionComponent from "@/components/DistributionComponent";
import DistributionButton from "@/components/DistributionButton";
import { DISTRIBUTIONS } from "@/graphql/queries";
import { CREATE_DISTRIBUTION } from "@/graphql/mutations"
import { Distribution } from "@/lib/__codegen__/graphql";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

export default function Home() {
  const { data, error } = useQuery(DISTRIBUTIONS);
  const [distr, setDistr] = useState<Distribution[]>([]);
  const [username, setUsername] = useState("");
  const [distributionNumber, setDistributionNumber] = useState("");

  useEffect(() => {
    if (data) {
      setDistr(data.distributions);
      setUsername(data.me.username);
      setDistributionNumber(data.distributionCount);
    }
  }, [data]);

  const [createDistribution, { data: mutation }] = useMutation(CREATE_DISTRIBUTION);
  const addDistribution = () => {
    createDistribution({
      variables: {
        name: "Check-in 202#",
      },
    });
  };

  useEffect(() => {
    if (mutation) {
      window.location.href = `/distribution/${mutation.createDistribution.id}`
    }
  }, [mutation]);

  return (
    <>
      <div className="flex justify-between">
        <img
          className="w-52 m-5"
          src="./short-logo-t-b.png"
        />
        <div className="text-neutral-900 text-lg font-extralight m-5 mr-8">
          {username}
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-32 mb-24">
        <div className="grid grid-cols-2 gap-x-110 mb-4">
          <div className="font-extralight text-xl">
            <p>Distributions</p>
            <p className="text-sm opacity-40">{distributionNumber}</p>
          </div> 
          <button onClick={addDistribution}><DistributionButton imageSrc="./plus.png" text="New Distribution" /></button>
        </div>
        <ul className="grid grid-cols-2">
          {distr.map((distributions, i) => (
            <li key={i}>
              <DistributionComponent
                id={distributions.id}
                name={distributions.name}
                state={distributions.state}
              />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
