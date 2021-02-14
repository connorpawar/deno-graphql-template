import { App } from './src/app.ts';
import { PORT, dbName, dbHostUrl, dbUserame, dbPassword } from './src/environment.ts'
import { DatabaseConnection } from "./database/index.ts";

const app = new App(PORT);

const db = new DatabaseConnection(dbName, dbHostUrl, dbUserame, dbPassword);

db.connect();
app.listen();