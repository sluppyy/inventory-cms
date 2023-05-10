import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { AppService } from './app.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigModule } from '@nestjs/config'
import { AuthMiddleware, AuthModule } from 'auth'
import { EventsModule } from './events'

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: process.env['DB_NAME'],
      autoLoadModels: true
    }),
    AuthModule,
    EventsModule
  ],
  controllers: [],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*')
  }
}
