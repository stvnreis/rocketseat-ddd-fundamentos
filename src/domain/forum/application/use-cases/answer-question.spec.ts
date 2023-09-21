import { AnswerQuestion } from './answer-question';
import { InMemoryAnswerRepository } from '@/../test/repositories/in-memory-answer.repository';

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let sut: AnswerQuestion;

describe('Create An Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository();
    sut = new AnswerQuestion(inMemoryAnswerRepository);
  });

  it('should be able to create an answer', async () => {
    const content = 'nova resposta';

    const result = await sut.execute({
      questionId: '1',
      instructorId: '1',
      content,
    });

    expect(result.isRight()).toBe(true);
    expect(() => {
      if (result.isRight()) return result.value.id;
    }).toBeTruthy();
  });
});
