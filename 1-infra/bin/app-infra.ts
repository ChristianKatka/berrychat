#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { AllBucketsStack } from "../lib/AllBucketsStack/AllBucketsStack";
import { CdnForAppStack } from "../lib/CdnForApp/CdnForAppStack";
import { CognitoStack } from "../lib/CognitoStack/CognitoStack";
import { AuthApiLambdaStack } from "../lib/AuthApiLambdaStack/AuthApiLambdaStack";
import { DynamoDBTablesStack } from "../lib/DynamoDBTablesStack/DynamoDBTablesStack";
import { ApiLambdaStack } from "../lib/ApiLambdaStack/ApiLambdaStack";

// Create CDK app
const app = new cdk.App();

const envName = app.node.tryGetContext("env");

if (!envName) {
  throw new Error("Missing context: pass -c env=staging or -c env=production");
}

// Define environments
const environments: Record<string, cdk.Environment> = {
  staging: {
    account: "177244120069",
    region: "eu-north-1",
  },
  production: {
    account: "",
    region: "",
  },
};

const envConfig = environments[envName];

if (!envConfig) {
  throw new Error(`Invalid environment name: "${envName}"`);
}

const currentAccount = process.env.CDK_DEFAULT_ACCOUNT;

if (currentAccount && currentAccount !== envConfig.account) {
  throw new Error(
    `AWS Account mismatch: You are deploying to environment "${envName}" which expects account ${envConfig.account}, but your credentials are using ${currentAccount}`
  );
}

// --------------------------
// START OF STACKS

new AllBucketsStack(app, `AllBucketsStack-${envName}`, {
  stackName: `${envName}---all-buckets`,
  env: envConfig, // ✅ this is what sets the AWS region + account
  envName,
});

new CdnForAppStack(app, `CdnForAppStack-${envName}`, {
  stackName: `${envName}---cdn-for-app`,
  env: envConfig, // ✅ this is what sets the AWS region + account
  envName,
});

const cognitoStack = new CognitoStack(app, `CognitoStack-${envName}`, {
  stackName: `${envName}---cognito`,
  env: envConfig, // ✅ this is what sets the AWS region + account
  envName,
});

new AuthApiLambdaStack(app, `AuthApiLambdaStack-${envName}`, {
  stackName: `${envName}---auth-api-lambda`,
  env: envConfig, // ✅ this is what sets the AWS region + account
  envName,
});

new ApiLambdaStack(app, `ApiLambdaStack-${envName}`, {
  stackName: `${envName}---api-lambda`,
  env: envConfig, // ✅ this is what sets the AWS region + account
  envName,
  userPoolClient: cognitoStack.userPoolClient,
  userPool: cognitoStack.userPool,
});

new DynamoDBTablesStack(app, `DynamoDBTablesStack-${envName}`, {
  stackName: `${envName}---dynamodb-tables`,
  env: envConfig, // ✅ this is what sets the AWS region + account
  envName,
});
