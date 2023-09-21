import { Question } from '../../enterprise/entities/question.entity';

export interface QuestionRepository {
  create(question: Question): Promise<void>;
  findById(id: string): Promise<Question | null>;
  findQuestionBySlug(slug: string): Promise<Question | null>;
  delete(question: Question): Promise<void>;
  save(question: Question): Promise<void>;
}
