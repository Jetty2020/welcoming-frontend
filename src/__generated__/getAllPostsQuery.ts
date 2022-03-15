/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { AllPostsInput } from './globalTypes';

// ====================================================
// GraphQL query operation: getAllPostsQuery
// ====================================================

export interface getAllPostsQuery_getAllPosts_posts {
  __typename: 'Post';
  id: number;
  title: string;
  ori_price: number;
  selling_price: number | null;
}

export interface getAllPostsQuery_getAllPosts {
  __typename: 'AllPostsOutput';
  ok: boolean;
  error: string | null;
  posts: getAllPostsQuery_getAllPosts_posts[] | null;
}

export interface getAllPostsQuery {
  getAllPosts: getAllPostsQuery_getAllPosts;
}

export interface getAllPostsQueryVariables {
  getAllPostsInput: AllPostsInput;
}
