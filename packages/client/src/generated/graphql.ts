export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Call = {
  __typename?: 'Call';
  success: Scalars['Boolean'];
  time: Scalars['Int'];
  type: Scalars['String'];
};

export enum CallType {
  New = 'New',
  Repeat = 'Repeat'
}

export type Mutation = {
  __typename?: 'Mutation';
  callPassword: Call;
};


export type MutationCallPasswordArgs = {
  phone: Scalars['String'];
};
