import { randomUUID } from 'crypto';

interface AnswerProps {
  content: string;
  questionId: string;
  authorId: string;
}

export class Answer {
  questionId: string;
  authorId: string;
  content: string;
  constructor(
    props: AnswerProps,
    public id?: string,
  ) {
    this.questionId = props.questionId;
    this.authorId = props.authorId;
    this.content = props.content;
    this.id = id ?? randomUUID();
  }
}
