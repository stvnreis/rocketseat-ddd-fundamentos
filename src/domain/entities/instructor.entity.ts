import { randomUUID } from 'crypto';

interface InstructorProps {
  name: string;
}

export class Instructor {
  name: string;
  constructor(
    props: InstructorProps,
    public id?: string,
  ) {
    this.name = props.name;
    this.id = id ?? randomUUID();
  }
}
