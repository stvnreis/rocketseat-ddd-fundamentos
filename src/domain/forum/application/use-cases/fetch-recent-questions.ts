import { Either, left, right } from '@/core/either';
import { Question } from '../../enterprise/entities/question';
import { QuestionRepository } from '../repositories/question.repository';
import { ResourceNotFoundError } from './errors/resource-not-found.error';

interface FetchRecentQuestionsRequest {
  page: number;
}

type FetchRecentQuestionsResponse = Either<
  ResourceNotFoundError,
  Question[]
>;

export class FetchRecentQuestions {
  constructor(private readonly repository: QuestionRepository) {}

  async execute({
    page, // eslint-disable-next-line max-len
  }: FetchRecentQuestionsRequest): Promise<FetchRecentQuestionsResponse> {
    const questions = await this.repository.findManyRecente({
      page,
    });

    if (!questions) return left(new ResourceNotFoundError());

    return right(questions);
  }
}
