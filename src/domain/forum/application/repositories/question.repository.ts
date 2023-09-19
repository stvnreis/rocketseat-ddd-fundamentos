import { Question } from '../../enterprise/entities/question.entity';

export interface QuestionRepository {
  create(question: Question): Promise<void>;
  findQuestionBySlug(slug: string): Promise<Question | null>;
}
