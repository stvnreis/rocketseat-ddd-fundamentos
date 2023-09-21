import { Either, left, right } from '@/core/either';
import { AnswerRepository } from '../repositories/answer.repository';
import { NotAllowedError } from './errors/not-allowed.error';
import { ResourceNotFoundError } from './errors/resource-not-found.error';

interface DeleteAnswerRequest {
  id: string;
  authorId: string;
}

type DeleteAnswerResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>;

export class DeleteAnswer {
  constructor(private readonly repository: AnswerRepository) {}

  async execute({
    id,
    authorId,
  }: DeleteAnswerRequest): Promise<DeleteAnswerResponse> {
    const answer = await this.repository.findById(id);

    if (!answer) return left(new ResourceNotFoundError());

    if (authorId !== answer.authorId.toString())
      return left(new NotAllowedError());

    await this.repository.delete(answer);

    return right({});
  }
}
