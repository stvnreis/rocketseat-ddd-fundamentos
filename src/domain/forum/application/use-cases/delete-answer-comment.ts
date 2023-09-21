import { AnswerCommentRepository } from '../repositories/answer-comment.repository';

interface DeleteAnswerCommentRequest {
  answerCommentId: string;
  authorId: string;
}

interface DeleteAnswerCommentResponse {}

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

    if (!answerComment) throw new Error('Question comment not found');

    if (answerComment.authorId.toString() !== authorId)
      throw new Error('Not authorized');

    await this.quesitonCommentRepository.delete(answerComment);

    return {};
  }
}
