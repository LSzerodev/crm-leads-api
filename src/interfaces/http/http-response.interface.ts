export interface SuccessOptions<T> {
  status?: number;
  message: string;
  data?: T;
  meta?: Record<string, unknown>;
}
