import { DistributionState } from "@/lib/__codegen__/graphql";

export default function SideBar() {
  const state = DistributionState.Preparing;
  return (
    <div className="">
      <div className="area flex flex-col justify-center ">
        <img className="px-8 mb-2" src="../progress-bar.svg" alt="" />
        <div className="flex justify-around">
          <div
            className={`text-center text-xxs rounded-md w-16 bg-purple-300`}
          >
            PREPARING
          </div>
          <div
            className={`text-center text-xxs rounded-md w-16 bg-green-300`}
          >
            GATHERING
          </div>
          <div
            className={`text-center text-xxs rounded-md w-16 bg-blue-300`}
          >
            CLOSED
          </div>
        </div>
      </div>
      <div className="area">Video</div>
      <div className="area">
        <div className="grid grid-flow-col justify-stretch grid-cols-2">
          <div className={"deleteBtn"}>
            <p className={`text-red-400 text-sm font-extralight`}>
              Delete
            </p>
          </div>
          <div className={"continueBtn"}>
            <p className={`text-opacity-50 text-black text-sm font-extralight`}>
              Next Step
            </p>
          </div>
        </div>
        <div className="mt-2 text-justify text-black text-opacity-40 text-sm">
          Come up with the questions. Note, in the next step you can NOT edit
          questions or delete distribution.
        </div>
      </div>
    </div>
  );
}
