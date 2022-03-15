/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ResetPasswordInput } from './globalTypes';

// ====================================================
// GraphQL mutation operation: resetPasswordMutation
// ====================================================

export interface resetPasswordMutation_resetPassword {
  __typename: 'ResetPasswordOutput';
  ok: boolean;
}

export interface resetPasswordMutation {
  resetPassword: resetPasswordMutation_resetPassword;
}

export interface resetPasswordMutationVariables {
  resetPasswordInput: ResetPasswordInput;
}
