import { expect, test } from 'vitest';
import { AnswerQuestionUseCase } from './answer-question.use-case';

test('create an answer', () => {
  const answerQuestion = new AnswerQuestionUseCase();

  const content = 'nova resposta';

  const answer = answerQuestion.execute({
    questionId: '1',
    instructorId: '1',
    content,
  });

  expect(answer.content).toBe(content);
  expect(answer.id).toBeDefined();
});
