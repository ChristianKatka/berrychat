import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { ENVIRONMENT_NAME } from "../../constants";
import { docClient } from "../../instances/aws";

export const createUser = async (user: any) => {
  const command = {
    TableName: `${ENVIRONMENT_NAME}-users`,
    Item: user,
  };
  await docClient.send(new PutCommand(command));
};
