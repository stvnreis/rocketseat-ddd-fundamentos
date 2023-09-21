import { PaginationParams } from '../../../../core/repositories/pagination-params';
import { QuestionComment } from '../../enterprise/entities/question-comment';

export interface QuestionCommentRepository {
  findManyByQuestionId(
    questionId: string,
    params: PaginationParams,
  ): Promise<QuestionComment[]>;
  findById(id: string): Promise<QuestionComment | null>;
  create(questionComment: QuestionComment): Promise<void>;
  delete(question: QuestionComment): Promise<void>;
}
