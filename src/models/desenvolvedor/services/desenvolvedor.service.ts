import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/core';
import { FindAllParams } from 'src/core/base-service';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { Desenvolvedor } from '../entities/desenvolvedor.entity';

@Injectable()
export class DesenvolvedorService extends BaseService<Desenvolvedor> {
  @InjectRepository(Desenvolvedor)
  readonly repository: Repository<Desenvolvedor>;
  readonly Entity = Desenvolvedor;

  findAll(params?: FindAllParams): Promise<Desenvolvedor[]> {
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
        nome: Like(`%${query}%`),
      };
    }

    return this.repository.find(options);
  }

  count(params?: FindAllParams): Promise<number> {
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
        nome: Like(`%${query}%`),
      };
    }

    return this.repository.count(options);
  }
}
