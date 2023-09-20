import { Question } from '../../enterprise/entities/question.entity';
import { QuestionRepository } from '../repositories/question.repository';

interface GetQuestionBySlugRequest {
  slug: string;
}

interface GetQuestionBySlugResponse {
  question: Question;
}

export class GetQuestionBySlug {
  constructor(private readonly repository: QuestionRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugRequest): Promise<GetQuestionBySlugResponse> {
    const question = await this.repository.findQuestionBySlug(slug);

    if (!question) throw new Error('Question not found!');

    return { question };
  }
}
