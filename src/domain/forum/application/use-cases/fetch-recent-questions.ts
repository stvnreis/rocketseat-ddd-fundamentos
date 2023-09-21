import { Question } from '../../enterprise/entities/question';
import { QuestionRepository } from '../repositories/question.repository';

interface FetchRecentQuestionsRequest {
  page: number;
}

interface FetchRecentQuestionsResponse {
  questions: Question[];
}

export class FetchRecentQuestions {
  constructor(private readonly repository: QuestionRepository) {}

  async execute({
    page, // eslint-disable-next-line max-len
  }: FetchRecentQuestionsRequest): Promise<FetchRecentQuestionsResponse> {
    const questions = await this.repository.findManyRecente({
      page,
    });

    if (!questions) throw new Error('No question found');

    return { questions };
  }
}
