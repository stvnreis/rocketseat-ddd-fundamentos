import { InMemoryQuestionCommentRepository } from '@/../test/repositories/in-memory-question-comment.repository';
import { DeleteQuestionComment } from './delete-question-comment';
import { makeQuestionComment } from '@/../test/factories/make-question-comment';
import { UniqueEntityId } from '../../enterprise/entities/value-objects/unique-entity-id';

// eslint-disable-next-line max-len
let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository;
let sut: DeleteQuestionComment;

describe('Delete Question Comment', () => {
  beforeEach(() => {
    inMemoryQuestionCommentRepository =
      new InMemoryQuestionCommentRepository();

    sut = new DeleteQuestionComment(
      inMemoryQuestionCommentRepository,
    );
  });

  it('should be able to delete a question comment', async () => {
    const questionComment = makeQuestionComment(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-comment-1'),
    );

    await inMemoryQuestionCommentRepository.create(questionComment);
    const result = await sut.execute({
      authorId: 'author-1',
      questionCommentId: questionComment.id.toString(),
    });

    expect(result.isRight()).toBe(true);
    expect(inMemoryQuestionCommentRepository.items).toHaveLength(0);
  });

  it('should not be able to delete another user question comment', async () => {
    const questionComment = makeQuestionComment(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('question-comment-1'),
    );

    await inMemoryQuestionCommentRepository.create(questionComment);
    const result = await sut.execute({
      authorId: 'author-2',
      questionCommentId: questionComment.id.toString(),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(Error);
  });
});
