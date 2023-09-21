import { Either, right } from '../../../../core/either';
import { Answer } from '../../enterprise/entities/answer';
import { UniqueEntityId } from '../../enterprise/entities/value-objects/unique-entity-id';
import { AnswerRepository } from '../repositories/answer.repository';

interface AnswerQuestionRequest {
  instructorId: string;
  questionId: string;
  content: string;
}

type AnswerQuestionResponse = Either<{}, Answer>;

export class AnswerQuestion {
  constructor(private readonly repository: AnswerRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionRequest): Promise<AnswerQuestionResponse> {
    const answer = Answer.create({
      content,
      questionId: new UniqueEntityId(questionId),
      authorId: new UniqueEntityId(instructorId),
    });

    await this.repository.create(answer);

    return right(answer);
  }
}
