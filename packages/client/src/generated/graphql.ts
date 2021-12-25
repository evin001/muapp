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

export type Category = {
  __typename?: 'Category';
  id: Scalars['Int'];
  name: Scalars['String'];
  parentId?: Maybe<Scalars['Int']>;
  type: CategoryType;
  userId: Scalars['Int'];
};

export enum CategoryType {
  Child = 'child',
  Free = 'free',
  Parent = 'parent'
}

export type Mutation = {
  __typename?: 'Mutation';
  callPassword: Call;
  categoryCreate: Category;
  serviceCreate: Service;
  userRefreshToken: Tokens;
  userSignIn: User;
  userSignUp: User;
};


export type MutationCallPasswordArgs = {
  phone: Scalars['String'];
};


export type MutationCategoryCreateArgs = {
  name: Scalars['String'];
  parentId?: InputMaybe<Scalars['Int']>;
};


export type MutationServiceCreateArgs = {
  categoryId: Scalars['Int'];
  duration: Scalars['Int'];
  price: Scalars['Int'];
};


export type MutationUserRefreshTokenArgs = {
  refreshToken: Scalars['String'];
};


export type MutationUserSignInArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUserSignUpArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
};

export enum Role {
  Client = 'client',
  Master = 'master'
}

export type Service = {
  __typename?: 'Service';
  category: Category;
  duration: Scalars['Int'];
  id: Scalars['Int'];
  price: Scalars['Int'];
  userId: Scalars['Int'];
};

export type Tokens = {
  __typename?: 'Tokens';
  authToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  authToken: Scalars['String'];
  email: Scalars['String'];
  emailVerified: Scalars['Boolean'];
  firstName?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  lastName?: Maybe<Scalars['String']>;
  phone: Scalars['String'];
  phoneVerified: Scalars['Boolean'];
  refreshToken: Scalars['String'];
  role: Role;
};
