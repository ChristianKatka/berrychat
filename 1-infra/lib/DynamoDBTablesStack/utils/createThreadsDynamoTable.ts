import * as dynamodb from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

export const createThreadsDynamoTable = (stack: Construct, envName: string) => {
  const tableName = `${envName}-threads`;
  const table = new dynamodb.Table(stack, "ThreadsTable", {
    tableName,
    partitionKey: {
      name: "email",
      type: dynamodb.AttributeType.STRING,
    },
    sortKey: {
      name: "threadId",
      type: dynamodb.AttributeType.STRING,
    },
    billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
  });

  return table;
};
