import { Either, left, right } from '@/core/either';
import { Question } from '../../enterprise/entities/question';
import { UniqueEntityId } from '../../enterprise/entities/value-objects/unique-entity-id';
import { QuestionRepository } from '../repositories/question.repository';
import { NotAllowedError } from './errors/not-allowed.error';
import { ResourceNotFoundError } from './errors/resource-not-found.error';

interface ChooseQuestionBestAnswerRequest {
  questionId: string;
  bestAnswerId: string;
  questionAuthorId: string;
}

type ChooseQuestionBestAnswerResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  Question
>;

export class ChooseQuestionBestAnswer {
  constructor(private readonly repository: QuestionRepository) {}

  async execute({
    questionId,
    bestAnswerId,
    questionAuthorId, // eslint-disable-next-line max-len
  }: ChooseQuestionBestAnswerRequest): Promise<ChooseQuestionBestAnswerResponse> {
    const question = await this.repository.findById(questionId);

    if (!question) return left(new ResourceNotFoundError());

    if (question.authorId.toString() !== questionAuthorId)
      return left(new NotAllowedError());

    question.bestAnswerId = new UniqueEntityId(bestAnswerId);

    await this.repository.save(question);

    return right(question);
  }
}
