import { InMemoryAnswerCommentRepository } from '@/../test/repositories/in-memory-answer-comment.repository';
import { DeleteAnswerComment } from './delete-answer-comment';
import { makeAnswerComment } from '@/../test/factories/make-answer-comment';
import { UniqueEntityId } from '../../enterprise/entities/value-objects/unique-entity-id';
import { NotAllowedError } from './errors/not-allowed.error';

let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository;
let sut: DeleteAnswerComment;

describe('Delete Answer Comment', () => {
  beforeEach(() => {
    inMemoryAnswerCommentRepository =
      new InMemoryAnswerCommentRepository();

    sut = new DeleteAnswerComment(inMemoryAnswerCommentRepository);
  });

  it('should be able to delete a answer comment', async () => {
    const answerComment = makeAnswerComment(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-comment-1'),
    );

    await inMemoryAnswerCommentRepository.create(answerComment);
    await sut.execute({
      authorId: 'author-1',
      answerCommentId: answerComment.id.toString(),
    });

    expect(inMemoryAnswerCommentRepository.items).toHaveLength(0);
  });

  it('should not be able to delete another user answer comment', async () => {
    const answerComment = makeAnswerComment(
      {
        authorId: new UniqueEntityId('author-1'),
      },
      new UniqueEntityId('answer-comment-1'),
    );

    await inMemoryAnswerCommentRepository.create(answerComment);

    const result = await sut.execute({
      authorId: 'author-2',
      answerCommentId: answerComment.id.toString(),
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
