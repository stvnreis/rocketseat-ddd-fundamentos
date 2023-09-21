import { makeQuestion } from '@/../test/factories/make-question';
import { InMemoryQuestionRepository } from '@/../test/repositories/in-memory-question.repository';
import { Slug } from '../../enterprise/entities/value-objects/slug';

import { GetQuestionBySlug } from './get-question-by-slug';

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: GetQuestionBySlug;

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    sut = new GetQuestionBySlug(inMemoryQuestionRepository);
  });

  it('Should be able to get a question', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.createFromText('Example Question'),
    });
    await inMemoryQuestionRepository.create(newQuestion);

    const result = await sut.execute({
      slug: 'example-question',
    });

    expect(result.isRight()).toBe(true);
    expect(result.value).toMatchObject({ ...newQuestion });
  });
});
