import { Duration } from "aws-cdk-lib";
import * as apigwv2 from "aws-cdk-lib/aws-apigatewayv2";
import * as integrations from "aws-cdk-lib/aws-apigatewayv2-integrations";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

export const createHttpApiGateWay = (
  stack: Construct,
  authApiLambdaFunction: NodejsFunction
) => {
  new apigwv2.HttpApi(stack, "AuthApi", {
    corsPreflight: {
      allowOrigins: ["*"],
      allowHeaders: ["*"],
      allowMethods: [apigwv2.CorsHttpMethod.GET, apigwv2.CorsHttpMethod.POST],
      maxAge: Duration.seconds(60),
    },
    defaultIntegration: new integrations.HttpLambdaIntegration(
      "DefaultIntegration",
      authApiLambdaFunction
    ),
  });
};
