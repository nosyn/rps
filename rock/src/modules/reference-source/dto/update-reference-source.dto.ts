import { PartialType } from '@nestjs/mapped-types';
import { CreateReferenceSourceDto } from './create-reference-source.dto';

export class UpdateReferenceSourceDto extends PartialType(
  CreateReferenceSourceDto,
) {}
