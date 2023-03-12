import { type NextFunction } from "grammy";
import { type Context } from "~/bot/context";
import { updateCounter, updateFailedCounter } from "~/metrics";

export const metrics = async (ctx: Context, next: NextFunction) => {
  try {
    updateCounter.inc({
      from_id: ctx.from?.id,
      chat_id: ctx.chat?.id,
    });

    await next();

    return;
  } catch (e) {
    updateFailedCounter.inc({
      from_id: ctx.from?.id,
      chat_id: ctx.chat?.id,
    });
    throw e;
  }
};
