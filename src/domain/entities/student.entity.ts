import { randomUUID } from 'crypto';

interface StudentProps {
  name: string;
}

export class Student {
  name: string;
  constructor(
    props: StudentProps,
    public id?: string,
  ) {
    this.name = props.name;
    this.id = id ?? randomUUID();
  }
}
