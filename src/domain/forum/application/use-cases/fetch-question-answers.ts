import { Either, left, right } from '@/core/either';
import { Answer } from '../../enterprise/entities/answer';
import { AnswerRepository } from '../repositories/answer.repository';
import { ResourceNotFoundError } from './errors/resource-not-found.error';

interface FetchQuestionAnswersRequest {
  questionId: string;
  page: number;
}
type FetchQuestionAnswersResponse = Either<
  ResourceNotFoundError,
  Answer[]
>;

export class FetchQuestionAnswers {
  constructor(private readonly repository: AnswerRepository) {}

  async execute({
    questionId,
    page, // eslint-disable-next-line max-len
  }: FetchQuestionAnswersRequest): Promise<FetchQuestionAnswersResponse> {
    const answers = await this.repository.findManyByQuestionId(
      questionId,
      {
        page,
      },
    );

    if (!answers) return left(new ResourceNotFoundError());

    return right(answers);
  }
}
