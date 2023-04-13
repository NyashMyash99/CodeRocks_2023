import { ClassConstructor } from 'class-transformer';

export async function castToEntity<T>(
  target: Promise<any> | any,
  Entity: ClassConstructor<T>,
): Promise<T> {
  return new Entity(await target);
}
