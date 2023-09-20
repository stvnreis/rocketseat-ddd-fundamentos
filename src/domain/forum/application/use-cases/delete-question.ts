import { QuestionRepository } from '../repositories/question.repository';

interface DeleteQuestionRequest {
  id: string;
  authorId: string;
}

interface DeleteQuestionResponse {}

export class DeleteQuestion {
  constructor(private readonly repository: QuestionRepository) {}

  async execute({
    id,
    authorId,
  }: DeleteQuestionRequest): Promise<DeleteQuestionResponse> {
    const question = await this.repository.findById(id);

    if (!question) throw new Error('Question not found');

    if (authorId !== question.authorId.toString())
      throw new Error('Not Allowed.');

    await this.repository.delete(question);

    return {};
  }
}
