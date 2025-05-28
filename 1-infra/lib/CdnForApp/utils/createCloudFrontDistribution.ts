import { Duration } from "aws-cdk-lib";
import {
  CachePolicy,
  Distribution,
  OriginAccessIdentity,
  ResponseHeadersPolicy,
  ViewerProtocolPolicy,
} from "aws-cdk-lib/aws-cloudfront";
import { S3Origin } from "aws-cdk-lib/aws-cloudfront-origins";
import { IBucket } from "aws-cdk-lib/aws-s3";
import { Construct } from "constructs";

export const createCloudFrontDistribution = (
  stack: Construct,
  appBucket: IBucket,
  originAccessIdentity: OriginAccessIdentity,
  securityHeadersPolicy: ResponseHeadersPolicy
) => {
  new Distribution(stack, "AppDistribution", {
    defaultRootObject: "index.html",
    defaultBehavior: {
      origin: new S3Origin(appBucket, {
        originAccessIdentity,
      }),
      compress: true,
      viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
      responseHeadersPolicy: securityHeadersPolicy,
      cachePolicy: CachePolicy.CACHING_OPTIMIZED, // Pre-configured for static assets
    },
    errorResponses: [
      // Handle SPA client-side routing
      {
        httpStatus: 403,
        responseHttpStatus: 200,
        responsePagePath: "/index.html",
        ttl: Duration.seconds(0), // Do NOT cache error responses
      },
      {
        httpStatus: 404,
        responseHttpStatus: 200,
        responsePagePath: "/index.html",
        ttl: Duration.seconds(0),
      },
    ],
  });
};
