import { client } from './client';

import {
  ByProjectKeyRequestBuilder,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';

type Nullable<T> = T | '';
export type Credentials = {
  projectKey: Nullable<string>;
  clientID: Nullable<string>;
  clientSecret: Nullable<string>;
  scopes: Nullable<string>;
};

export default function({
  projectKey,
  clientID,
  clientSecret,
  scopes,
}: Credentials): ByProjectKeyRequestBuilder {
  return createApiBuilderFromCtpClient(
    client(projectKey, clientID, clientSecret, scopes)
  ).withProjectKey({ projectKey });
}
