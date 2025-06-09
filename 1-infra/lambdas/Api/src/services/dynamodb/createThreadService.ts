import { PutCommand } from "@aws-sdk/lib-dynamodb";
import { THREADS_TABLE } from "../../constants";
import { docClient } from "../../instances/aws";

export const createThreadService = async (thread: any) => {
  const command = {
    TableName: THREADS_TABLE,
    Item: thread,
  };
  await docClient.send(new PutCommand(command));
};
