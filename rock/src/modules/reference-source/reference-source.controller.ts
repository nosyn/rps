import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReferenceSourceService } from './reference-source.service';
import { CreateReferenceSourceDto } from './dto/create-reference-source.dto';
import { UpdateReferenceSourceDto } from './dto/update-reference-source.dto';

@Controller('reference-source')
export class ReferenceSourceController {
  constructor(
    private readonly referenceSourceService: ReferenceSourceService,
  ) {}

  @Post()
  create(@Body() createReferenceSourceDto: CreateReferenceSourceDto) {
    return this.referenceSourceService.create(createReferenceSourceDto);
  }

  @Get()
  findAll() {
    return this.referenceSourceService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.referenceSourceService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateReferenceSourceDto: UpdateReferenceSourceDto,
  ) {
    return this.referenceSourceService.update(id, updateReferenceSourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.referenceSourceService.remove(id);
  }
}
