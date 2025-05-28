import { BlockPublicAccess, Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { RemovalPolicy } from "aws-cdk-lib";
import { projectName, projectNamePascal } from "../../../constants";

export const createS3AppBucket = (stack: Construct, envName: string) => {
  const name = `${projectName}-${envName}---app`;
  const logicalId = `${projectNamePascal}AppBucket`;

  const bucket = new Bucket(stack, logicalId, {
    bucketName: name,
    removalPolicy: RemovalPolicy.DESTROY,
    autoDeleteObjects: true,
    blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
    publicReadAccess: false,
    enforceSSL: true,
  });

  return bucket;
};
