import { Client } from "https://deno.land/x/mysql/mod.ts";

export class DatabaseConnection {
  public client: Client;
  constructor(public dbName: string, public hostname: string, public username: string, public password: string) {
    this.dbName = dbName;
    this.hostname = hostname;
    this.username = username;
    this.password = password;
    this.client = {} as Client;
  }
  public connect() {
    const client = new Client();
    client.connect({
        hostname: this.hostname,
        username: this.username,
        password: this.password,
        db: this.dbName
    });
    this.client = client;

  }
  public getDatabase() {
    return this.client;
  }
}