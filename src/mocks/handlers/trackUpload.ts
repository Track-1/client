import { rest } from "msw";

export const trackUploadHandler = [
  rest.post("/tracks", async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json({}));
  }),
];
