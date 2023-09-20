import { AnswerRepository } from '@/domain/forum/application/repositories/answer.repository';
import { Answer } from '@/domain/forum/enterprise/entities/answer.entity';

export class InMemoryAnswerRepository implements AnswerRepository {
  public items: Answer[] = [];
  async findById(id: string): Promise<Answer | null> {
    const answer = this.items.find((item) => item.id.toString() === id);

    if (!answer) throw new Error('Answer not found');

    return answer;
  }

  async create(answer: Answer): Promise<void> {
    this.items.push(answer);
  }

  async delete(answer: Answer): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id);
    this.items.splice(itemIndex, 1);
  }
}
