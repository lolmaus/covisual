import DS from 'ember-data';
import Intl from 'ember-intl/services/intl';
import EmberError from '@ember/error';
import AccessDeniedError from './errors/access-denied';
import CredentialsError from './errors/credentials';
import HttpResponseError from './errors/http-response';
import NotFoundError from './errors/not-found';
import OfflineError from './errors/offline';

const ErrorMapping = [
  [DS.UnauthorizedError, 'unauthorized'],
  [DS.ForbiddenError, 'forbidden'],
  [DS.NotFoundError, 'not_found'],
  [DS.ServerError, 'server_error'],
];

export type AnyError =
  | EmberError
  | DS.UnauthorizedError
  | DS.ForbiddenError
  | DS.NotFoundError
  | DS.ServerError
  | AccessDeniedError
  | CredentialsError
  | HttpResponseError
  | NotFoundError
  | OfflineError;

export function errorTranslationKey(
  intl: Intl,
  error: AnyError,
  keyPrefix = 'exceptions'
): string | void {
  const rawMessage = 'message' in error ? error.message : String(error);
  let key = `${keyPrefix}.${rawMessage}`;

  // try translation of error.message
  if (intl.exists(key)) {
    return key;
  }

  // check if error is an ember-data error with a known mapping
  if (error instanceof DS.AdapterError) {
    // @ts-ignore
    const found = ErrorMapping.find(([klass]) => error instanceof klass);
    if (found) {
      key = `${keyPrefix}.${found[1]}`;
      if (intl.exists(key)) {
        return key;
      }
    }
  }

  // try translation of error.messageKey
  if ('messageKey' in error) {
    key = `${keyPrefix}.${error.messageKey}`;
    if (intl.exists(key)) {
      return key;
    }
  }
}

export default function translateError(
  intl: Intl,
  error: AnyError,
  keyPrefix = 'exceptions'
): string {
  const key = errorTranslationKey(intl, error, keyPrefix);

  if (key) {
    return intl.t(key);
  }

  const rawMessage = 'message' in error ? error.message : String(error);
  return rawMessage;
}
