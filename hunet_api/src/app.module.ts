import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {UsersService} from './users/users.service';
import {UsersModule} from './users/users.module';
import {AuthModule} from './auth/auth.module';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {RolesModule} from './roles/roles.module';
import {RolesService} from './roles/roles.service';
import {User} from './users/entities/user.entity';
import {Role} from './roles/entities/role.entity';
import {GraphQLModule} from '@nestjs/graphql';
import {NewsModule} from './news/news.module';
import {AppointmentsModule} from './appointments/appointments.module';
import {ExaminationsModule} from './examinations/examinations.module';
import {DiseasesModule} from './diseases/diseases.module';
import {PermissionsModule} from './permissions/permissions.module';
import {ExaminationDetailsModule} from './examination-details/examination-details.module';
import {Disease} from './diseases/entities/disease.entity';
import {News} from './news/entities/news.entity';
import {ExaminationDetail} from './examination-details/entities/examination-detail.entity';
import {Examination} from './examinations/entities/examination.entity';
import {Appointment} from './appointments/entities/appointment.entity';
import {NewsService} from './news/news.service';
import {AppointmentsService} from './appointments/appointments.service';
import {ExaminationsService} from './examinations/examinations.service';
import {ExaminationDetailsService} from './examination-details/examination-details.service';
import {DiseasesService} from './diseases/diseases.service';
import {GraphQLError, GraphQLFormattedError} from 'graphql';
import {ServeStaticModule} from '@nestjs/serve-static';
import {join} from 'path';
import {CitiesModule} from './cities/cities.module';
import {City} from './cities/entities/city.entity';
import {SchedulesModule} from './schedules/schedules.module';
import environment from './config/database.config';
import {Schedule} from './schedules/entities/schedule.entity';
import {SchedulesService} from './schedules/schedules.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'upload'),
    }),
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot(environment(process.env.NODE_ENV)),
    ConfigModule.forRoot(),
    RolesModule,
    TypeOrmModule.forFeature([
      User,
      Role,
      News,
      Disease,
      ExaminationDetail,
      Examination,
      Appointment,
      City,
      Schedule,
    ]),
    GraphQLModule.forRoot({
      autoSchemaFile: '.schema.gql',
      sortSchema: true,
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message: error.message,
        };
        return graphQLFormattedError;
      },
      uploads: {
        maxFileSize: 20000000, // 20 MB
        maxFiles: 5,
      },
    }),
    NewsModule,
    AppointmentsModule,
    ExaminationsModule,
    DiseasesModule,
    PermissionsModule,
    ExaminationDetailsModule,
    CitiesModule,
    SchedulesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    UsersService,
    RolesService,
    NewsService,
    AppointmentsService,
    ExaminationsService,
    ExaminationDetailsService,
    DiseasesService,
    SchedulesService,
  ],
})
export class AppModule {}
