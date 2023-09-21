import { InMemoryQuestionRepository } from '@/../test/repositories/in-memory-question.repository';
import { CreateQuestion } from './create-question';

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: CreateQuestion;

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    sut = new CreateQuestion(inMemoryQuestionRepository);
  });

  it('should be able to create a question', async () => {
    const { question } = await sut.execute({
      authorId: '1',
      title: 'new question',
      content: 'new questions content',
    });

    expect(question.id).toBeTruthy();
    expect(inMemoryQuestionRepository.items[0].id).toEqual(
      question.id,
    );
  });
});
