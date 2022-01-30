/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DesenvolvedorModule } from './desenvolvedor/desenvolvedor.module';
import { NivelModule } from './nivel/nivel.module';

const Models = [NivelModule, DesenvolvedorModule];
@Module({
  imports: [TypeOrmModule.forRoot(), ...Models],
  exports: [...Models],
})
export class ModelsModule {}
