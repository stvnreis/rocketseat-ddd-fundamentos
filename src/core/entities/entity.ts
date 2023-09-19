import { UniqueEntityId } from '@/domain/forum/enterprise/entities/value-objects/unique-entity-id';

export class Entity<Props> {
  private _id: UniqueEntityId;
  protected props: Props;
  constructor(props: Props, id?: UniqueEntityId) {
    this.props = props;
    this._id = id ?? new UniqueEntityId();
  }

  get id(): UniqueEntityId {
    return this._id;
  }
}
