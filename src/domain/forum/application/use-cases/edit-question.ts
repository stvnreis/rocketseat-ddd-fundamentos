import { Question } from '../../enterprise/entities/question';
import { QuestionRepository } from '../repositories/question.repository';

interface EditQuestionRequest {
  authorId: string;
  questionId: string;
  title: string;
  content: string;
}

interface EditQuestionResponse {
  question: Question;
}

export class EditQuestion {
  constructor(private readonly repository: QuestionRepository) {}

  async execute({
    authorId,
    questionId,
    title,
    content,
  }: EditQuestionRequest): Promise<EditQuestionResponse> {
    const question = await this.repository.findById(questionId);
    if (!question) throw new Error('Question not found.');

    if (authorId !== question.authorId.toString())
      throw new Error('Not authorized');

    question.title = title;
    question.content = content;

    await this.repository.save(question);

    return { question };
  }
}
