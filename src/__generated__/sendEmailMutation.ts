/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SendEmailInput } from './globalTypes';

// ====================================================
// GraphQL mutation operation: sendEmailMutation
// ====================================================

export interface sendEmailMutation_sendEmail {
  __typename: 'SendEmailOutput';
  ok: boolean;
  error: string | null;
}

export interface sendEmailMutation {
  sendEmail: sendEmailMutation_sendEmail;
}

export interface sendEmailMutationVariables {
  sendEmailInput: SendEmailInput;
}
