import { gql } from "@apollo/client";
import DistributionComponent from "@/components/DistributionComponent";
import DistributionButton from "@/components/DistributionButton";
import { Distribution } from "@/lib/__codegen__/graphql";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

export const DISTRIBUTIONS = gql(`
  query {
    distributions {
      name
      state
    }
  }
`);

export default function Home() {
  const { data, error } = useQuery(DISTRIBUTIONS);
  const [distr, setDistr] = useState<Distribution[]>([]);
  useEffect(() => {
    if (data) {
      setDistr(data.distributions);
    }
  }, [data]);

  return (
    <>
      <div className="flex justify-between">
        <img
          className="w-52 m-5"
          src="./short-logo-t-b.png"
        />
        <div className="text-neutral-900 text-lg font-extralight m-5 mr-8">
          Name Surname
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-32">
        <div className="flex items-center w-4/6 justify-between mb-4">
          <div className="font-extralight text-xl">
            <p>Distributions</p>
            <p className="text-sm opacity-40">4 distributions</p>
          </div>
          <DistributionButton />
        </div>
        <ul>
          {distr.map((distributions, i) => (
            <li key={i}>
              <DistributionComponent
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
