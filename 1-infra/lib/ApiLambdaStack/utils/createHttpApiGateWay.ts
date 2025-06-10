import { Duration } from "aws-cdk-lib";
import * as apigwv2 from "aws-cdk-lib/aws-apigatewayv2";
import { HttpJwtAuthorizer } from "aws-cdk-lib/aws-apigatewayv2-authorizers";
import * as integrations from "aws-cdk-lib/aws-apigatewayv2-integrations";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

export const createHttpApiGateWay = (
  stack: Construct,
  apiFunction: NodejsFunction,
  jwtAuthorizer: HttpJwtAuthorizer
) => {
  const httpApi = new apigwv2.HttpApi(stack, "ApiGatewayHttpApi", {
    apiName: "Api",
    corsPreflight: {
      allowOrigins: ["*"],
      allowMethods: [apigwv2.CorsHttpMethod.ANY],
      allowHeaders: ["*"],
      maxAge: Duration.seconds(60),
    },
  });

  const integration = new integrations.HttpLambdaIntegration(
    "Integration",
    apiFunction
  );

  // Routes with JWT auth
  httpApi.addRoutes({
    path: "/message",
    methods: [apigwv2.HttpMethod.POST],
    integration,
    authorizer: jwtAuthorizer,
  });

  httpApi.addRoutes({
    path: "/threads",
    methods: [apigwv2.HttpMethod.GET],
    integration,
    authorizer: jwtAuthorizer,
  });

  // Explicit OPTIONS routes without auth for CORS
  // other wise preflight options cors error.
  // this is needed for cognito authorizer integration
  const corsOnly = (path: string) => {
    httpApi.addRoutes({
      path,
      methods: [apigwv2.HttpMethod.OPTIONS],
      integration,
    });
  };

  corsOnly("/message");
  corsOnly("/threads");
};
