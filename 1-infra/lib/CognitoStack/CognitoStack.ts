import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { createUserPool } from "./utils/createUserPool";
import { createUserPoolClient } from "./utils/createUserPoolClient";
import { UserPool, UserPoolClient } from "aws-cdk-lib/aws-cognito";

interface Props extends StackProps {
  envName: string;
}

export class CognitoStack extends Stack {
  public userPool: UserPool = {} as UserPool;
  public userPoolClient: UserPoolClient = {} as UserPoolClient;

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);

    const { envName } = props;

    this.userPool = createUserPool(this, envName);

    this.userPoolClient = createUserPoolClient(this, envName, this.userPool);
  }
}
