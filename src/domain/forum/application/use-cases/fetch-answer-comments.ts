import { Either, left, right } from '@/core/either';
import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { AnswerCommentRepository } from '../repositories/answer-comment.repository';
import { ResourceNotFoundError } from './errors/resource-not-found.error';

interface FetchAnswerCommentsRequest {
  answerId: string;
  page: number;
}

type FetchAnswerCommentsResponse = Either<
  ResourceNotFoundError,
  AnswerComment[]
>;

export class FetchAnswerComments {
  constructor(
    private answerCommentRepository: AnswerCommentRepository,
  ) {}

  async execute({
    answerId,
    page, // eslint-disable-next-line max-len
  }: FetchAnswerCommentsRequest): Promise<FetchAnswerCommentsResponse> {
    const answerComments =
      await this.answerCommentRepository.findManyByAnswerId(
        answerId,
        { page },
      );

    if (!answerComments) return left(new ResourceNotFoundError());

    return right(answerComments);
  }
}
