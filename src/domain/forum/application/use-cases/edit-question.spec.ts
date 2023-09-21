import { makeQuestion } from '@/../test/factories/make-question';
import { InMemoryQuestionRepository } from '@/../test/repositories/in-memory-question.repository';
import { UniqueEntityId } from '../../enterprise/entities/value-objects/unique-entity-id';
import { EditQuestion } from './edit-question';
import { ResourceNotFoundError } from './errors/resource-not-found.error';
import { NotAllowedError } from './errors/not-allowed.error';

let inMemoryQuestionRepository: InMemoryQuestionRepository;
let sut: EditQuestion;

describe('Edit Question', () => {
  beforeEach(() => {
    inMemoryQuestionRepository = new InMemoryQuestionRepository();
    sut = new EditQuestion(inMemoryQuestionRepository);
  });

  it('should be able to edit a question', async () => {
    const question = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    );

    await inMemoryQuestionRepository.create(question);

    await sut.execute({
      authorId: 'author-1',
      questionId: 'question-1',
      title: 'teste',
      content: 'conteudo teste',
    });

    expect(inMemoryQuestionRepository.items[0]).toMatchObject({
      title: 'teste',
      content: 'conteudo teste',
    });
  });

  it('should not be able to edit someone elses question', async () => {
    const question = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    );

    await inMemoryQuestionRepository.create(question);

    const result = await sut.execute({
      authorId: 'author-2',
      questionId: 'question-1',
      title: 'teste',
      content: 'conteudo teste',
    });

    expect(result.value).toBeInstanceOf(NotAllowedError);
  });

  it('should not be able to edit a question that does not exist', async () => {
    const question = makeQuestion(
      { authorId: new UniqueEntityId('author-1') },
      new UniqueEntityId('question-1'),
    );

    await inMemoryQuestionRepository.create(question);

    const result = await sut.execute({
      authorId: 'author-1',
      questionId: 'question-2',
      title: 'teste',
      content: 'conteudo teste',
    });

    expect(result.value).toBeInstanceOf(ResourceNotFoundError);
  });
});
