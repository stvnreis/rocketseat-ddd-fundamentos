import { Question } from '../../enterprise/entities/question.entity';
import { UniqueEntityId } from '../../enterprise/entities/value-objects/unique-entity-id';
import { QuestionRepository } from '../repositories/question.repository';

interface CreateQuestionRequest {
  authorId: string;
  title: string;
  content: string;
}

interface CreateQuestionResponse {
  question: Question;
}

export class CreateQuestion {
  constructor(private readonly repository: QuestionRepository) {}

  async execute({
    authorId,
    title,
    content,
  }: CreateQuestionRequest): Promise<CreateQuestionResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      title,
      content,
    });

    this.repository.create(question);

    return { question };
  }
}
