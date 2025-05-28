import { Duration, aws_lambda as lambda } from "aws-cdk-lib";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";
import { getCognitoClientId, getCognitoUserPoolId } from "../../../constants";
import { Role } from "aws-cdk-lib/aws-iam";

export const createAuthApiLambdaFunction = (
  stack: Construct,
  envName: string,
  lambdaRole: Role
) => {
  const apiFunction = new NodejsFunction(stack, "API", {
    functionName: `${envName}-auth-api`,
    runtime: lambda.Runtime.NODEJS_20_X,
    entry: "lambdas/AuthApi/src/lambda.ts", // Entry TypeScript file
    handler: "handler", // Exported function name
    memorySize: 256,
    depsLockFilePath: "lambdas/AuthApi/package-lock.json",
    timeout: Duration.seconds(30),
    role: lambdaRole,
    environment: {
      COGNITO_USER_POOL_ID: getCognitoUserPoolId(envName),
      COGNITO_CLIENT_ID: getCognitoClientId(envName),
      ENVIRONMENT_NAME: envName,
    },
  });
  return apiFunction;
};
