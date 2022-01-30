import {
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';
import { BaseService } from '.';

export abstract class BaseController<T extends BaseService<T1>, T1> {
  constructor(protected resourceService: T) {}

  /* Read only */
  @Get('/count')
  @ApiQuery({
    name: 'relations',
    required: false,
    type: 'string[]',
    description:
      'Indicates what relations of entity should be loaded (simplified left join form). Ex.: ["person", "person.address"].',
  })
  @ApiQuery({
    name: 'showDeleted',
    required: false,
    type: 'boolean',
    description:
      'Indicates if soft-deleted rows should be included in entity result.',
  })
  @ApiQuery({
    name: 'pageNumber',
    type: 'number',
    required: false,
    description: 'Offset page where from entities should be taken.',
  })
  @ApiQuery({
    name: 'pageSize',
    type: 'number',
    required: false,
    description: 'Limit (paginated) - max number of entities should be taken.',
  })
  @ApiQuery({
    name: 'offset',
    type: 'number',
    required: false,
    description: 'Offset (paginated) where from entities should be taken.',
  })
  @ApiQuery({
    name: 'sortField',
    type: 'string',
    required: false,
    description: 'Specifies what column should be used for ordination.',
  })
  @ApiQuery({
    name: 'sortOrder',
    type: "'ASC' | 'DESC'",
    required: false,
    description: 'Order, in which entities should be ordered',
  })
  @ApiQuery({
    name: '[p: string]',
    type: 'string',
    required: false,
    description:
      'Simple condition that should be applied to match entities. Accepts any value from the entity schema.',
  })
  @ApiResponse({ status: 200, description: 'Ok' })
  count(@Query() query?: Record<string, any>): Promise<number> {
    return this.resourceService.count(query);
  }

  @Get()
  @ApiQuery({
    name: 'relations',
    required: false,
    type: 'string[]',
    description:
      'Indicates what relations of entity should be loaded (simplified left join form). Ex.: ["person", "person.address"].',
  })
  @ApiQuery({
    name: 'showDeleted',
    required: false,
    type: 'boolean',
    description:
      'Indicates if soft-deleted rows should be included in entity result.',
  })
  @ApiQuery({
    name: 'pageNumber',
    type: 'number',
    required: false,
    description: 'Offset page where from entities should be taken.',
  })
  @ApiQuery({
    name: 'pageSize',
    type: 'number',
    required: false,
    description: 'Limit (paginated) - max number of entities should be taken.',
  })
  @ApiQuery({
    name: 'offset',
    type: 'number',
    required: false,
    description: 'Offset (paginated) where from entities should be taken.',
  })
  @ApiQuery({
    name: 'sortField',
    type: 'string',
    required: false,
    description: 'Specifies what column should be used for ordination.',
  })
  @ApiQuery({
    name: 'sortOrder',
    type: "'ASC' | 'DESC'",
    required: false,
    description: 'Order, in which entities should be ordered',
  })
  @ApiQuery({
    name: '[p: string]',
    type: 'string',
    required: false,
    description:
      'Simple condition that should be applied to match entities. Accepts any value from the entity schema.',
  })
  @ApiResponse({ status: 200, description: 'Ok' })
  findAll(@Query() query?: Record<string, any>): Promise<T1[]> {
    return this.resourceService.findAll(query);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Ok' })
  findOne(@Param() params, @Query() query?: Record<string, any>): Promise<T1> {
    return this.resourceService.findOne(params.id, query);
  }

  /* Create and update */
  @Post()
  @ApiResponse({ status: 201, description: 'Created' })
  async create(@Body() dto: T1, @Res({ passthrough: true }) res: Response) {
    const response = await this.resourceService.create(dto);
    if (response?.error) res.status(400);
    return response;
  }

  @Patch(':id')
  async update(
    @Param() params,
    @Body() dto: Partial<T1>,
    @Res({ passthrough: true }) res: Response,
  ) {
    const response = await this.resourceService.update(params.id, dto);
    if (response?.error) res.status(400);
    return response;
  }

  @Patch(':id/restore')
  restore(@Param() params) {
    return this.resourceService.restore(params.id);
  }

  /* Delete */

  @Delete(':id')
  softRemove(@Param() params) {
    return this.resourceService.softRemove(params.id);
  }

  @Delete()
  remove(@Body() dto: T1) {
    return this.resourceService.remove(dto);
  }
}
