/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { GetEventsInput } from './globalTypes';

// ====================================================
// GraphQL query operation: getEventsQuery
// ====================================================

export interface getEventsQuery_getEvents_events {
  __typename: 'Event';
  id: number;
  carouselImg: string | null;
  carouselTitle: string | null;
}

export interface getEventsQuery_getEvents {
  __typename: 'GetEventsOutput';
  ok: boolean;
  error: string | null;
  events: getEventsQuery_getEvents_events[] | null;
}

export interface getEventsQuery {
  getEvents: getEventsQuery_getEvents;
}

export interface getEventsQueryVariables {
  getEventsInput: GetEventsInput;
}
