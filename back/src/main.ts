import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('../package.json')
import { ConsoleLogger, ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  const appLogger = new ConsoleLogger('App')

  const cfg = new DocumentBuilder()
    .setTitle('Inventory CMS')
    .setDescription('Cms to manage inventories and trades')
    .setVersion(packageJson.version ?? '0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, cfg)
  SwaggerModule.setup('swagger', app, document)

  const port = process.env.PORT ?? 3000
  await app.listen(port)
  appLogger.log(`App started on port ${port}`)
}
bootstrap()
