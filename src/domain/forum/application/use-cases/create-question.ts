import { Either, right } from '../../../../core/either';
import { Question } from '../../enterprise/entities/question';
import { UniqueEntityId } from '../../enterprise/entities/value-objects/unique-entity-id';
import { QuestionRepository } from '../repositories/question.repository';

interface CreateQuestionRequest {
  authorId: string;
  title: string;
  content: string;
}

type CreateQuestionResponse = Either<{}, Question>;

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

    await this.repository.create(question);

    return right(question);
  }
}
