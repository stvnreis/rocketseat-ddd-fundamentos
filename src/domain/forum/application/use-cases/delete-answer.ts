import { AnswerRepository } from '../repositories/answer.repository';

interface DeleteAnswerRequest {
  id: string;
  authorId: string;
}

interface DeleteAnswerResponse {}

export class DeleteAnswer {
  constructor(private readonly repository: AnswerRepository) {}

  async execute({
    id,
    authorId,
  }: DeleteAnswerRequest): Promise<DeleteAnswerResponse> {
    const answer = await this.repository.findById(id);

    if (!answer) throw new Error('Answer not found');

    if (authorId !== answer.authorId.toString())
      throw new Error('Not Allowed.');

    await this.repository.delete(answer);

    return {};
  }
}
