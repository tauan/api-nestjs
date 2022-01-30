import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NivelController } from './controllers/nivel.controller';
import { Nivel } from './entities/nivel.entity';
import { NivelService } from './services/nivel.service';

@Module({
  imports: [TypeOrmModule.forFeature([Nivel])],
  controllers: [NivelController],
  providers: [NivelService],
})
export class NivelModule {}
