import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive } from 'class-validator';
import { Column, DeleteDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export abstract class BaseEntity {
  @PrimaryGeneratedColumn({
    type: 'int',
    unsigned: true,
    name: 'id',
  })
  @ApiProperty({ required: true, type: 'number' })
  @IsPositive()
  @IsOptional()
  id?: number;

  @Column({
    name: 'criado_em',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({ required: true, type: 'timestamp' })
  criadoEm?: Date;

  @Column({
    name: 'atualizado_em',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiProperty({ required: true, type: 'timestamp' })
  atualizadoEm?: Date;

  @DeleteDateColumn({ name: 'desativado_em', type: 'timestamp' })
  @ApiProperty({ required: false, type: 'timestamp' })
  desativadoEm?: Date | null;
}
