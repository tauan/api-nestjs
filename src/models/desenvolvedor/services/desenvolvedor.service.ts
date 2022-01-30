import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from 'src/core';
import { FindAllParams } from 'src/core/base-service';
import { FindManyOptions, Repository } from 'typeorm';
import { Desenvolvedor } from '../entities/desenvolvedor.entity';

@Injectable()
export class DesenvolvedorService extends BaseService<Desenvolvedor> {
  @InjectRepository(Desenvolvedor)
  readonly repository: Repository<Desenvolvedor>;
  readonly Entity = Desenvolvedor;

  // async findAll(params?: FindAllParams): Promise<Desenvolvedor[]> {
  //   const {
  //     showDeleted,
  //     relations,
  //     pageSize,
  //     offset,
  //     pageNumber,
  //     sortField,
  //     sortOrder,
  //     query,
  //   } = params;

  //   const sql = this.repository.createQueryBuilder('d');

  //   if (query) {
  //     sql.where(
  //       'd.nome like :query or d.idade like :query or d.sexo like :query or d.data_nascimento like :query or d.hobby like :query',
  //       { query: `%${query}%` },
  //     );
  //   }

  //   sql.select([
  //     'd.id as id',
  //     'd.nivel_id as nivel_id',
  //     'd.nome as nome',
  //     'd.sexo as sexo',
  //     'd.data_nascimento as data_nascimento',
  //     'd.idade as idade',
  //     'd.hobby as hobby',
  //     'd.criado_em as criado_em',
  //     'd.atualizado_em as atualizado_em',
  //     'd.desativado_em as desativado_em',
  //   ]);
  //   sql.withDeleted();

  //   const response = await sql.execute();
  //   console.log(response);

  //   return;
  //   // delete params?.showDeleted;
  //   // delete params?.query;
  //   // delete params?.relations;
  //   // delete params?.pageSize;
  //   // delete params?.pageNumber;
  //   // delete params?.offset;
  //   // delete params?.sortField;
  //   // delete params?.sortOrder;
  //   // delete params?.select;

  //   // const options: FindManyOptions = {
  //   //   where: params,
  //   // };

  //   // if (showDeleted) {
  //   //   options.withDeleted = showDeleted;
  //   // }

  //   // if (relations) {
  //   //   options.relations = JSON.parse(relations);
  //   // }

  //   // if (pageSize && offset >= 0) {
  //   //   options.take = +pageSize;
  //   //   options.skip = +offset;
  //   // }

  //   // if (pageSize && pageNumber) {
  //   //   options.take = +pageSize;
  //   //   options.skip = (+pageNumber - 1) * +pageSize;
  //   // }

  //   // if (sortField && sortOrder) {
  //   //   options.order = {
  //   //     [sortField]: sortOrder,
  //   //   };
  //   // } else {
  //   //   options.order = {
  //   //     id: 'DESC',
  //   //   };
  //   // }

  //   // return this.repository.find(options);
  // }
}
