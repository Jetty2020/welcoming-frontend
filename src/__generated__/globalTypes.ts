/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  Client = 'Client',
  Manager = 'Manager',
  Seller = 'Seller',
}

export interface AllPostsInput {
  page?: number | null;
  order?: number | null;
}

export interface CreateAccountInput {
  email: string;
  nickname: string;
  password: string;
  role: UserRole;
}

export interface GetEventsInput {
  page?: number | null;
  eventNum?: number | null;
}

export interface GetTodayDealPostInput {
  page?: number | null;
  postNum?: number | null;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface ResetPasswordInput {
  email?: string | null;
  password?: string | null;
}

export interface SendEmailInput {
  email: string;
  code: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
