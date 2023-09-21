import { QuestionComment } from '../../enterprise/entities/question-comment';
import { QuestionCommentRepository } from '../repositories/question-comment.repository';

interface FetchQuestionCommentsRequest {
  questionId: string;
  page: number;
}

interface FetchQuestionCommentsResponse {
  questionComments: QuestionComment[];
}

export class FetchQuestionComments {
  constructor(
    private questionCommentRepository: QuestionCommentRepository,
  ) {}

  async execute({
    questionId,
    page, // eslint-disable-next-line max-len
  }: FetchQuestionCommentsRequest): Promise<FetchQuestionCommentsResponse> {
    const questionComments =
      await this.questionCommentRepository.findManyByQuestionId(
        questionId,
        { page },
      );

    return { questionComments };
  }
}
