import Button from "@/components/Button";
import Distribution from "@/components/Distribution";
import DistributionButton from "@/components/DistributionButton";
export default function Home() {
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
        <div className="flex">
          <Distribution
            distributionName="Check-in 2024"
            state="Preparing"
            color="bg-purple-300"
          />
          <Distribution
            distributionName="Check-in 2023"
            state="Gathering"
            color="bg-green-300"
          />
        </div>
        <div className="flex">
          <Distribution
            distributionName="Check-in 2022"
            state="Closed"
            color="bg-blue-300"
          />
          <Distribution
            distributionName="Check-in 2021"
            state="Closed"
            color="bg-blue-300"
          />
        </div>
      </div>
    </>
  );
}
