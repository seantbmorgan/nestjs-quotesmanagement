import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'HOST',
    port: 5432,
    username: 'USERNAME',
    password: 'PASSWORD',
    database: 'DATABASE',
    entities: [__dirname + '/../**/*.entity.{ts,js}'],
    synchronize: true // Turn off for Production
} 