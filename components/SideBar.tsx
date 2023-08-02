import {
  DELETE_DISTRIBUTION,
  UPDATE_DISTRIBUTION_STATE,
} from "@/graphql/mutations";
import { DistributionState } from "@/lib/__codegen__/graphql";
import { useMutation } from "@apollo/client";
import { Dialog, Transition } from "@headlessui/react";
import router from "next/router";
import { Fragment, useState } from "react";

export interface ISideBar {
  readonly state: DistributionState;
  readonly participants: number;
  readonly id: number;
}

export default function SideBar({ state, participants, id }: ISideBar) {
  const [isOpen, setIsOpen] = useState(false);
  const [deleteDistr, { data: deleted }] = useMutation(
    DELETE_DISTRIBUTION,
  );
  const [updateDistrState, { data: updatedState }] = useMutation(
    UPDATE_DISTRIBUTION_STATE,
  );

  function deleteDistribution() {
    deleteDistr({
      variables: {
        distributionId: id,
      },
    });
    if (deleted) {
      closeModal();
      router.push("http://randorm.com/home");
    }
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(true);
  }

  function updateDistributionState() {
    updateDistrState({
      variables: {
        distributionId: id,
        state: (state == DistributionState.Preparing
          ? "ANSWERING"
          : state == DistributionState.Answering
          ? "GATHERING"
          : "CLOSED"),
      },
    });
    if (updatedState) {
      window.location.reload();
    }
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Delete distribution
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure? These action cannot be prevented.
                    </p>
                  </div>

                  <div className="mt-4 flex justify-around">
                    <button
                      className=" w-40 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={deleteDistribution}
                    >
                      Delete
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
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
                  <button
                    className={`text-red-400 text-sm font-extralight`}
                    onClick={openModal}
                  >
                    Delete
                  </button>
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
                  <button
                    className={`text-opacity-50 text-black text-sm font-extralight`}
                    onClick={updateDistributionState}
                  >
                    Open Feed
                  </button>
                </div>
              )
              : state == DistributionState.Gathering
              ? (
                <div className={"continueBtn"}>
                  <button
                    className={`text-opacity-50 text-black text-sm font-extralight`}
                    onClick={updateDistributionState}
                  >
                    Distribute
                  </button>
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
                Now users can join the distribution and give answers to
                questions. Send an invitation link.
              </div>
            )
            : state == DistributionState.Gathering
            ? (
              <div className="mt-2 text-justify text-black text-opacity-40 text-sm">
                Users can still join the distribution. Don't forget to specify
                the distribution deadline.
              </div>
            )
            : state == DistributionState.Closed
            ? (
              <div className="mt-2 text-justify text-black text-opacity-40 text-sm">
                Now you can export {participants ? participants / 4 : 0}{" "}
                groups based on participants' interests. Thanks for using our
                service!
              </div>
            )
            : <></>}
        </div>
      </div>
    </>
  );
}
