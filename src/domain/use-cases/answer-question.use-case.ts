import { Answer } from '../entities/answer.entity';

interface AnswerQuestionUseCaseRequest {
  instructorId: string;
  questionId: string;
  content: string;
}

export class AnswerQuestionUseCase {
  execute({
    instructorId,
    questionId,
    content,
  }: AnswerQuestionUseCaseRequest): Answer {
    const answer = new Answer({ content, questionId, authorId: instructorId });

    return answer;
  }
}
