/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
};

export type Answer = {
  createdAt: Scalars['DateTime']['output'];
  field: Field;
  respondent: User;
  type: FieldType;
  updatedAt: Scalars['DateTime']['output'];
};

export type AnsweringDistribution = Distribution & {
  __typename?: 'AnsweringDistribution';
  createdAt: Scalars['DateTime']['output'];
  creator: User;
  fieldCount: Scalars['Int']['output'];
  fields: Array<Field>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  participantCount: Scalars['Int']['output'];
  participants: Array<User>;
  state: DistributionState;
  updatedAt: Scalars['DateTime']['output'];
};

export type ChoiceAnswer = Answer & {
  __typename?: 'ChoiceAnswer';
  createdAt: Scalars['DateTime']['output'];
  field: ChoiceField;
  indices: Array<Scalars['Int']['output']>;
  respondent: User;
  type: FieldType;
  updatedAt: Scalars['DateTime']['output'];
};

export type ChoiceField = Field & {
  __typename?: 'ChoiceField';
  answerCount: Scalars['Int']['output'];
  answers: Array<ChoiceAnswer>;
  createdAt: Scalars['DateTime']['output'];
  creator: User;
  id: Scalars['Int']['output'];
  multiple: Scalars['Boolean']['output'];
  options: Array<Scalars['String']['output']>;
  question: Scalars['String']['output'];
  required: Scalars['Boolean']['output'];
  type: FieldType;
};

export type ClosedDistribution = Distribution & {
  __typename?: 'ClosedDistribution';
  createdAt: Scalars['DateTime']['output'];
  creator: User;
  fieldCount: Scalars['Int']['output'];
  fields: Array<Field>;
  groupCount: Scalars['Int']['output'];
  groups: Array<Group>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  participantCount: Scalars['Int']['output'];
  participants: Array<User>;
  state: DistributionState;
  updatedAt: Scalars['DateTime']['output'];
};

export type Distribution = {
  createdAt: Scalars['DateTime']['output'];
  creator: User;
  fieldCount: Scalars['Int']['output'];
  fields: Array<Field>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  state: DistributionState;
  updatedAt: Scalars['DateTime']['output'];
};

export enum DistributionState {
  Answering = 'ANSWERING',
  Closed = 'CLOSED',
  Gathering = 'GATHERING',
  Preparing = 'PREPARING'
}

export type Field = {
  answerCount: Scalars['Int']['output'];
  answers: Array<Answer>;
  createdAt: Scalars['DateTime']['output'];
  creator: User;
  id: Scalars['Int']['output'];
  question: Scalars['String']['output'];
  required: Scalars['Boolean']['output'];
  type: FieldType;
};

export enum FieldType {
  Choice = 'CHOICE',
  Text = 'TEXT'
}

export type GatheringDistribution = Distribution & {
  __typename?: 'GatheringDistribution';
  createdAt: Scalars['DateTime']['output'];
  creator: User;
  fieldCount: Scalars['Int']['output'];
  fields: Array<Field>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  participantCount: Scalars['Int']['output'];
  participants: Array<User>;
  state: DistributionState;
  updatedAt: Scalars['DateTime']['output'];
};

export enum Gender {
  Female = 'FEMALE',
  Male = 'MALE'
}

export type Group = {
  __typename?: 'Group';
  createdAt: Scalars['DateTime']['output'];
  distribution: ClosedDistribution;
  id: Scalars['Int']['output'];
  memberCount: Scalars['Int']['output'];
  members: Array<User>;
};

export type JoinDistributionUpdate = {
  __typename?: 'JoinDistributionUpdate';
  distribution: JoinableDistribution;
  user: User;
};

export type JoinableDistribution = AnsweringDistribution | GatheringDistribution;

export type LeavableDistribution = AnsweringDistribution | GatheringDistribution;

export type LeaveDistributionUpdate = {
  __typename?: 'LeaveDistributionUpdate';
  distribution: LeavableDistribution;
  user: User;
};

export type MarkViewedUpdate = {
  __typename?: 'MarkViewedUpdate';
  user: User;
  viewer: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createChoiceField: ChoiceField;
  createDistribution: PreparingDistribution;
  createTextField: TextField;
  deleteDistribution: Scalars['Int']['output'];
  joinDistribution: JoinDistributionUpdate;
  leaveDistribution: LeaveDistributionUpdate;
  markViewed: MarkViewedUpdate;
  setChoiceAnswer: SetChoiceAnswerUpdate;
  setTextAnswer: SetTextAnswerUpdate;
  subscribe: SubscribeUpdate;
  unsubscribe: UnsubscribeUpdate;
  updateDistributionFields: PreparingDistribution;
  updateDistributionName: Distribution;
  updateDistributionState: Distribution;
  updateUserProfile: User;
};


export type MutationCreateChoiceFieldArgs = {
  multiple: Scalars['Boolean']['input'];
  options: Array<Scalars['String']['input']>;
  question: Scalars['String']['input'];
  required: Scalars['Boolean']['input'];
};


export type MutationCreateDistributionArgs = {
  name: Scalars['String']['input'];
};


export type MutationCreateTextFieldArgs = {
  format?: InputMaybe<Scalars['String']['input']>;
  question: Scalars['String']['input'];
  required: Scalars['Boolean']['input'];
  sample?: InputMaybe<Scalars['String']['input']>;
};


export type MutationDeleteDistributionArgs = {
  distributionId: Scalars['Int']['input'];
};


export type MutationJoinDistributionArgs = {
  distributionId: Scalars['Int']['input'];
};


export type MutationLeaveDistributionArgs = {
  distributionId: Scalars['Int']['input'];
};


export type MutationMarkViewedArgs = {
  userId: Scalars['Int']['input'];
};


export type MutationSetChoiceAnswerArgs = {
  fieldId: Scalars['Int']['input'];
  indices: Array<Scalars['Int']['input']>;
};


export type MutationSetTextAnswerArgs = {
  fieldId: Scalars['Int']['input'];
  value: Scalars['String']['input'];
};


export type MutationSubscribeArgs = {
  userId: Scalars['Int']['input'];
};


export type MutationUnsubscribeArgs = {
  userId: Scalars['Int']['input'];
};


export type MutationUpdateDistributionFieldsArgs = {
  distributionId: Scalars['Int']['input'];
  fieldIds: Array<Scalars['Int']['input']>;
};


export type MutationUpdateDistributionNameArgs = {
  distributionId: Scalars['Int']['input'];
  name: Scalars['String']['input'];
};


export type MutationUpdateDistributionStateArgs = {
  distributionId: Scalars['Int']['input'];
  state: DistributionState;
};


export type MutationUpdateUserProfileArgs = {
  bio: Scalars['String']['input'];
  birthday: Scalars['Date']['input'];
  firstName: Scalars['String']['input'];
  gender: Gender;
  lastName: Scalars['String']['input'];
};

export type PreparingDistribution = Distribution & {
  __typename?: 'PreparingDistribution';
  createdAt: Scalars['DateTime']['output'];
  creator: User;
  fieldCount: Scalars['Int']['output'];
  fields: Array<Field>;
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  state: DistributionState;
  updatedAt: Scalars['DateTime']['output'];
};

export type Profile = {
  __typename?: 'Profile';
  bio: Scalars['String']['output'];
  birthday: Scalars['Date']['output'];
  firstName: Scalars['String']['output'];
  gender: Gender;
  lastName: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  answer: Answer;
  answerCount: Scalars['Int']['output'];
  answers: Array<Answer>;
  distribution: Distribution;
  distributionCount: Scalars['Int']['output'];
  distributions: Array<Distribution>;
  field: Field;
  fieldCount: Scalars['Int']['output'];
  fields: Array<Field>;
  group: Group;
  groupCount: Scalars['Int']['output'];
  groups: Array<Group>;
  me: User;
  recommend: Array<User>;
  user: User;
  userCount: Scalars['Int']['output'];
  users: Array<User>;
};


export type QueryAnswerArgs = {
  fieldId: Scalars['Int']['input'];
  respondentId: Scalars['Int']['input'];
};


export type QueryAnswerCountArgs = {
  fieldId: Scalars['Int']['input'];
};


export type QueryAnswersArgs = {
  fieldId: Scalars['Int']['input'];
};


export type QueryDistributionArgs = {
  distributionId: Scalars['Int']['input'];
};


export type QueryFieldArgs = {
  fieldId: Scalars['Int']['input'];
};


export type QueryGroupArgs = {
  groupId: Scalars['Int']['input'];
};


export type QueryRecommendArgs = {
  amount?: Scalars['Int']['input'];
  distributionId: Scalars['Int']['input'];
};


export type QueryUserArgs = {
  userId: Scalars['Int']['input'];
};

export enum Role {
  Editor = 'EDITOR',
  Viewer = 'VIEWER'
}

export type SetChoiceAnswerUpdate = {
  __typename?: 'SetChoiceAnswerUpdate';
  answer: ChoiceAnswer;
  field: ChoiceField;
  user: User;
};

export type SetTextAnswerUpdate = {
  __typename?: 'SetTextAnswerUpdate';
  answer: TextAnswer;
  field: TextField;
  user: User;
};

export type SubscribeUpdate = {
  __typename?: 'SubscribeUpdate';
  subscriber: User;
  user: User;
};

export type TextAnswer = Answer & {
  __typename?: 'TextAnswer';
  createdAt: Scalars['DateTime']['output'];
  field: TextField;
  respondent: User;
  type: FieldType;
  updatedAt: Scalars['DateTime']['output'];
  value: Scalars['String']['output'];
};

export type TextField = Field & {
  __typename?: 'TextField';
  answerCount: Scalars['Int']['output'];
  answers: Array<TextAnswer>;
  createdAt: Scalars['DateTime']['output'];
  creator: User;
  format?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  question: Scalars['String']['output'];
  required: Scalars['Boolean']['output'];
  sample?: Maybe<Scalars['String']['output']>;
  type: FieldType;
};

export type UnsubscribeUpdate = {
  __typename?: 'UnsubscribeUpdate';
  unsubscriber: User;
  user: User;
};

export type User = {
  __typename?: 'User';
  answers: Array<Answer>;
  createdAt: Scalars['DateTime']['output'];
  distributionCount: Scalars['Int']['output'];
  distributions: Array<Distribution>;
  fieldCount: Scalars['Int']['output'];
  fields: Array<Field>;
  groupCount: Scalars['Int']['output'];
  groups: Array<Group>;
  id: Scalars['Int']['output'];
  profile: Profile;
  role: Role;
  subscriberCount: Scalars['Int']['output'];
  subscribers: Array<User>;
  subscriptionCount: Scalars['Int']['output'];
  subscriptions: Array<User>;
  updatedAt: Scalars['DateTime']['output'];
  username: Scalars['String']['output'];
  viewed: Array<User>;
  viewedCount: Scalars['Int']['output'];
  views: Scalars['Int']['output'];
};
