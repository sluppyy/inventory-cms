import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { SequelizeModule } from '@nestjs/sequelize'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: 'sqlite',
      storage: process.env['DB_NAME'],
      autoLoadModels: true
    })
  ],
  controllers: [],
  providers: [AppService]
})
export class AppModule {}
