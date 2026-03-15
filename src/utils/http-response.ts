import type { Response } from 'express';
import { ZodError } from 'zod';
import type { SuccessOptions } from '../interfaces';
import { getErrorMessage, getErrorStatusCode } from './http-response.helpers';

export function sendSuccess<T>(
  res: Response,
  { status = 200, message, data, meta }: SuccessOptions<T>,
) {
  const payload: Record<string, unknown> = { message };

  if (data !== undefined) {
    payload.data = data;
  }

  if (meta) {
    payload.meta = meta;
  }

  return res.status(status).json(payload);
}

export function sendNoContent(res: Response) {
  return res.status(204).send();
}

export function sendError(res: Response, error: unknown) {
  if (error instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation error.',
      details: error.flatten(),
    });
  }

  return res.status(getErrorStatusCode(error)).json({
    message: getErrorMessage(error),
  });
}
