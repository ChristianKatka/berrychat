import { Stack, StackProps } from "aws-cdk-lib";
import { HttpJwtAuthorizer } from "aws-cdk-lib/aws-apigatewayv2-authorizers";
import { UserPool, UserPoolClient } from "aws-cdk-lib/aws-cognito";
import { Construct } from "constructs";
import { createApiLambdaFunction } from "./utils/createApiLambdaFunction";
import { createHttpApiGateWay } from "./utils/createHttpApiGateWay";
import { createRoleAndPolicies } from "./utils/createRoleAndPolicies";

interface Props extends StackProps {
  envName: string;
  userPool: UserPool;
  userPoolClient: UserPoolClient;
}

export class ApiLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);

    const { envName, userPool, userPoolClient } = props;

    const lambdaRole = createRoleAndPolicies(this);

    const apiFunction = createApiLambdaFunction(this, envName, lambdaRole);

    // Cognito JWT Authorizer
    const issuer = userPool.userPoolId;
    const audience = userPoolClient.userPoolClientId;
    const jwtAuthorizer = new HttpJwtAuthorizer(
      "CognitoJwtAuthorizer", // id
      `https://cognito-idp.${this.region}.amazonaws.com/${issuer}`, // jwtIssuer
      {
        jwtAudience: [audience],
        identitySource: ["$request.header.Authorization"],
      }
    );

    createHttpApiGateWay(this, apiFunction, jwtAuthorizer);
  }
}
