import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) { }

  createTypeOrmOptions(_connectionName?: string): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    const options: TypeOrmModuleOptions = {
      type: "postgres",
      host: this.configService.getOrThrow<string>("DB_HOST"),
      port: +this.configService.getOrThrow<string>("DB_PORT"),
      database: this.configService.getOrThrow<string>("DB_NAME"),
      username: this.configService.getOrThrow<string>("DB_USERNAME"),
      password: this.configService.getOrThrow<string>("DB_PASSWORD"),
      entities: ["**/*.entity.js"],
      subscribers: ["**/*.entity.js"],
      migrations: ["**/migrations/*.js"],
      synchronize: false,
    }

    return options;
  }
}