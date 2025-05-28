import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";

export const cognitoClient = new CognitoIdentityProviderClient({
  region: "eu-north-1",
});

export const docClient = new DynamoDBClient({ region: "eu-north-1" });
