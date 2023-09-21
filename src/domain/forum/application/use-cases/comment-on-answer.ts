import { Either, left, right } from '@/core/either';
import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { UniqueEntityId } from '../../enterprise/entities/value-objects/unique-entity-id';
import { AnswerCommentRepository } from '../repositories/answer-comment.repository';
import { AnswerRepository } from '../repositories/answer.repository';
import { ResourceNotFoundError } from './errors/resource-not-found.error';

interface CommentOnAnswerRequest {
  answerId: string;
  authorId: string;
  content: string;
}

type CommentOnAnswerResponse = Either<
  ResourceNotFoundError,
  AnswerComment
>;
export class CommentOnAnswer {
  constructor(
    private answerRepository: AnswerRepository,
    private answerCommentRepository: AnswerCommentRepository,
  ) {}

  async execute({
    answerId,
    authorId,
    content,
  }: CommentOnAnswerRequest): Promise<CommentOnAnswerResponse> {
    const answer = await this.answerRepository.findById(answerId);

    if (!answer) return left(new ResourceNotFoundError());

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntityId(authorId),
      answerId: new UniqueEntityId(answerId),
      content,
    });

    await this.answerCommentRepository.create(answerComment);

    return right(answerComment);
  }
}
