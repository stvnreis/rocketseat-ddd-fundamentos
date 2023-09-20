import { makeAnswer } from '@/../test/factories/make-answer';
import { InMemoryAnswerRepository } from '@/../test/repositories/in-memory-answer.repository';
import { UniqueEntityId } from '../../enterprise/entities/value-objects/unique-entity-id';
import { DeleteAnswer } from './delete-answer';

let inMemoryAnswerRepository: InMemoryAnswerRepository;
let sut: DeleteAnswer;

describe('Delete Answer By ID', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository();
    sut = new DeleteAnswer(inMemoryAnswerRepository);
  });

  it('Should be able to delete a answer', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('answer-1'),
    );
    await inMemoryAnswerRepository.create(newAnswer);

    await sut.execute({ id: 'answer-1', authorId: 'author-1' });

    expect(inMemoryAnswerRepository.items).toHaveLength(0);
  });

  it('should not be able to delete a answer from another user', async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('answer-1'),
    );
    await inMemoryAnswerRepository.create(newAnswer);

    expect(async () => {
      return await sut.execute({
        id: 'answer-1',
        authorId: 'author-2',
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
