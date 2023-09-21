import { Optional } from '@/core/types/optional';
import { UniqueEntityId } from './value-objects/unique-entity-id';
import { CommentProps, Comment } from './comment';

export interface QuestionCommentProps extends CommentProps {
  questionId: UniqueEntityId;
}

export class QuestionComment extends Comment<QuestionCommentProps> {
  get questionId(): UniqueEntityId {
    return this.props.questionId;
  }

  static create(
    props: Optional<QuestionCommentProps, 'createdAt'>,
    id?: UniqueEntityId,
  ) {
    const questionComment = new QuestionComment(
      {
        ...props,
        createdAt: new Date(),
      },
      id,
    );

    return questionComment;
  }
}
