import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { EnvironmentModule } from './settings/environment/env.module';
import { DatabaseModule } from './settings/database/database.mysql';
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [UserModule, EnvironmentModule, DatabaseModule, AuthModule, PostModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
