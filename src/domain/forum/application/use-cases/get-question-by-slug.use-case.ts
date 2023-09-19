import { Question } from '../../enterprise/entities/question.entity';
import { QuestionRepository } from '../repositories/question.repository';

interface GetQuestionBySlugUseCaseRequest {
  slug: string;
}

interface GetQuestionBySlugUseCaseResponse {
  question: Question;
}

export class GetQuestionBySlugUseCase {
  constructor(private readonly repository: QuestionRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    const question = await this.repository.findQuestionBySlug(slug);

    if (!question) throw new Error('Question not found!');

    return { question };
  }
}
