import { Question } from '../../enterprise/entities/question';
import { UniqueEntityId } from '../../enterprise/entities/value-objects/unique-entity-id';
import { QuestionRepository } from '../repositories/question.repository';

interface ChooseQuestionBestAnswerRequest {
  questionId: string;
  bestAnswerId: string;
  questionAuthorId: string;
}

interface ChooseQuestionBestAnswerResponse {
  question: Question;
}

export class ChooseQuestionBestAnswer {
  constructor(private readonly repository: QuestionRepository) {}

  async execute({
    questionId,
    bestAnswerId,
    questionAuthorId, // eslint-disable-next-line max-len
  }: ChooseQuestionBestAnswerRequest): Promise<ChooseQuestionBestAnswerResponse> {
    const question = await this.repository.findById(questionId);

    if (!question) throw new Error('Question not found');

    if (question.authorId.toString() !== questionAuthorId)
      throw new Error('Not authorized');

    question.bestAnswerId = new UniqueEntityId(bestAnswerId);

    await this.repository.save(question);

    return { question };
  }
}
