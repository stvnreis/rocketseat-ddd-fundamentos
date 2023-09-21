import { Either, left, right } from '../../../../core/either';
import { QuestionComment } from '../../enterprise/entities/question-comment';
import { UniqueEntityId } from '../../enterprise/entities/value-objects/unique-entity-id';
import { QuestionCommentRepository } from '../repositories/question-comment.repository';
import { QuestionRepository } from '../repositories/question.repository';
import { ResourceNotFoundError } from './errors/resource-not-found.error';

interface CommentOnQuestionRequest {
  questionId: string;
  authorId: string;
  content: string;
}

type CommentOnQuestionResponse = Either<
  ResourceNotFoundError,
  QuestionComment
>;

export class CommentOnQuestion {
  constructor(
    private questionRepository: QuestionRepository,
    private questionCommentRepository: QuestionCommentRepository,
  ) {}

  async execute({
    questionId,
    authorId,
    content,
  }: CommentOnQuestionRequest): Promise<CommentOnQuestionResponse> {
    const question =
      await this.questionRepository.findById(questionId);

    if (!question) return left(new ResourceNotFoundError());

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    });

    await this.questionCommentRepository.create(questionComment);

    return right(questionComment);
  }
}
