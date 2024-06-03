import { Injectable, NotFoundException } from '@nestjs/common';
import { BaseEntity } from './base.entity';
import { BaseResponsePaginationResult } from './base.model';

@Injectable()
export abstract class BaseRepository<TEntity extends BaseEntity> {
  constructor(private prismaModel: any) {}

  async getAll(
    pageNumber: number,
    pageSize: number,
    filter: any = null,
    orderByColumn = 'createdAt',
    orderByDirection = 'desc',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    include: any = null,
  ): Promise<BaseResponsePaginationResult> {
    const skip = (pageNumber - 1) * pageSize;

    const orderBy = {
      [orderByColumn]: orderByDirection,
    };

    const defaultFilter: any = {
      deleted: false,
    };

    const finalFilter = filter
      ? { ...defaultFilter, ...filter }
      : defaultFilter;

    const items = await this.prismaModel.findMany({
      where: finalFilter,
      skip: skip,
      take: pageSize,
      orderBy: orderBy,
    });

    const totalItems = await this.prismaModel.count();

    return {
      items,
      pageNumber,
      pageSize,
      totalPages: totalItems > 0 ? Math.ceil(totalItems / pageSize) : 0,
      totalItems,
    } as BaseResponsePaginationResult;
  }

  async getById(id: string): Promise<TEntity> {
    return this.prismaModel.findUnique({
      where: { id },
    });
  }

  async findOne(filter: any): Promise<TEntity | null> {
    return this.prismaModel.findFirst({
      where: filter,
    });
  }

  async update(id: string | number, data: any) {
    data.updatedAt = new Date();

    return this.prismaModel.update({
      where: { id },
      data,
    });
  }

  async create(data: TEntity) {
    const now = new Date();
    data.updatedAt = now;
    data.createdAt = now;

    return await this.prismaModel.create({
      data,
    });
  }

  async delete(id: string) {
    const entity = await this.prismaModel.update({
      where: { id },
      data: { deleted: true, updatedAt: new Date() },
    });

    if (!entity) {
      throw new NotFoundException(`The ID ${id} not found.`);
    }

    return entity;
  }

  async findByName(
    name: string,
    pageNumber: number,
    pageSize: number,
  ): Promise<BaseResponsePaginationResult> {
    const skip = (pageNumber - 1) * pageSize;
    const nameFilter = { name: { contains: name } };

    let items, totalItems;
    let success = true;
    let messageError = '';

    try {
      items = await this.prismaModel.findMany({
        where: nameFilter,
        skip: skip,
        take: pageSize,
        orderBy: { createdAt: 'desc' },
      });

      totalItems = await this.prismaModel.count({
        where: nameFilter,
      });
    } catch (error) {
      success = false;
      messageError = `Erro ao buscar registros: ${error.message}`;
    }

    return {
      items,
      pageNumber,
      pageSize,
      totalPages: totalItems > 0 ? Math.ceil(totalItems / pageSize) : 0,
      totalItems,
      success,
      messageError,
    };
  }
}
