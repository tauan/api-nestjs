import { Controller } from '@nestjs/common';
import { BaseController } from 'src/core/base-controller';
import { DesenvolvedorService } from '../services/desenvolvedor.service';
import { Desenvolvedor } from '../entities/desenvolvedor.entity';

@Controller('desenvolvedor')
export class DesenvolvedorController extends BaseController<
  DesenvolvedorService,
  Desenvolvedor
> {
  constructor(protected resourceService: DesenvolvedorService) {
    super(resourceService);
  }
}
