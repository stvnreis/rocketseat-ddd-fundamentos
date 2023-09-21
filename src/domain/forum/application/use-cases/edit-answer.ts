import { Answer } from '../../enterprise/entities/answer.entity';
import { AnswerRepository } from '../repositories/answer.repository';

interface EditAnswerRequest {
  authorId: string;
  answerId: string;
  content: string;
}

interface EditAnswerResponse {
  answer: Answer;
}

export class EditAnswer {
  constructor(private readonly repository: AnswerRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerRequest): Promise<EditAnswerResponse> {
    const answer = await this.repository.findById(answerId);
    if (!answer) throw new Error('Answer not found');

    if (authorId !== answer.authorId.toString())
      throw new Error('Not authorized');

    answer.content = content;
    await this.repository.save(answer);

    return { answer };
  }
}
