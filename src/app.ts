import { authMiddleware } from "./middleware/index.ts";
import { Application, Router, RouterContext } from "./deps.ts";
import { applyGraphQL } from "./deps.ts";
import { Schema, resolvers } from "./schema/index.ts";

export class App {
  public app: Application;
  public port: number;
  public logger: any;

  constructor(port: any) {
    this.app = new Application();
    this.port = port;
    
    this.initializeMiddleware();
    this.initializeRoutes();
  }

  // initialize middleware
  private initializeMiddleware() {

    this.app.use(async (ctx, next) => {
      await next();
      const rt = ctx.response.headers.get("X-Response-Time");
      console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
    });

    this.app.use(authMiddleware);

  }

  // initialize routes
  private async initializeRoutes() {
    const GraphQLService = await applyGraphQL<Router>({
      Router,
      typeDefs: Schema,
      resolvers: resolvers,
      context: (ctx: RouterContext) => {
        console.log(ctx);
        const auth = ctx.request.headers.get('authorization') || '';
    return {
      auth
    };
      }
    })

    this.app.use(GraphQLService.routes(), GraphQLService.allowedMethods());

  }
  // server listen
  public async listen() {
    console.log(`Server start at http://localhost:${this.port}`);
    return await this.app.listen({ port: this.port });
  }
}