import { Duration } from "aws-cdk-lib";
import {
  HeadersFrameOption,
  ResponseHeadersPolicy,
} from "aws-cdk-lib/aws-cloudfront";
import { Construct } from "constructs";

export const createSecurityHeaderPolicy = (stack: Construct) => {
  const policy = new ResponseHeadersPolicy(stack, "SecurityHeadersPolicy", {
    comment: "Security headers policy",
    securityHeadersBehavior: {
      // strictTransportSecurity protects against SSL stripping attacks.
      strictTransportSecurity: {
        override: true,
        accessControlMaxAge: Duration.days(365 * 2),
        includeSubdomains: true,
        preload: true,
      },
      xssProtection: { override: true, protection: true, modeBlock: true },
      contentTypeOptions: { override: true },
      // Prevents your site from being embedded in an <iframe>
      frameOptions: {
        override: true,
        frameOption: HeadersFrameOption.DENY,
      },
    },
  });
  return policy;
};
