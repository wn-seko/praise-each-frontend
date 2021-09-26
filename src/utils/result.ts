export type Result<T, E> = Success<T, E> | Failure<T, E>;

export class Success<T, E> {
  constructor(readonly value: T) {
    this.value = value;
  }

  type = 'success' as const;

  isSuccess(): this is Success<T, E> {
    return true;
  }

  isFailure(): this is Failure<T, E> {
    return false;
  }
}

export class Failure<T, E> {
  constructor(readonly value: E) {
    this.value = value;
  }

  type = 'failure' as const;

  isSuccess(): this is Success<T, E> {
    return false;
  }

  isFailure(): this is Failure<T, E> {
    return true;
  }
}
