import { DistributionState } from "@/lib/__codegen__/graphql";
export interface ISideBar {
  readonly state: DistributionState;
  readonly participants: number
}

export default function SideBar({ state, participants }: ISideBar) {
  return (
    <div className="">
      <div className="area flex flex-col justify-center ">
        <img
          className="px-7 mb-2"
          src={`../progress-bar-${
            state == DistributionState.Preparing
              ? "preparing"
              : state == DistributionState.Gathering
              ? "gathering"
              : state == DistributionState.Answering
              ? "answering"
              : state == DistributionState.Closed
              ? "closed"
              : ""
          }.svg`}
          alt="preparing"
        />
        <div className="flex justify-around">
          <div
            className={`text-center text-xxs rounded-md w-16 bg-purple-300`}
          >
            PREPARING
          </div>
          <div
            className={`text-center text-xxs rounded-md w-16 bg-orange-300`}
          >
            ANSWERING
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
      <div className="area bg-neutral-900 h-44 opacity-20 text-center">
        <p className="text-white">VIDEO GUIDE</p>
      </div>
      <div className="area">
        <div className="grid grid-flow-col justify-stretch grid-cols-2 gap-1">
          {state == DistributionState.Preparing
            ? (
              <div className={"deleteBtn"}>
                <p className={`text-red-400 text-sm font-extralight`}>
                  Delete
                </p>
              </div>
            )
            : state != DistributionState.Closed
            ? (
              <div className={"shareBtn"}>
                <p className={`text-blue-400 text-sm font-extralight`}>
                  Share
                </p>
              </div>
            )
            : <></>}
          {state == DistributionState.Preparing
            ? (
              <div className={"continueBtn"}>
                <p
                  className={`text-opacity-50 text-black text-sm font-extralight`}
                >
                  Next Step
                </p>
              </div>
            )
            : state == DistributionState.Answering
            ? (
              <div className={"continueBtn"}>
                <p
                  className={`text-opacity-50 text-black text-sm font-extralight`}
                >
                  Open Feed
                </p>
              </div>
            )
            : state == DistributionState.Gathering
            ? (
              <div className={"continueBtn"}>
                <p
                  className={`text-opacity-50 text-black text-sm font-extralight`}
                >
                  Distribute
                </p>
              </div>
            )
            : <></>}
        </div>
        {state == DistributionState.Closed
            ? (
              <div className={"continueBtn"}>
                <p
                  className={`text-opacity-50 text-black text-sm font-extralight`}
                >
                  Export as <span className="text-green-400">.xlsx</span>
                </p>
              </div>
            )
            : <></>}
        {state == DistributionState.Preparing
          ? (
            <div className="mt-2 text-justify text-black text-opacity-40 text-sm">
              Come up with the questions. Note, in the next step you can NOT
              edit questions or delete distribution.
            </div>
          )
          : state == DistributionState.Answering
          ? (
            <div className="mt-2 text-justify text-black text-opacity-40 text-sm">
              Now users can join the distribution and give answers to questions.
              Send an invitation link.
            </div>
          )
          : state == DistributionState.Gathering
          ? (
            <div className="mt-2 text-justify text-black text-opacity-40 text-sm">
              Users can still join the distribution. Don't forget to specify the
              distribution deadline.
            </div>
          )
          : state == DistributionState.Closed
          ? (
            <div className="mt-2 text-justify text-black text-opacity-40 text-sm">
              Now you can export {participants ? participants/4 : 0} groups based on participants' interests.
              Thanks for using our service!
            </div>
          )
          : <></>}
      </div>
    </div>
  );
}
