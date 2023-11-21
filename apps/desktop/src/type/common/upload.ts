import { UPLOAD_TYPE } from "../../core/common/uploadType";

export type UploadType = typeof UPLOAD_TYPE[keyof typeof UPLOAD_TYPE];
