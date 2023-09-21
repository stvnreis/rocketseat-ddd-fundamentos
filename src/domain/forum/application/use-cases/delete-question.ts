import { Either, left, right } from '@/core/either';
import { QuestionRepository } from '../repositories/question.repository';
import { NotAllowedError } from './errors/not-allowed.error';
import { ResourceNotFoundError } from './errors/resource-not-found.error';

interface DeleteQuestionRequest {
  id: string;
  authorId: string;
}

type DeleteQuestionResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>;

export class DeleteQuestion {
  constructor(private readonly repository: QuestionRepository) {}

  async execute({
    id,
    authorId,
  }: DeleteQuestionRequest): Promise<DeleteQuestionResponse> {
    const question = await this.repository.findById(id);

    if (!question) return left(new ResourceNotFoundError());

    if (authorId !== question.authorId.toString())
      return left(new NotAllowedError());

    await this.repository.delete(question);

    return right({});
  }
}
