import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { BaseEntity } from '../../../core';
import { IsString, IsPositive, IsObject, IsOptional } from 'class-validator';
import { Nivel } from 'src/models/nivel/entities/nivel.entity';

@Entity('desenvolvedor')
export class Desenvolvedor extends BaseEntity {
  @Column('int', { name: 'nivel_id', nullable: false })
  @ApiProperty({ required: true, type: 'number' })
  @IsPositive()
  nivelId: number;

  @Column('varchar', { name: 'nome', length: 100 })
  @ApiProperty({ required: true, type: 'string' })
  @IsString()
  nome: string;

  @Column('varchar', { name: 'sexo', length: 100 })
  @ApiProperty({ required: true, type: 'string' })
  @IsString()
  sexo: 'masculino' | 'feminino' | 'outro';

  @Column('date', { name: 'data_nascimento', nullable: true })
  @ApiProperty({ required: true, type: 'date' })
  dataNascimento: Date;

  @Column('int', { name: 'idade', nullable: false })
  @ApiProperty({ required: true, type: 'number' })
  @IsPositive()
  idade: number;

  @Column('varchar', { name: 'hobby', length: 100 })
  @ApiProperty({ required: true, type: 'string' })
  @IsString()
  hobby: string;

  @ManyToOne(() => Nivel, (nivel) => nivel.desenvolvedores, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'nivel_id', referencedColumnName: 'id' }])
  @ApiProperty({ required: false, type: 'Horario' })
  @IsObject()
  @IsOptional()
  nivel: Nivel;

  constructor(init?: Partial<Desenvolvedor>) {
    super();
    Object.assign(this, init);
  }
}
