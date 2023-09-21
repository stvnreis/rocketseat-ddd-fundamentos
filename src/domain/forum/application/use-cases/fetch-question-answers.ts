import { Answer } from '../../enterprise/entities/answer';
import { AnswerRepository } from '../repositories/answer.repository';

interface FetchQuestionAnswersRequest {
  questionId: string;
  page: number;
}
interface FetchQuestionAnswersResponse {
  answers: Answer[];
}

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

    return { answers };
  }
}
