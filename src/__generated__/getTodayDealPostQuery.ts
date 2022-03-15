/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetTodayDealPostInput } from './globalTypes';

// ====================================================
// GraphQL query operation: getTodayDealPostQuery
// ====================================================

export interface getTodayDealPostQuery_getTodayDealPost_posts {
  __typename: 'Post';
  id: number;
  title: string;
  ori_price: number;
  selling_price: number | null;
}

export interface getTodayDealPostQuery_getTodayDealPost {
  __typename: 'GetTodayDealPostOutput';
  ok: boolean;
  error: string | null;
  posts: getTodayDealPostQuery_getTodayDealPost_posts[] | null;
}

export interface getTodayDealPostQuery {
  getTodayDealPost: getTodayDealPostQuery_getTodayDealPost;
}

export interface getTodayDealPostQueryVariables {
  todayDealInput: GetTodayDealPostInput;
}
