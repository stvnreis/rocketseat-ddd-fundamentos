import { QuestionRepository } from '../../src/domain/forum/application/repositories/question.repository';
import { Question } from '../../src/domain/forum/enterprise/entities/question.entity';

export class InMemoryQuestionRepository implements QuestionRepository {
  public items: Question[] = [];
  async findQuestionBySlug(slug: string) {
    const question = this.items.find((item) => item.slug.value === slug);

    if (!question) return null;

    return question;
  }

  async create(question: Question): Promise<void> {
    this.items.push(question);
  }
}
