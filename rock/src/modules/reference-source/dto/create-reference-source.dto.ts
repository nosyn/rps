import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateReferenceSourceDto {
  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  @IsNotEmpty()
  name!: string;
}
