//Error
export class Left<L, R> {
  constructor(readonly value: L) {}

  isRight(): this is Right<L, R> {
    return false;
  }

  isLeft(): this is Left<L, R> {
    return true;
  }
}

//Success
export class Right<L, R> {
  constructor(readonly value: R) {}

  isRight(): this is Right<L, R> {
    return true;
  }

  isLeft(): this is Left<L, R> {
    return false;
  }
}

export type Either<L, R> = Left<L, R> | Right<L, R>;

export const left = <L, R>(reason: any): Either<L, R> => {
  return new Left(reason);
};

export const right = <L, R>(value: any): Either<L, R> => {
  return new Right(value);
};
