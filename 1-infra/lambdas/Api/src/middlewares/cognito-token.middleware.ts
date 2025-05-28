import { Context, Next } from "koa";
import { decode } from "jws";

export const decodeCognitoToken = async (ctx: Context, next: Next) => {
  const request = ctx.request;

  if (request.headers.authorization) {
    const decoded = decode(request.headers.authorization as string);
    if (!decoded) return;
    if (decoded.payload) {
      ctx.state.jwtPayload = JSON.parse(decoded.payload);
    }
  }

  await next();
};
