import { QuestionCommentRepository } from '../repositories/question-comment.repository';

interface DeleteQuestionCommentRequest {
  questionCommentId: string;
  authorId: string;
}

interface DeleteQuestionCommentResponse {}

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

    if (!questionComment)
      throw new Error('Question comment not found');

    if (questionComment.authorId.toString() !== authorId)
      throw new Error('Not authorized');

    await this.quesitonCommentRepository.delete(questionComment);

    return {};
  }
}
