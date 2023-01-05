import { trackSearchHandler } from "./trackSearch";
import { vocalSearchHandler } from "./vocalSearch";
import { trackPostHandler } from "./trackPost";
import { trackUploadHandler } from "./trackUpload";
import { producerProfileHandler } from "./producerProfile";
import { vocalProfileHandler } from "./vocalProfile";
import { myPageHandler } from "./myPage";

export const handlers = [
  ...trackSearchHandler,
  ...vocalSearchHandler,
  ...trackPostHandler,
  ...trackUploadHandler,
  ...producerProfileHandler,
  ...vocalProfileHandler,
  ...myPageHandler,
];
