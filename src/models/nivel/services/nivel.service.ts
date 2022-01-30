import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/core';
import { FindAllParams } from 'src/core/base-service';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { Nivel } from '../entities/nivel.entity';

@Injectable()
export class NivelService extends BaseService<Nivel> {
  @InjectRepository(Nivel)
  readonly repository: Repository<Nivel>;
  readonly Entity = Nivel;

  findAll(params?: FindAllParams): Promise<Nivel[]> {
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

    if (query) {
      options.where = {
        nivel: Like(`%${query}%`),
      };
    }

    return this.repository.find(options);
  }

  async softRemoveCuston(id: number | number[]): Promise<any> {
    const nivel = await this.repository.findOne(+id, {
      relations: ['desenvolvedores'],
    });
    if (!nivel)
      return {
        error: `Nível with id ${id} not foud`,
      };
    if (
      !nivel.desenvolvedores ||
      !Array.isArray(nivel.desenvolvedores) ||
      nivel.desenvolvedores.length !== 0
    )
      return {
        error:
          'this level cannot be disabled because it has developers associated with it',
      };
    return this.repository.softDelete(+id);
  }

  findOne(id: number, params?): Promise<Nivel> {
    return this.repository.findOne(id, { relations: ['desenvolvedores'] });
  }
}
