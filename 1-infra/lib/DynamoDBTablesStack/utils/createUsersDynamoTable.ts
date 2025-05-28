import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

export const createUsersDynamoTable = (stack: Construct, envName: string) => {
  const tableName = `${envName}-users`;
  const table = new dynamodb.Table(stack, "UsersTable", {
    tableName,
    partitionKey: {
      name: "email",
      type: dynamodb.AttributeType.STRING,
    },
    billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
  });

  return table;
};
