import { AnswerRepository } from '@/domain/forum/application/repositories/answer.repository';
import { Answer } from '@/domain/forum/enterprise/entities/answer';
import { PaginationParams } from '../../src/core/repositories/pagination-params';

export class InMemoryAnswerRepository implements AnswerRepository {
  public items: Answer[] = [];

  async findManyByQuestionId(
    questionId: string,
    { page }: PaginationParams,
  ): Promise<Answer[]> {
    const answers = this.items
      .filter((item) => item.questionId.toString() === questionId)
      .slice((page - 1) * 20, page * 20);

    return answers;
  }
  async findById(id: string): Promise<Answer | null> {
    const answer = this.items.find(
      (item) => item.id.toString() === id,
    );

    if (!answer) throw new Error('Answer not found');

    return answer;
  }

  async create(answer: Answer): Promise<void> {
    this.items.push(answer);
  }

  async delete(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) => item.id === answer.id,
    );
    this.items.splice(itemIndex, 1);
  }

  async save(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex(
      (item) => item.id === answer.id,
    );
    this.items[itemIndex] = answer;
  }
}
