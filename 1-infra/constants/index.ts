export const projectNamePascal = "Berrychat";
export const projectName = "berrychat";

export const getCognitoUserPoolId = (envName: string) => {
  if (envName === "production") {
    return "";
  }
  if (envName === "staging") {
    return "eu-north-1_PVPJEgvyk";
  }
  return "";
};

export const getCognitoClientId = (envName: string) => {
  if (envName === "production") {
    return "";
  }
  if (envName === "staging") {
    return "5ir5mis4018ie39cs4kit0sfje";
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
