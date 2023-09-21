import { makeQuestion } from '@/../test/factories/make-question';
import { InMemoryQuestionRepository } from '@/../test/repositories/in-memory-question.repository';
import { FetchRecentQuestions } from './fetch-recent-questions';

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: FetchRecentQuestions;

describe('Fetch Recent Questions', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    sut = new FetchRecentQuestions(inMemoryQuestionRepository);
  });

  it('should be able to fetch recent questions', async () => {
    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2023, 0, 20) }),
    );

    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2023, 1, 20) }),
    );

    await inMemoryQuestionRepository.create(
      makeQuestion({ createdAt: new Date(2023, 2, 20) }),
    );

    const result = await sut.execute({ page: 1 });

    expect(result.value).toEqual([
      expect.objectContaining({ createdAt: new Date(2023, 2, 20) }),
      expect.objectContaining({ createdAt: new Date(2023, 1, 20) }),
      expect.objectContaining({ createdAt: new Date(2023, 0, 20) }),
    ]);
  });

  it('should be able to fetch paginated recent questions', async () => {
    for (let i = 0; i < 22; i++) {
      await inMemoryQuestionRepository.create(makeQuestion());
    }

    const result = await sut.execute({ page: 2 });

    expect(result.value).toHaveLength(2);
  });
});
