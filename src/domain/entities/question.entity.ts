import { randomUUID } from 'crypto';

interface QuestionProps {
  title: string;
  content: string;
  authorId: string;
}

export class Question {
  title: string;
  content: string;
  authorId: string;
  constructor(
    props: QuestionProps,
    public id?: string,
  ) {
    this.title = props.title;
    this.content = props.content;
    this.authorId = props.authorId;
    this.id = id ?? randomUUID();
  }
}
