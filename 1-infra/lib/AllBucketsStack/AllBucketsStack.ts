import { Stack, StackProps } from "aws-cdk-lib";
import * as s3 from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { createS3AppBucket } from "./utils/createS3AppBucket";

interface Props extends StackProps {
  envName: string;
}

export class AllBucketsStack extends Stack {
  public appBucket: s3.Bucket;
  public authApiLambdaBucket: s3.Bucket;
  public apiLambdaBucket: s3.Bucket;

  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);

    const { envName } = props;

    this.appBucket = createS3AppBucket(this, envName);
  }
}
