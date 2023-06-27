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
        <div className={`text-center text-xxs rounded-md w-16 `}>
          {state}
        </div>
      </div>
      <Button text="View" />
    </div>
  );
}
