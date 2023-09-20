import { QuestionRepository } from '../../src/domain/forum/application/repositories/question.repository';
import { Question } from '../../src/domain/forum/enterprise/entities/question.entity';

export class InMemoryQuestionRepository implements QuestionRepository {
  public items: Question[] = [];
  async findById(id: string): Promise<Question | null> {
    const question = this.items.find((item) => item.id.toString() === id);

    if (!question) return null;

    return question;
  }

  async findQuestionBySlug(slug: string) {
    const question = this.items.find((item) => item.slug.value === slug);

    if (!question) return null;

    return question;
  }

  async create(question: Question): Promise<void> {
    this.items.push(question);
  }

  async delete(question: Question): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === question.id);
    this.items.splice(itemIndex, 1);
  }
}
