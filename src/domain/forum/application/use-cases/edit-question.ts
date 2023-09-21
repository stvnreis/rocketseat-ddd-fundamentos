import { Either, left, right } from '../../../../core/either';
import { Question } from '../../enterprise/entities/question';
import { QuestionRepository } from '../repositories/question.repository';
import { NotAllowedError } from './errors/not-allowed.error';
import { ResourceNotFoundError } from './errors/resource-not-found.error';

interface EditQuestionRequest {
  authorId: string;
  questionId: string;
  title: string;
  content: string;
}

type EditQuestionResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  Question
>;

export class EditQuestion {
  constructor(private readonly repository: QuestionRepository) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
  }: EditQuestionRequest): Promise<EditQuestionResponse> {
    const question = await this.repository.findById(questionId);
    if (!question) return left(new ResourceNotFoundError());

    if (authorId !== question.authorId.toString())
      return left(new NotAllowedError());

    question.title = title;
    question.content = content;

    await this.repository.save(question);

    return right(question);
  }
}
