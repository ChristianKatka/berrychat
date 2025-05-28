import {
  AdminCreateUserCommand,
  AdminSetUserPasswordCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { COGNITO_USER_POOL_ID } from "../../constants";
import { cognitoClient } from "../../instances/aws";

export const signUpCommandService = async (email: string, password: string) => {
  // 1. Create the user with suppressed message
  const createCommand = new AdminCreateUserCommand({
    UserPoolId: COGNITO_USER_POOL_ID,
    Username: email,
    TemporaryPassword: password,
    UserAttributes: [{ Name: "email", Value: email }],
    MessageAction: "SUPPRESS", // ❌ disables email
  });

  const createResponse = await cognitoClient.send(createCommand);

  const sub = createResponse.User?.Attributes?.find(
    (attr) => attr.Name === "sub"
  )?.Value;

  // 2. Immediately set the password as permanent
  const setPasswordCommand = new AdminSetUserPasswordCommand({
    UserPoolId: COGNITO_USER_POOL_ID,
    Username: email,
    Password: password,
    Permanent: true, // ✅ this skips the "new password required" challenge
  });

  await cognitoClient.send(setPasswordCommand);

  return { success: true, sub };
};
