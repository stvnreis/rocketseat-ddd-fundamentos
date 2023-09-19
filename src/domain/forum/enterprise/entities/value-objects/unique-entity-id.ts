import { randomUUID } from 'crypto';

export class UniqueEntityId {
  private value;
  constructor(value?: string) {
    this.value = value ?? randomUUID();
  }

  toString(): string {
    return this.value.toString();
  }

  toValue(): string {
    return this.value;
  }
}
