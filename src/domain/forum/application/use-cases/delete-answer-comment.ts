import { Either, left, right } from '@/core/either';
import { AnswerCommentRepository } from '../repositories/answer-comment.repository';
import { ResourceNotFoundError } from './errors/resource-not-found.error';
import { NotAllowedError } from './errors/not-allowed.error';

interface DeleteAnswerCommentRequest {
  answerCommentId: string;
  authorId: string;
}

type DeleteAnswerCommentResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>;

export class DeleteAnswerComment {
  constructor(
    private quesitonCommentRepository: AnswerCommentRepository,
  ) {}

  async execute({
    authorId,
    answerCommentId, // eslint-disable-next-line max-len
  }: DeleteAnswerCommentRequest): Promise<DeleteAnswerCommentResponse> {
    const answerComment =
      await this.quesitonCommentRepository.findById(answerCommentId);

    if (!answerComment) return left(new ResourceNotFoundError());

    if (answerComment.authorId.toString() !== authorId)
      return left(new NotAllowedError());

    await this.quesitonCommentRepository.delete(answerComment);

    return right({});
  }
}
