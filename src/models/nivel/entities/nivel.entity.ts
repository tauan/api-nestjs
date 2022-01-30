import { Column, Entity, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

import { BaseEntity } from '../../../core';
import { Desenvolvedor } from 'src/models/desenvolvedor/entities/desenvolvedor.entity';
import { IsArray, IsOptional } from 'class-validator';

@Entity('nivel')
export class Nivel extends BaseEntity {
  @Column('varchar', { name: 'nivel', length: 100 })
  @ApiProperty({ required: true, type: 'string' })
  nivel?: string | null;

  @OneToMany(() => Desenvolvedor, (dsenvolvdor) => dsenvolvdor.nivel)
  @ApiProperty({ required: false, type: 'Desenvolvedor[]' })
  @IsArray()
  @IsOptional()
  desenvolvedores: Desenvolvedor[];

  constructor(init?: Partial<Nivel>) {
    super();
    Object.assign(this, init);
  }
}
