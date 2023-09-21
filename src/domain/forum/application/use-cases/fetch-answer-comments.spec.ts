import { InMemoryAnswerCommentRepository } from '@/../test/repositories/in-memory-answer-comment.repository';
import { FetchAnswerComments } from './fetch-answer-comments';
import { makeAnswerComment } from '@/../test/factories/make-answer-comment';
import { UniqueEntityId } from '../../enterprise/entities/value-objects/unique-entity-id';

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository;
let sut: FetchAnswerComments;

describe('Fetch Answer Comments', () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository =
      new InMemoryAnswerCommentRepository();

    sut = new FetchAnswerComments(inMemoryAnswerCommentRepository);
  });

  it('should be able to fetch answer comments', async () => {
    for (let i = 0; i < 3; i++) {
      await inMemoryAnswerCommentRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityId('answer-1'),
        }),
      );
    }

    const { answerComments } = await sut.execute({
      answerId: 'answer-1',
      page: 1,
    });

    expect(answerComments).toHaveLength(3);
  });

  it('should be able to fetch paginated answer comments', async () => {
    for (let i = 0; i < 22; i++) {
      await inMemoryAnswerCommentRepository.create(
        makeAnswerComment({
          answerId: new UniqueEntityId('answer-1'),
        }),
      );
    }

    const { answerComments } = await sut.execute({
      answerId: 'answer-1',
      page: 2,
    });

    expect(answerComments).toHaveLength(2);
  });
});
