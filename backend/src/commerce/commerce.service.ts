// // import { Injectable } from '@nestjs/common';
// // import { CreateCommerceDto } from './dto/create-commerce.dto';
// // import { UpdateCommerceDto } from './dto/update-commerce.dto';

// // @Injectable()
// // export class CommerceService {
// //   create(createCommerceDto: CreateCommerceDto) {
// //     return 'This action adds a new commerce';
// //   }

// //   findAll() {
// //     return `This action returns all commerce`;
// //   }

// //   findOne(id: number) {
// //     return `This action returns a #${id} commerce`;
// //   }

// //   update(id: number, updateCommerceDto: UpdateCommerceDto) {
// //     return `This action updates a #${id} commerce`;
// //   }

// //   remove(id: number) {
// //     return `This action removes a #${id} commerce`;
// //   }
// // }



// import { Injectable } from '@nestjs/common';
// import { CreateCommerceDto } from './dto/create-commerce.dto';
// import { UpdateCommerceDto } from './dto/update-commerce.dto';
// import { Commerce } from './entities/commerce.entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';

// @Injectable()
// export class CommerceService {
//   constructor(
//     @InjectRepository(Commerce)
//     private commerceRepository: Repository<Commerce>,
//   ) {}

//   // Crear un nuevo comercio
//   async create(createCommerceDto: CreateCommerceDto): Promise<Commerce> {
//     const commerce = this.commerceRepository.create(createCommerceDto);
//     return await this.commerceRepository.save(commerce);
//   }

//   // Obtener todos los comercios
//   async findAll(): Promise<Commerce[]> {
//     return await this.commerceRepository.find();
//   }

//   // Obtener un comercio por su ID ---verificar tipo: number, tira error...
//   async findOne(id): Promise<Commerce> {
//     return await this.commerceRepository.findOne(id);
//   }

//   // Actualizar un comercio existente
//   async update(id: number, updateCommerceDto: UpdateCommerceDto): Promise<Commerce> {
//     await this.commerceRepository.update(id, updateCommerceDto);
//     return this.findOne(id);
//   }

//   // Eliminar un comercio por su ID
//   async remove(id: number): Promise<void> {
//     await this.commerceRepository.delete(id);
//   }
// }

