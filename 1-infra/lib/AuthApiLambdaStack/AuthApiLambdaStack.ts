import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { createAuthApiLambdaFunction } from "./utils/createAuthApiLambdaFunction";
import { createHttpApiGateWay } from "./utils/createHttpApiGateWay";
import { createRoleAndPolicies } from "./utils/createRoleAndPolicies";

interface Props extends StackProps {
  envName: string;
}

export class AuthApiLambdaStack extends Stack {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);

    const { envName } = props;

    const lambdaRole = createRoleAndPolicies(this);

    const authApiLambdaFunction = createAuthApiLambdaFunction(
      this,
      envName,
      lambdaRole
    );
    createHttpApiGateWay(this, authApiLambdaFunction);
  }
}
