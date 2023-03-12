import {
  DeepPartial,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
} from "typeorm";
import { dataSource } from "../database";
import { UserEntity } from "../entities/user.entity";

const repository = dataSource.getRepository(UserEntity);

const find = (options: FindManyOptions<UserEntity>) => repository.find(options);

const findOne = (options: FindOneOptions<UserEntity>) =>
  repository.findOne(options);

const update = (
  where: FindOptionsWhere<UserEntity>,
  data: DeepPartial<UserEntity>
) => {
  return repository.update(where, data);
};

const create = (data: DeepPartial<UserEntity>) => {
  const entity = repository.create(data);
  return repository.save(entity);
};

const upsert = async (
  options: FindOneOptions<UserEntity>,
  data: DeepPartial<UserEntity>
): Promise<UserEntity> => {
  const user = await findOne(options);
  if (user) {
    return repository.save(repository.merge(user, data));
  }

  return repository.save(data);
};

export const userRepository = {
  find,
  findOne,
  upsert,
  create,
  update,
};
