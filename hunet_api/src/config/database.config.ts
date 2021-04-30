import {TypeOrmModuleOptions} from '@nestjs/typeorm';

const environment = (option: string): TypeOrmModuleOptions => {
  let moduleOption: TypeOrmModuleOptions = null;
  if (option?.trim() == 'development') {
    moduleOption = {
      type: 'mysql',
      // host: 'mysql',
      host: 'localhost',
      username: 'root',
      port: 3306,
      password: '123456',
      database: 'hunet',
      entities: ['dist/**/*.entity{.ts,.js}'],
    };
  } else if (option?.trim() == 'test') {
    moduleOption = {
      type: 'mysql',
      // host: 'mysql',
      host: 'localhost',
      username: 'root',
      port: 3306,
      password: '123456',
      database: 'hunet-test',
      entities: ['dist/**/*.entity{.ts,.js}'],
    };
  } else if (option?.trim() == 'production' || typeof option == 'undefined') {
    moduleOption = {
      type: 'mysql',
      host: '/cloudsql/inner-rhythm-306513:us-central1:hunet-db',
      extra: {
        socketPath: '/cloudsql/inner-rhythm-306513:us-central1:hunet-db',
      },
      username: 'root',
      password: '123456789',
      database: 'hunet',
      entities: ['dist/**/*.entity{.ts,.js}'],
    };
  }
  return moduleOption;
};
export default environment;
