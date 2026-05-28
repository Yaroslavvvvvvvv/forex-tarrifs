import type { AxiosError } from 'axios';

export type ApiFieldErrors = Record<string, string[]>;

interface ApiErrorBody {
  message?: string;
  error?: string;
  errors?: ApiFieldErrors;
}

/**
 * Normalize an axios error into something displayable:
 * field errors object, a message string, or null.
 */
export function getRequestError(e: unknown): string | ApiFieldErrors | null {
  const err = e as AxiosError<ApiErrorBody>;
  const data = err?.response?.data;
  if (!data) return err?.message ?? null;
  return data.errors ?? data.message ?? data.error ?? null;
}
