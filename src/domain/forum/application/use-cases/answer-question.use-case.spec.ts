import { AnswerQuestionUseCase } from './answer-question.use-case';
import { AnswerRepository } from '../repositories/answer.repository';

test('it should create an answer', async () => {
  const fakeAnswerRepository: AnswerRepository = {
    async create() {
      return;
    },
  };
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswerRepository);

  const content = 'nova resposta';

  const answer = await answerQuestion.execute({
    questionId: '1',
    instructorId: '1',
    content,
  });

  expect(answer.content).toEqual(content);
  expect(answer.id).toBeDefined();
});
