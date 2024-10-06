import { Injectable } from '@nestjs/common';
import { CreateReferenceSourceDto } from './dto/create-reference-source.dto';
import { UpdateReferenceSourceDto } from './dto/update-reference-source.dto';
import { DrizzleService } from 'src/database/drizzle.service';
import { databaseSchema } from '@/database/database-schema';
import { eq } from 'drizzle-orm';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ReferenceSourceService {
  constructor(private readonly drizzleService: DrizzleService) {}

  async create(createReferenceSourceDto: CreateReferenceSourceDto) {
    const createdReferenceSources = await this.drizzleService.db
      .insert(databaseSchema.referenceSource)
      .values(createReferenceSourceDto)
      .returning();

    return createdReferenceSources.pop();
  }

  findAll() {
    return this.drizzleService.db.select().from(databaseSchema.referenceSource);
  }

  async findOne(id: string) {
    const referenceSources = await this.drizzleService.db
      .select()
      .from(databaseSchema.referenceSource)
      .where(eq(databaseSchema.referenceSource.id, id));

    const referenceSource = referenceSources.pop();

    if (!referenceSource) {
      throw new NotFoundException();
    }

    return referenceSource;
  }

  async update(id: string, updateReferenceSourceDto: UpdateReferenceSourceDto) {
    const updatedReferenceSources = await this.drizzleService.db
      .update(databaseSchema.referenceSource)
      .set(updateReferenceSourceDto)
      .where(eq(databaseSchema.referenceSource.id, id))
      .returning();

    if (updatedReferenceSources.length === 0) {
      throw new NotFoundException();
    }

    return updatedReferenceSources.pop();
  }

  async remove(id: string) {
    const deletedReferenceSources = await this.drizzleService.db
      .delete(databaseSchema.referenceSource)
      .where(eq(databaseSchema.referenceSource.id, id))
      .returning();

    if (deletedReferenceSources.length === 0) {
      throw new NotFoundException();
    }
  }
}
