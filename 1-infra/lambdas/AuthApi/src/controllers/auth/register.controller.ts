import { Context, Next } from "koa";
import { adminInitiateAuthCommandService } from "../../services/auth/admin-initiate-auth-command.service";
import { signUpCommandService } from "../../services/auth/sign-up-command.service";
import { createUser } from "../../services/dynamodb/create-user.service";

export const register = async (ctx: Context, next: Next) => {
  const email = (ctx.request.body as any).email;
  const password = (ctx.request.body as any).password;

  try {
    // signup AKA register to cognito
    const signUpResponse = await signUpCommandService(email, password);

    // authenticate given user -> get back tokens
    const loginAuthResponse = await adminInitiateAuthCommandService(
      email,
      password
    );

    const user = { email, sub: signUpResponse.sub };

    await createUser(user);

    ctx.response.body = loginAuthResponse;
  } catch (error) {
    console.log(error);
    console.log(error.message);

    ctx.response.body = {
      errorMessage: error.message,
      error,
    };
  }

  await next();
};
