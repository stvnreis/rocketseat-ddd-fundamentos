import { InMemoryQuestionCommentRepository } from '@/../test/repositories/in-memory-question-comment.repository';
import { FetchQuestionComments } from './fetch-question-comments';
import { makeQuestionComment } from '@/../test/factories/make-question-comment';
import { UniqueEntityId } from '../../enterprise/entities/value-objects/unique-entity-id';

// eslint-disable-next-line max-len
let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository;
let sut: FetchQuestionComments;

describe('Fetch Question Comments', () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepository =
      new InMemoryQuestionCommentRepository();

    sut = new FetchQuestionComments(
      inMemoryQuestionCommentRepository,
    );
  });

  it('should be able to fetch question comments', async () => {
    for (let i = 0; i < 3; i++) {
      await inMemoryQuestionCommentRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityId('question-1'),
        }),
      );
    }

    const { questionComments } = await sut.execute({
      questionId: 'question-1',
      page: 1,
    });

    expect(questionComments).toHaveLength(3);
  });

  it('should be able to fetch paginated question comments', async () => {
    for (let i = 0; i < 22; i++) {
      await inMemoryQuestionCommentRepository.create(
        makeQuestionComment({
          questionId: new UniqueEntityId('question-1'),
        }),
      );
    }

    const { questionComments } = await sut.execute({
      questionId: 'question-1',
      page: 2,
    });

    expect(questionComments).toHaveLength(2);
  });
});
