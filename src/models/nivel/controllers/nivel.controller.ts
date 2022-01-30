import { Controller, Delete, Param, Res } from '@nestjs/common';
import { Nivel } from '../entities/nivel.entity';
import { NivelService } from '../services/nivel.service';
import { BaseController } from 'src/core/base-controller';
import { Response } from 'express';
import { ApiResponse } from '@nestjs/swagger';

@Controller('nivel')
export class NivelController extends BaseController<NivelService, Nivel> {
  constructor(protected resourceService: NivelService) {
    super(resourceService);
  }

  @Delete(':id')
  @ApiResponse({ status: 501, description: 'This level cannot be disabled' })
  async softRemoveCuston(
    @Param() params,
    @Res({ passthrough: true }) res: Response,
  ) {
    const response = await this.resourceService.softRemoveCuston(params.id);
    if (response && response?.error) res.status(501);
    return response;
  }
}
