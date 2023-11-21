import { CONVENTION_TYPE } from "../../../core/common/convention/conventionType";
import { MARKETING_INFORMATION_AGREE_POLICY } from "../../../core/common/convention/marketingInformationAgreePolicy";
import { PERSONAL_INFORMATION__PROCESSING_POLICY } from "../../../core/common/convention/personalInformationProcessingPolicy";
import { USING_SITE_POLICY } from "../../../core/common/convention/usingSitePolicy";

export function checkConventionType(policy: string) {
  switch (policy) {
    case CONVENTION_TYPE.PERSONAL:
      return PERSONAL_INFORMATION__PROCESSING_POLICY;
    case CONVENTION_TYPE.MARKETING:
      return MARKETING_INFORMATION_AGREE_POLICY;
    case CONVENTION_TYPE.USINGSITE:
      return USING_SITE_POLICY;
    default:
      return;
  }
}
