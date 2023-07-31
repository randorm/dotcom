import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { GET_DISTRIBUTION } from "@/graphql/queries";
import {
  ChoiceField,
  Distribution,
  FieldType,
  TextField,
} from "@/lib/__codegen__/graphql";
import Header from "@/components/Header";
import AddButton from "@/components/AddButton";
import SideBar from "@/components/SideBar";
import TextQuestion from "@/components/TextQuestion";
import ChoiceQuestion from "@/components/ChoiseQuestion";
import Loading from "@/components/Loading";
import Error404 from "../404";
import Button from "@/components/Button";
import { CREATE_CHOICE_FIELD, CREATE_TEXT_FIELD } from "@/graphql/mutations";

export default function CurrentDistribution() {
  const router = useRouter();
  const { id } = router.query;
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [choiceField] = useMutation(CREATE_CHOICE_FIELD);
  const [textField] = useMutation(CREATE_TEXT_FIELD);

  function createChoiceField() {
    setIsOpen(false);
    choiceField({
      variables: {
        required: false,
        question: "Question",
        multiple: false,
        options: ["A", "B", "C"],
      }
    });
    refetch({  distributionId: Number(id) });
  }

  function createTextField() {
    setIsOpen(false);
    textField({
      variables: {
        required: false,
        question: "Question",
      }
    });
    refetch({  distributionId: Number(id) });
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(true);
  }

  const { data, error, loading, refetch } = useQuery(GET_DISTRIBUTION, {
    variables: { distributionId: Number(id) },
  });

  const [distr, setDistr] = useState<Distribution>({} as Distribution);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  useEffect(() => {
    if (data) {
      setDistr(data.distribution);
      setFirstname(data.me.profile.firstName);
      setLastname(data.me.profile.lastName);
      setNumberOfQuestions(data.distribution.fieldCount);
    }
  }, [data]);

  if (loading) return <Loading />;

  if (error) {
    return <Error404 />;
  }
  if (!data) {
    return <Error404 />;
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
                    Create new question
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Choose type of question that you want create.
                    </p>
                  </div>

                  <div className="mt-4 flex justify-around">
                    <button
                      className=" w-40 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={createChoiceField}
                    >
                      Choice Question
                    </button>
                    <button
                      className="w-40 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={createTextField}
                    >
                      Text Question
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <Header firstname={firstname} lastname={lastname}></Header>
      <div className="flex flex-col mt-20">
        <div className="grid justify-items-center">
          <div className="grid grid-cols-2 mb-4 gap-x-150">
            <div className="font-extralight text-xl">
              <p>{distr.name}</p>
              <p className="text-sm opacity-40">
                {numberOfQuestions} questions
              </p>
            </div>
            <div className="flex">
              <button>
                <Button text="Save" />
              </button>
              <button
                onClick={openModal}
              >
                <AddButton imageSrc="../plus.png" text="New Question" />
              </button>
            </div>
          </div>
          <div className="flex w-10/12 justify-items-center">
            <div className="flex-none flex-col w-8/12">
              {data.distribution.fields.map((field) => {
                return field.type === FieldType.Text
                  ? (
                    <TextQuestion
                      key={`${data.distribution.id}:${field.id}`}
                      question={field.question}
                      sample={(field as TextField).sample}
                      required={field.required}
                      format={field.format}
                    />
                  )
                  : (
                    <ChoiceQuestion
                      key={`${data.distribution.id}:${field.id}`}
                      question={field.question}
                      options={(field as ChoiceField).options}
                      required={field.required}
                      multiple={field.multiple}
                    />
                  );
              })}
            </div>
            <div className="flex-auto w-9/12">
              <SideBar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
