import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { GET_DISTRIBUTION } from "@/graphql/queries";
import { Distribution } from "@/lib/__codegen__/graphql";

export default function CurrentDistribution() {
  const router = useRouter();
  const { id } = router.query;

  const { data, error } = useQuery(GET_DISTRIBUTION, {
    variables: { distributionId: Number(id) },
  });

  const [distr, setDistr] = useState<Distribution>({} as Distribution);
  const [username, setUsername] = useState("");
  useEffect(() => {
    if (data) {
      setDistr(data.distribution);
      setUsername(data.me.username);
    }
  }, [data]);

  return (
    <>
      <div className="flex justify-between">
        <img
          className="w-52 m-5"
          src="../short-logo-t-b.png"
        />
        <div className="text-neutral-900 text-lg font-extralight m-5 mr-8">
          {username}
        </div>
      </div>
      <div>{distr.name}</div>
    </>
  );
}
