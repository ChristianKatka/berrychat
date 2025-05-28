import { CfnOutput, Stack, StackProps } from "aws-cdk-lib";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";
import { getAppBucketName } from "../../constants";
import { createCloudFrontDistribution } from "./utils/createCloudFrontDistribution";
import { createSecurityHeaderPolicy } from "./utils/createSecurityHeaderPolicy";

interface Props extends StackProps {
  envName: string;
}

export class CdnForAppStack extends Stack {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);

    const { envName } = props;

    // Create a reference to the existing bucket
    // HAVE TO DO IT LIKE This otherwise circular dependency because grandOAI access to s3
    const appBucket = Bucket.fromBucketName(
      this,
      "ExistingBucket",
      getAppBucketName(envName)
    );

    // Origin Access Identity (OAI) for CloudFront
    const originAccessIdentity = new cloudfront.OriginAccessIdentity(
      this,
      "AppOAI",
      { comment: `OAI for ${envName}` }
    );

    // Security Headers Policy (HSTS, XSS, etc.)
    const securityHeadersPolicy = createSecurityHeaderPolicy(this);

    // CloudFront Distribution (SPA-friendly)
    createCloudFrontDistribution(
      this,
      appBucket,
      originAccessIdentity,
      securityHeadersPolicy
    );

    new CfnOutput(this, "OaiCanonicalUserId", {
      value:
        originAccessIdentity.cloudFrontOriginAccessIdentityS3CanonicalUserId,
    });
  }
}
