import { useMutation, useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { GET_DISTRIBUTION } from "@/graphql/queries";
import {
  AnsweringDistribution,
  ChoiceField,
  Distribution,
  DistributionState,
  Field,
  FieldType,
  GatheringDistribution,
  TextField,
  User,
} from "@/lib/__codegen__/graphql";
import Header from "@/components/Header";
import AddButton from "@/components/AddButton";
import SideBar from "@/components/SideBar";
import TextQuestion from "@/components/TextQuestion";
import ChoiceQuestion from "@/components/ChoiseQuestion";
import Loading from "@/components/Loading";
import Error404 from "../404";
import Button from "@/components/Button";
import {
  CREATE_CHOICE_FIELD,
  CREATE_TEXT_FIELD,
  UPDATE_DISTRIBUTION_FIELDS,
  UPDATE_DISTRIBUTION_NAME,
} from "@/graphql/mutations";

export default function CurrentDistribution() {
  const router = useRouter();
  const { id } = router.query;
  const [isOpen, setIsOpen] = useState(false);
  const [cursor, setCursor] = useState(-1);
  const [name, setName] = useState("");
  const [fields, setFields] = useState<Field[]>([]);
  const [newFields, setNewFields] = useState<Field[]>([]);
  const [newName] = useMutation(UPDATE_DISTRIBUTION_NAME)
  const [choiceField, { data: createdChoiceField }] = useMutation(
    CREATE_CHOICE_FIELD,
    {
      onCompleted() {
        setCursor(cursor + 1);
      },
    },
  );
  const [textField, { data: createdTextField }] = useMutation(
    CREATE_TEXT_FIELD,
    {
      onCompleted() {
        setCursor(cursor + 1);
      },
    },
  );
  const [updateFields] = useMutation(
    UPDATE_DISTRIBUTION_FIELDS,
    {
      onCompleted() {
        window.location.reload();
      },
    },
  );
  let fieldsIds: number[] = [];

  useEffect(() => {
    let updatedList = newFields;
    if (createdTextField) {
      updatedList[cursor] = createdTextField.createTextField;
      updatedList[cursor].type = FieldType.Text;
    }

    if (createdChoiceField) {
      updatedList[cursor] = createdChoiceField.createChoiceField;
      updatedList[cursor].type = FieldType.Choice;
    }

    if (cursor + 1 == newFields.length && newFields.length != 0) {
      updatedList = fields.slice(0, fields.length - newFields.length);

      if (updatedList.length == 0) {
        updatedList = newFields;
      } else {
        updatedList = updatedList.concat(newFields);
      }
      fieldsIds = updatedList.map((field) => {
        return field.id;
      });

      if (
        fieldsIds.length == updatedList.length
      ) {
        updateFields({
          variables: {
            distributionId: Number(id),
            fieldIds: fieldsIds,
          },
        });
      }
    }
  }, [newFields, cursor]);

  function save() {
    newName({
      variables: {
        distributionId: Number(id),
        name: name,
      }
    })

    newFields.map((field) => {
      field.type === FieldType.Text
        ? (
          textField({
            variables: {
              required: field.required,
              question: field.question,
            },
          })
        )
        : (
          choiceField({
            variables: {
              required: field.required,
              question: field.question,
              multiple: (field as ChoiceField).multiple,
              options: (field as ChoiceField).options,
            },
          })
        );
    });
  }

  function createChoiceField() {
    closeModal();
    type ChoiceFieldNew = Pick<
      ChoiceField,
      "multiple" | "options" | "question" | "required"
    >;
    let updatedList = fields;
    let field: ChoiceFieldNew = {
      multiple: false,
      options: ["A", "B", "C"],
      question: "Question",
      required: true,
    };
    let newField: ChoiceField[] = [field as ChoiceField];
    newField[0].type = FieldType.Choice;
    updatedList = updatedList.concat(newField);
    setFields(updatedList);
    setNewFields(newFields.concat(newField));
  }

  function createTextField() {
    closeModal();
    type TextFieldNew = Pick<
      TextField,
      "question" | "required"
    >;
    let updatedList = fields;
    let field: TextFieldNew = {
      question: "Question",
      required: true,
    };
    let newField: TextField[] = [field as TextField];
    newField[0].type = FieldType.Text;
    updatedList = updatedList.concat(newField);
    setFields(updatedList);
    setNewFields(newFields.concat(newField));
  }

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const { data, error, loading } = useQuery<{
    distribution: Distribution;
    me: User;
  }>(GET_DISTRIBUTION, {
    variables: { distributionId: Number(id) },
  });

  useEffect(() => {
    if (data) {
      setFields(data.distribution.fields);
      setName(data.distribution.name);
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
                      onClick={() => createChoiceField()}
                    >
                      Choice Question
                    </button>
                    <button
                      className="w-40 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => createTextField()}
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
      <Header
        firstname={data.me.profile.firstName}
        lastname={data.me.profile.lastName}
      >
      </Header>
      <div className="flex flex-col mt-20">
        <div className="grid justify-items-center">
          <div className="grid grid-cols-2 mb-4 gap-x-150">
            <div className="font-extralight text-xl">
              <input defaultValue={name}  onChange={(e) => setName(e.target.value)}/>
              <p className="text-sm opacity-40">
                {fields.length} questions
              </p>
            </div>
            {data.distribution.state == DistributionState.Preparing
              ? (
                <div className="flex">
                  <button onClick={() => save()}>
                    <Button text="Save" />
                  </button>
                  <button
                    onClick={openModal}
                  >
                    <AddButton imageSrc="../plus.png" text="New Question" />
                  </button>
                </div>
              )
              : data.distribution.state == DistributionState.Answering ||
                  data.distribution.state == DistributionState.Gathering
              ? (
                <div className="flex items-baseline">
                  <img className="mr-4 w-3" src="../online.svg" alt="online" />
                  <p>
                    {`${
                      (data.distribution as AnsweringDistribution)
                        .participantCount
                    } PARTICIPATED`}
                  </p>
                </div>
              )
              : <></>}
          </div>
          <div className="flex w-10/12 justify-items-center">
            <div
              className={`flex-none flex-col w-8/12 ${
                data.distribution.state == DistributionState.Preparing
                  ? ""
                  : "pointer-events-none"
              }`}
            >
              {fields.map((field) => {
                return field.type === FieldType.Text
                  ? (
                    <TextQuestion
                      key={`${data.distribution.id}:${field.id}`}
                      question={field.question}
                      sample={(field as TextField).sample}
                      required={field.required}
                      format={(field as TextField).format}
                      fields={fields}
                      id={field.id}
                      distributionId={Number(id)}
                    />
                  )
                  : (
                    <ChoiceQuestion
                      key={`${data.distribution.id}:${field.id}`}
                      question={field.question}
                      options={(field as ChoiceField).options}
                      required={field.required}
                      multiple={(field as ChoiceField).multiple}
                      fields={fields}
                      id={field.id}
                      distributionId={Number(id)}
                    />
                  );
              })}
            </div>
            <div className="flex-auto w-9/12">
              <SideBar
                state={data.distribution.state}
                participants={(data.distribution as GatheringDistribution)
                  .participantCount}
                id={data.distribution.id}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
