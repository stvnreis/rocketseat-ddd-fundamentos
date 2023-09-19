import { AnswerRepository } from '../../src/domain/forum/application/repositories/answer.repository';
import { Answer } from '../../src/domain/forum/enterprise/entities/answer.entity';

export class InMemoryAnswerRepository implements AnswerRepository {
  public items: Answer[] = [];
  async create(answer: Answer): Promise<void> {
    this.items.push(answer);
  }
}
