import { Either, left, right } from '@/core/either';
import { QuestionCommentRepository } from '../repositories/question-comment.repository';
import { NotAllowedError } from './errors/not-allowed.error';
import { ResourceNotFoundError } from './errors/resource-not-found.error';

interface DeleteQuestionCommentRequest {
  questionCommentId: string;
  authorId: string;
}

type DeleteQuestionCommentResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>;

export class DeleteQuestionComment {
  constructor(
    private quesitonCommentRepository: QuestionCommentRepository,
  ) {}

  async execute({
    authorId,
    questionCommentId, // eslint-disable-next-line max-len
  }: DeleteQuestionCommentRequest): Promise<DeleteQuestionCommentResponse> {
    const questionComment =
      await this.quesitonCommentRepository.findById(
        questionCommentId,
      );

    if (!questionComment) return left(new ResourceNotFoundError());

    if (questionComment.authorId.toString() !== authorId)
      return left(new NotAllowedError());

    await this.quesitonCommentRepository.delete(questionComment);

    return right({});
  }
}
