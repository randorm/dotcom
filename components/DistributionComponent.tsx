import Button from "./Button";
import { DistributionState } from "@/lib/__codegen__/graphql";

export interface IDistribution {
  readonly name: string;
  readonly state: DistributionState;
}

export default function DistributionComponent(
  { name, state }: IDistribution,
) {
  return (
    <div className="distributionSection">
      <div className="ml-4">
        <p className="">{name}</p>
        <div className={`text-center text-xxs rounded-md w-16 ${ state == DistributionState.Preparing ? "bg-purple-300" : state == DistributionState.Gathering ? "bg-green-300" : state == DistributionState.Answering ? "bg-red-900" : state == DistributionState.Closed ? "bg-blue-300" : ""}`}>
          {state}
        </div>
      </div>
      <Button text="View" />
    </div>
  );
}
