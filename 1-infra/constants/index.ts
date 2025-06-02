export const projectNamePascal = "Berrychat";
export const projectName = "berrychat";

export const getCognitoUserPoolId = (envName: string) => {
  if (envName === "production") {
    return "";
  }
  if (envName === "staging") {
    return "eu-north-1_VvrBc2RCG";
  }
  return "";
};

export const getCognitoClientId = (envName: string) => {
  if (envName === "production") {
    return "";
  }
  if (envName === "staging") {
    return "jmd5490q1b40oltagl05fm2rg";
  }
  return "";
};

export const getAppBucketName = (envName: string) => {
  if (envName === "production") {
    return "";
  }
  if (envName === "staging") {
    return "berrychat-staging---app";
  }
  return "";
};
