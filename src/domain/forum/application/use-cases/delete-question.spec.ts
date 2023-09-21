import { makeQuestion } from '@/../test/factories/make-question';
import { InMemoryQuestionRepository } from '@/../test/repositories/in-memory-question.repository';
import { UniqueEntityId } from '../../enterprise/entities/value-objects/unique-entity-id';
import { DeleteQuestion } from './delete-question';
import { NotAllowedError } from './errors/not-allowed.error';

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: DeleteQuestion;

describe('Delete Question By ID', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    sut = new DeleteQuestion(inMemoryQuestionRepository);
  });

  it('Should be able to delete a question', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    );
    await inMemoryQuestionRepository.create(newQuestion);

    const result = await sut.execute({
      id: 'question-1',
      authorId: 'author-1',
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryQuestionRepository.items).toHaveLength(0);
  });

  it('should not be able to delete a question from another user', async () => {
    const newQuestion = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    );
    await inMemoryQuestionRepository.create(newQuestion);
    const result = await sut.execute({
      id: 'question-1',
      authorId: 'author-2',
    });
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
