import { client } from './client';

import {
  ApiRoot,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';

type Nullable<T> = T | null;
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
}: Credentials): ApiRoot {
  return createApiBuilderFromCtpClient(
    client(projectKey, clientID, clientSecret, scopes)
  ).withProjectKey({ projectKey });
}
