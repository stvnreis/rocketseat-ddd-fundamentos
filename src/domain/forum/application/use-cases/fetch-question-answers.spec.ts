import { makeAnswer } from '@/../test/factories/make-answer';
import { InMemoryAnswerRepository } from '@/../test/repositories/in-memory-answer.repository';
import { FetchQuestionAnswers } from './fetch-question-answers';
import { UniqueEntityId } from '../../enterprise/entities/value-objects/unique-entity-id';

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let sut: FetchQuestionAnswers;

describe('Fetch Question Answers', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository();
    sut = new FetchQuestionAnswers(inMemoryAnswerRepository);
  });

  it('should be able to fetch question answers', async () => {
    const questionId = new UniqueEntityId('question-1');

    await inMemoryAnswerRepository.create(makeAnswer({ questionId }));
    await inMemoryAnswerRepository.create(makeAnswer({ questionId }));
    await inMemoryAnswerRepository.create(makeAnswer({ questionId }));

    const { answers } = await sut.execute({
      questionId: questionId.toString(),
      page: 1,
    });

    expect(answers).toHaveLength(3);
  });

  it('should be able to fetch paginated question answers', async () => {
    const questionId = new UniqueEntityId('question-1');
    for (let i = 0; i < 22; i++) {
      await inMemoryAnswerRepository.create(
        makeAnswer({ questionId }),
      );
    }

    const { answers } = await sut.execute({
      questionId: questionId.toString(),
      page: 2,
    });

    expect(answers).toHaveLength(2);
  });
});
