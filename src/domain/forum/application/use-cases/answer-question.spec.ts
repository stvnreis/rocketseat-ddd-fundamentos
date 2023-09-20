import { AnswerQuestion } from './answer-question';
import { AnswerRepository } from '../repositories/answer.repository';
import { InMemoryAnswerRepository } from '@/../test/repositories/in-memory-answer.repository';

let fakeAnswerRepository: AnswerRepository;
let answerQuestion: AnswerQuestion;

describe('Create An Answer', () => {
  beforeEach(() => {
    fakeAnswerRepository = new InMemoryAnswerRepository();
    answerQuestion = new AnswerQuestion(fakeAnswerRepository);
  });

  it('should be able to create an answer', async () => {
    const content = 'nova resposta';

    const answer = await answerQuestion.execute({
      questionId: '1',
      instructorId: '1',
      content,
    });

    expect(answer.content).toEqual(content);
    expect(answer.id).toBeTruthy();
  });
});
