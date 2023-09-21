import { QuestionComment } from '../../enterprise/entities/question-comment';
import { UniqueEntityId } from '../../enterprise/entities/value-objects/unique-entity-id';
import { QuestionCommentRepository } from '../repositories/question-comment.repository';
import { QuestionRepository } from '../repositories/question.repository';

interface CommentOnQuestionRequest {
  questionId: string;
  authorId: string;
  content: string;
}

interface CommentOnQuestionResponse {
  questionComment: QuestionComment;
}

export class CommentOnQuestion {
  constructor(
    private questionRepository: QuestionRepository,
    private questionCommentRepository: QuestionCommentRepository,
  ) {}

  async execute({
    questionId,
    authorId,
    content,
  }: CommentOnQuestionRequest): Promise<CommentOnQuestionResponse> {
    const question =
      await this.questionRepository.findById(questionId);

    if (!question) throw new Error('Question not found');

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntityId(authorId),
      questionId: new UniqueEntityId(questionId),
      content,
    });

    await this.questionCommentRepository.create(questionComment);

    return { questionComment };
  }
}
