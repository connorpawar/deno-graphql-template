import { Context, validate } from '../deps.ts';
import { jwtKey } from '../environment.ts'

export const authMiddleware = async (ctx: Context, next: any) => {

  const headers: Headers = ctx.request.headers;
  // Taking JWT from Authorization header and comparing if it is valid JWT token, if YES - we continue, 
  // otherwise we return with status code 401
  const authorization = headers.get('Authorization')
  if (!authorization) {
    //should redirect to login page
    ctx.response.status = 401;
    return;
  }
  const jwt = authorization.split(' ')[1];
  if (!jwt) {
    ctx.response.status = 401;
    return;
  }
  if (await validate([{alg: "HS256", typ: "JWT"}, jwt, jwtKey])){
    await next();
    return;
  }

  ctx.response.status = 401;
  ctx.response.body = {message: 'Invalid jwt token'};
}