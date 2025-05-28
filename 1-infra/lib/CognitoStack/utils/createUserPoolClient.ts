import { Duration } from "aws-cdk-lib";
import * as cognito from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";

export const createUserPoolClient = (
  stack: Construct,
  envName: string,
  userPool: cognito.UserPool
) => {
  return new cognito.UserPoolClient(stack, "UserPoolClient", {
    userPoolClientName: `${envName}---user-pool-client`,
    userPool,
    refreshTokenValidity: Duration.days(3650), // 10 years
    authFlows: {
      adminUserPassword: true,
      custom: false,
      userPassword: false,
      userSrp: false,
    },
    generateSecret: false,
  });
};
