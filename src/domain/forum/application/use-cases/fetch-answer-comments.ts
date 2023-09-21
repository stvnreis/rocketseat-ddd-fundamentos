import { AnswerComment } from '../../enterprise/entities/answer-comment';
import { AnswerCommentRepository } from '../repositories/answer-comment.repository';

interface FetchAnswerCommentsRequest {
  answerId: string;
  page: number;
}

interface FetchAnswerCommentsResponse {
  answerComments: AnswerComment[];
}

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

    return { answerComments };
  }
}
