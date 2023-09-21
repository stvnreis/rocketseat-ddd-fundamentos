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
    const result = await sut.execute({
      authorId: '1',
      title: 'new question',
      content: 'new questions content',
    });

    if (result.isRight()) {
      expect(result.isRight()).toBe(true);
      expect(inMemoryQuestionRepository.items[0].id).toEqual(
        result.value.id,
      );
    }
  });
});
