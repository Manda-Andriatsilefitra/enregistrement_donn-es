import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Resultat } from "../entity/Resultat";

dotenv.config();
export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: [Resultat],
    migrations: [__dirname + "/../migration/*/.ts,.js"],
    subscribers: []
});