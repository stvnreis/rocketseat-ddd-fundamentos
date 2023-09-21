import { PaginationParams } from '@/core/repositories/pagination-params';
import { Question } from '../../enterprise/entities/question';

export interface QuestionRepository {
  create(question: Question): Promise<void>;
  findManyRecente(
    params: PaginationParams,
  ): Promise<Question[] | null>;
  findById(id: string): Promise<Question | null>;
  findQuestionBySlug(slug: string): Promise<Question | null>;
  delete(question: Question): Promise<void>;
  save(question: Question): Promise<void>;
}
