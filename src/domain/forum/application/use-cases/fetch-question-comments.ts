import { QuestionComment } from '../../enterprise/entities/question-comment';
import { QuestionCommentRepository } from '../repositories/question-comment.repository';
import { ResourceNotFoundError } from './errors/resource-not-found.error';
import { Either, left, right } from '../../../../core/either';

interface FetchQuestionCommentsRequest {
  questionId: string;
  page: number;
}

type FetchQuestionCommentsResponse = Either<
  ResourceNotFoundError,
  QuestionComment[]
>;

export class FetchQuestionComments {
  constructor(
    private questionCommentRepository: QuestionCommentRepository,
  ) {}

  async execute({
    questionId,
    page, // eslint-disable-next-line max-len
  }: FetchQuestionCommentsRequest): Promise<FetchQuestionCommentsResponse> {
    const questionComments =
      await this.questionCommentRepository.findManyByQuestionId(
        questionId,
        { page },
      );

    if (!questionComments) return left(new ResourceNotFoundError());

    return right(questionComments);
  }
}
