import { gql } from "@/lib/apollo-client";
import { useQuery } from "@apollo/client";

const GET_ME = gql(`
  query GetMe {
    me {
      id
      username
      views
    }
  }
`);

export default function Home() {
  const { data, error } = useQuery(GET_ME);
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24`}
    >
      {JSON.stringify(data)}
    </main>
  );
}
