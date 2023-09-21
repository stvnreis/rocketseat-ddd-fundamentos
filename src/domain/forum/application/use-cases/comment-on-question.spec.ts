import { InMemoryQuestionCommentRepository } from '@/../test/repositories/in-memory-question-comment.repository';
import { CommentOnQuestion } from './comment-on-question';
import { InMemoryQuestionRepository } from '@/../test/repositories/in-memory-question.repository';
import { makeQuestion } from '@/../test/factories/make-question';
import { UniqueEntityId } from '../../enterprise/entities/value-objects/unique-entity-id';
import { ResourceNotFoundError } from './errors/resource-not-found.error';

let inMemoryQuestionRepository: InMemoryQuestionRepository;
// eslint-disable-next-line max-len
let inMemoryQuestionCommentRepository: InMemoryQuestionCommentRepository;
let sut: CommentOnQuestion;

describe('Comment on Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();

    inMemoryQuestionCommentRepository =
      new InMemoryQuestionCommentRepository();

    sut = new CommentOnQuestion(
      inMemoryQuestionRepository,
      inMemoryQuestionCommentRepository,
    );
  });

  it('should be able to comment on question', async () => {
    const question = makeQuestion(
      {},
      new UniqueEntityId('question-1'),
    );

    await inMemoryQuestionRepository.create(question);

    const result = await sut.execute({
      questionId: question.id.toString(),
      authorId: 'author-1',
      content: 'teste conteudo',
    });

    expect(result.isRight()).toBe(true);
    expect(
      inMemoryQuestionCommentRepository.items[0].content,
    ).toEqual('teste conteudo');
  });

  it('should not be able to comment on a question that does not exist', async () => {
    const result = await sut.execute({
      questionId: 'teste',
      authorId: 'author-1',
      content: 'teste conteudo',
    });

    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
