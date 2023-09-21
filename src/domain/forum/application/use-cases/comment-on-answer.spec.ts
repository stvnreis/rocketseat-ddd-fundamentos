import { InMemoryAnswerCommentRepository } from '@/../test/repositories/in-memory-answer-comment.repository';
import { CommentOnAnswer } from './comment-on-answer';
import { InMemoryAnswerRepository } from '@/../test/repositories/in-memory-answer.repository';
import { makeAnswer } from '@/../test/factories/make-answer';
import { UniqueEntityId } from '../../enterprise/entities/value-objects/unique-entity-id';

let inMemoryAnswerRepository: InMemoryAnswerRepository;
// eslint-disable-next-line max-len
let inMemoryAnswerCommentRepository: InMemoryAnswerCommentRepository;
let sut: CommentOnAnswer;

describe('Comment on Answer', () => {
  beforeEach(() => {
    inMemoryAnswerRepository = new InMemoryAnswerRepository();

    inMemoryAnswerCommentRepository =
      new InMemoryAnswerCommentRepository();

    sut = new CommentOnAnswer(
      inMemoryAnswerRepository,
      inMemoryAnswerCommentRepository,
    );
  });

  it('should be able to comment on answer', async () => {
    const answer = makeAnswer({}, new UniqueEntityId('answer-1'));

    await inMemoryAnswerRepository.create(answer);

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: 'author-1',
      content: 'teste conteudo',
    });

    expect(inMemoryAnswerCommentRepository.items[0].content).toEqual(
      'teste conteudo',
    );
  });

  it('should not be able to comment on a answer that does not exist', async () => {
    expect(async () => {
      return await sut.execute({
        answerId: 'teste',
        authorId: 'author-1',
        content: 'teste conteudo',
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
