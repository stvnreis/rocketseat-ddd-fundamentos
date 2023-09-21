import { Either, left, right } from '@/core/either';
import { Answer } from '../../enterprise/entities/answer';
import { AnswerRepository } from '../repositories/answer.repository';
import { NotAllowedError } from './errors/not-allowed.error';
import { ResourceNotFoundError } from './errors/resource-not-found.error';

interface EditAnswerRequest {
  authorId: string;
  answerId: string;
  content: string;
}

type EditAnswerResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  Answer
>;

export class EditAnswer {
  constructor(private readonly repository: AnswerRepository) {}

  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerRequest): Promise<EditAnswerResponse> {
    const answer = await this.repository.findById(answerId);
    if (!answer) return left(new ResourceNotFoundError());

    if (authorId !== answer.authorId.toString())
      return left(new NotAllowedError());

    answer.content = content;
    await this.repository.save(answer);

    return right(answer);
  }
}
