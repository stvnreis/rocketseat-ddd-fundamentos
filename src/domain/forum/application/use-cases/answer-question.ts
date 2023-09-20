import { Answer } from '../../enterprise/entities/answer.entity';
import { UniqueEntityId } from '../../enterprise/entities/value-objects/unique-entity-id';
import { AnswerRepository } from '../repositories/answer.repository';

interface AnswerQuestionRequest {
  instructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestion {
  constructor(private readonly repository: AnswerRepository) {}

  async execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionRequest): Promise<Answer> {
    const answer = Answer.create({
      content,
      questionId: new UniqueEntityId(questionId),
      authorId: new UniqueEntityId(instructorId),
    });

    await this.repository.create(answer);

    return answer;
  }
}
