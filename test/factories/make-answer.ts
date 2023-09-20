import {
  Answer,
  AnswerProps,
} from '@/domain/forum/enterprise/entities/answer.entity';
import { UniqueEntityId } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id';
import { faker } from '@faker-js/faker';

export function makeAnswer(
  override: Partial<AnswerProps> = {},
  id?: UniqueEntityId,
) {
  const answer = Answer.create(
    {
      authorId: new UniqueEntityId('1'),
      content: faker.lorem.text(),
      questionId: new UniqueEntityId(),
      ...override,
    },
    id,
  );

  return answer;
}
