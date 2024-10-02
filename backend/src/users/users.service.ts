import { Injectable, InternalServerErrorException, UnauthorizedException} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { BadRequestException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { Role } from '../auth/enums/role.enum';
import { responseStatus } from '../common/responses/responses';
import { ConfigModule } from '@nestjs/config';

ConfigModule.forRoot({
  envFilePath: 'src/config/config.env',
});

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private dataSource: DataSource
  ) { }

  async create(createUserDto: CreateUserDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // Chequeo si existe persona con ese gmail
      const existingUserByEmail = await this.userRepository.findOne({
        where: { email: createUserDto.email },
      });

      if (existingUserByEmail) {
        throw new BadRequestException('**ERROR: User with email already exists');
      }

      // Chequeo si existe persona con ese dni
      if (createUserDto.dni) {
        const existingPersonByDNI = await this.userRepository.findOne({
          where: { dni: createUserDto.dni },
        });

        if (existingPersonByDNI) {
          throw new BadRequestException('**ERROR: Person with DNI already exists');
        }
      }

      const user = await this.userRepository.save({ ...createUserDto });

      await queryRunner.commitTransaction();
      return user;

    } catch (e) {
      await queryRunner.rollbackTransaction();
      console.log(e.message);
      if(e instanceof BadRequestException){
        throw e;
      }else{
        throw new InternalServerErrorException({status:responseStatus.ERROR,message:e.message});
      }
    } finally {
      await queryRunner.release();
    }
  }


  // Buscar todos: User solo su usuario. Admin todos los usuarios.
  async findAll(userId: number) {
    try {
      const user = await this.userRepository.findOne({ where: {id: userId} });

      if (!user) {
        throw new NotFoundException(`User with ID ${userId} not found`);
      }
  
      if (user.roles.includes(Role.ADMIN)) {
        return this.userRepository.find({
        });
      } else {
        return [user];
      }
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException({
        status: responseStatus.ERROR,
        message: e.message,
      });
    }
  }

  // busca uno by id
  async findOne(id: number) {
    try {
      return await this.userRepository.findOne(
        {
          where: {
            id: id
          },
          //select: ["id", "username", 'roles', 'profilePicture']
        }
      );
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException({status:responseStatus.ERROR,message:e.message});
    }
  }

  // Cambiar y hacer uso de findOneByEmail y findOneByDNI para retornar el login
  async findOneByUsernameAndPasswd(username: string, password: string) {
    try {
      return await this.userRepository.findOne(
        {
          where: {
            username: username,
            password: password
          },
        }
      );
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException({status:responseStatus.ERROR,message:e.message});
    }
  }

  async findOneByUsername(username: string) {
    try {
      return await this.userRepository.findOne(
        {
          where: {
            username: username,
          },
        }
      );
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException({status:responseStatus.ERROR,message:e.message});
    }
  }

  async findOneByEmail(email: string) {
    try {
      return await this.userRepository.findOne(
        {
          where: {
            email: email
          },
        }
      );
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException({status:responseStatus.ERROR,message:e.message});
    }
  }

  async findOneByDNI(dni: string) {
    try {
      return await this.userRepository.findOne(
        {
          where: {
            dni: dni
          },
        }
      );
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException({status:responseStatus.ERROR,message:e.message});
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto, currentUser: number, file: Express.Multer.File) {
    const user= await this.userRepository.findOne( {where: {
      id: currentUser
    }});
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // Obtener el usuario que se está actualizando
      const userToUpdate = await this.userRepository.findOne(
        {
          where:{id:id},
        }
      );
      if (!userToUpdate) {
        throw new NotFoundException('Usuario no encontrado');
      }
  
      // Verificar si el usuario actual tiene permiso de administrador
      const isAdmin = user.roles === Role.ADMIN;
  
      // Verificar si el usuario actual está actualizando su propio perfil
      const isCurrentUser = user.id === id;
  
      // Verificar si se cargó un archivo
      if (file) {
        const fs = require('fs')
        try {
          fs.unlinkSync(process.env.USER_PROFILE_PICTURES_DIR+updateUserDto.profilePicture);
          console.log('profilePicture removed: '+process.env.USER_PROFILE_PICTURES_DIR+updateUserDto.profilePicture)
        } catch(err) {
          console.error('Something wrong happened removing the profilepicture', err)
        }
        updateUserDto.profilePicture = file.filename;
      }
          // Verificar si el usuario actual tiene permiso para actualizar el usuario
          if (!isAdmin && !isCurrentUser) {
            throw new ForbiddenException('No tienes permiso para modificar este usuario');
        }

        // Restricción para el usuario común: solo puede modificar su propio perfil
        if (!isAdmin && isCurrentUser) {
            updateUserDto = {
                name: updateUserDto.name,
                lastName: updateUserDto.lastName,
                email: updateUserDto.email,
                password: updateUserDto.password,
                phone: updateUserDto.phone,
                address: updateUserDto.address,
                profilePicture: updateUserDto.profilePicture
            };
        }

        // Permitir que el admin modifique cualquier campo permitido por el DTO
        updateUserDto = {
            ...updateUserDto // El admin puede actualizar todos los campos del DTO (incluyendo roles u otros permisos)
        };

        console.log('Antes de guardar:', { ...userToUpdate, ...updateUserDto });

        // Actualizar el usuario y su perfil asociado
        await this.userRepository.save({ ...userToUpdate, ...updateUserDto });

        await queryRunner.commitTransaction();

        return { status: 'OK', message: 'Los datos del usuario se actualizaron correctamente' };
    } catch (e) {
        await queryRunner.rollbackTransaction();
        console.log(e.message);
        if (e instanceof BadRequestException || e instanceof UnauthorizedException) {
            throw e;
        } else {
            throw new InternalServerErrorException({ status: responseStatus.ERROR, message: e.message });
        }
    } finally {
        await queryRunner.release();
    }
}
  
  

  async remove(id: number) {
    try {
      return await this.userRepository.softDelete(id);
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException({status:responseStatus.ERROR,message:e.message});
    }
  }

  private async getRolesById(id: number) {
    try {
      return await this.userRepository.findOne(
        {
          where: {
            id: id
          },
          select: {
            roles: true,
          },
        }
      );
    } catch (e) {
      console.log(e)
      throw new InternalServerErrorException({status:responseStatus.ERROR,message:e.message});
    }
  }
}