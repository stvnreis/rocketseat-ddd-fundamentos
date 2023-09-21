import { Either, left, right } from '@/core/either';
import { Question } from '../../enterprise/entities/question';
import { QuestionRepository } from '../repositories/question.repository';
import { ResourceNotFoundError } from './errors/resource-not-found.error';

interface GetQuestionBySlugRequest {
  slug: string;
}

type GetQuestionBySlugResponse = Either<
  ResourceNotFoundError,
  Question
>;

export class GetQuestionBySlug {
  constructor(private readonly repository: QuestionRepository) {}

  async execute({
    slug,
  }: GetQuestionBySlugRequest): Promise<GetQuestionBySlugResponse> {
    const question = await this.repository.findQuestionBySlug(slug);

    if (!question) return left(new ResourceNotFoundError());

    return right(question);
  }
}
