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
  /** The `Date` is a date in the format YYYY-MM-DD */
  Date: any;
};

export type Call = {
  __typename?: 'Call';
  success: Scalars['Boolean'];
  time: Scalars['Int'];
  type: CallType;
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
  scheduleEventCreate: ScheduleEvent;
  scheduleEventDelete: Scalars['Boolean'];
  scheduleEventUpdate: Scalars['Boolean'];
  serviceCreate: Service;
  serviceDelete: Scalars['Boolean'];
  serviceUpdate: Service;
  userPasswordChange: Scalars['Boolean'];
  userProfileUpdate: User;
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


export type MutationScheduleEventCreateArgs = {
  input: ScheduleEventNew;
};


export type MutationScheduleEventDeleteArgs = {
  filter: ScheduleEventCurrentFilter;
};


export type MutationScheduleEventUpdateArgs = {
  filter: ScheduleEventCurrentFilter;
  input: ScheduleEventCurrent;
};


export type MutationServiceCreateArgs = {
  categoryId: Scalars['Int'];
  duration: Scalars['Int'];
  price: Scalars['Int'];
};


export type MutationServiceDeleteArgs = {
  serviceId: Scalars['Int'];
};


export type MutationServiceUpdateArgs = {
  duration: Scalars['Int'];
  price: Scalars['Int'];
  serviceId: Scalars['Int'];
};


export type MutationUserPasswordChangeArgs = {
  confirmPassword: Scalars['String'];
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};


export type MutationUserProfileUpdateArgs = {
  email: Scalars['String'];
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  phone: Scalars['String'];
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
  scheduleEvent: ScheduleEvent;
  scheduleEvents: Array<ScheduleEvent>;
  service: Service;
  services: Array<Service>;
};


export type QueryScheduleEventArgs = {
  id: Scalars['Int'];
};


export type QueryScheduleEventsArgs = {
  filter: ScheduleEventsFilter;
  userId: Scalars['Int'];
};


export type QueryServiceArgs = {
  id: Scalars['Int'];
};


export type QueryServicesArgs = {
  userId: Scalars['Int'];
};

export enum Role {
  Client = 'client',
  Master = 'master'
}

export type ScheduleEvent = {
  __typename?: 'ScheduleEvent';
  code: Scalars['String'];
  color?: Maybe<Scalars['String']>;
  date: Scalars['Date'];
  id: Scalars['Int'];
  intervalEnd: Scalars['String'];
  intervalStart: Scalars['String'];
  services?: Maybe<Array<Maybe<Scalars['Int']>>>;
  type: ScheduleEventType;
  userId: Scalars['Int'];
};

export type ScheduleEventCurrent = {
  color: Scalars['String'];
  intervalEnd: Scalars['String'];
  intervalStart: Scalars['String'];
  services?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export type ScheduleEventCurrentFilter = {
  code: Scalars['String'];
  fromDate?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['Int']>;
};

export type ScheduleEventNew = {
  color?: InputMaybe<Scalars['String']>;
  date: Scalars['Date'];
  intervalEnd: Scalars['String'];
  intervalStart: Scalars['String'];
  services?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  type: ScheduleEventType;
};

export enum ScheduleEventType {
  Daily = 'daily',
  Monthly = 'monthly',
  Once = 'once',
  Weekday = 'weekday',
  Weekly = 'weekly'
}

export type ScheduleEventsFilter = {
  fromDate: Scalars['Date'];
  toDate: Scalars['Date'];
};

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
