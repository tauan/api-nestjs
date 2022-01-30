import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DesenvolvedorController } from './controllers/desenvolvedor.controller';
import { Desenvolvedor } from './entities/desenvolvedor.entity';
import { DesenvolvedorService } from './services/desenvolvedor.service';

@Module({
  imports: [TypeOrmModule.forFeature([Desenvolvedor])],
  controllers: [DesenvolvedorController],
  providers: [DesenvolvedorService],
})
export class DesenvolvedorModule {}
