import { Nivel } from 'src/models/nivel/entities/nivel.entity';
import { FindManyOptions, ObjectLiteral, Repository } from 'typeorm';

export abstract class BaseService<T> {
  abstract readonly repository: Repository<T>;

  findAll(params?: FindAllParams): Promise<T[]> {
    const {
      showDeleted,
      relations,
      pageSize,
      offset,
      pageNumber,
      sortField,
      sortOrder,
      query,
    } = params;

    delete params?.showDeleted;
    delete params?.query;
    delete params?.relations;
    delete params?.pageSize;
    delete params?.pageNumber;
    delete params?.offset;
    delete params?.sortField;
    delete params?.sortOrder;
    delete params?.select;

    const options: FindManyOptions = {
      where: params,
    };

    if (showDeleted) {
      options.withDeleted = showDeleted;
    }

    if (relations) {
      options.relations = JSON.parse(relations);
    }

    if (pageSize && offset >= 0) {
      options.take = +pageSize;
      options.skip = +offset;
    }

    if (pageSize && pageNumber) {
      options.take = +pageSize;
      options.skip = (+pageNumber - 1) * +pageSize;
    }

    if (sortField && sortOrder) {
      options.order = {
        [sortField]: sortOrder,
      };
    } else {
      options.order = {
        id: 'DESC',
      };
    }

    return this.repository.find(options);
  }

  count(params?: FindAllParams): Promise<number> {
    const { showDeleted } = params;

    delete params?.showDeleted;
    delete params?.query;
    delete params?.relations;
    delete params?.pageSize;
    delete params?.pageNumber;
    delete params?.offset;
    delete params?.sortField;
    delete params?.sortOrder;
    delete params?.select;

    const options: FindManyOptions = {
      where: params,
    };

    if (showDeleted) {
      options.withDeleted = showDeleted;
    }

    return this.repository.count(options);
  }

  findOne(id: number, params?): Promise<T> {
    return this.repository.findOne(id, params);
  }

  async create(dto: T): Promise<any> {
    try {
      const newDto = await this.save(dto);
      return newDto;
    } catch (err) {
      return { error: err.sqlMessage };
    }
  }

  save(dto: T) {
    return this.repository.save(dto);
  }

  async update(id: number, dto): Promise<any> {
    if (this.validateIds(id, dto).error) return this.validateIds(id, dto);
    dto.atualizadoEm = new Date();

    try {
      const newDto = await this.save(dto);
      return newDto;
    } catch (err) {
      return { error: err.sqlMessage };
    }
  }

  remove(dto: T): Promise<T> {
    return this.repository.remove(dto);
  }

  softRemove(id: number | number[]): Promise<any> {
    if (Array.isArray(id)) {
      const ids = id.map((item) => +item);
      return this.repository.softDelete(ids);
    } else {
      return this.repository.softDelete(+id);
    }
  }

  restore(id: number) {
    return this.update(id, { id: +id, desativadoEm: null });
  }

  validateIds(id?: number, dto?) {
    /*
      - Necessario um id numerico como parâmetro e no objeto dto para garantir que estamos realmente editando o item correto
    */

    if (!id || !dto?.id)
      return { error: 'The ID in request url and request body are requerid' };

    if (Number(id) !== Number(dto?.id))
      return { error: 'The ID in request url and request body are different' };

    if (isNaN(Number(id)) || isNaN(Number(dto?.id)))
      return {
        error: 'The ID in request url or request body is not a number',
      };

    return { valid: true };
  }
}

export interface FindAllParams {
  query?: ObjectLiteral;
  relations?: string;
  select?: string;
  showDeleted?: boolean;
  pageNumber?: number;
  pageSize?: number;
  offset?: number;
  sortField?: string;
  sortOrder?: 'ASC' | 'DESC';
}
