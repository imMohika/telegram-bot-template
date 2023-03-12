import { type Middleware } from "grammy";
import { isNil, pick } from "lodash-es";
import { type Context } from "~/bot/context";
import { updateHandledCounter } from "~/metrics";

export const getChatInfo = (ctx: Context) => {
  if (!isNil(ctx.chat)) {
    return {
      chat: pick(ctx.chat, ["id", "type"]),
    };
  }

  return {};
};

export const getSenderInfo = (ctx: Context) => {
  if (!isNil(ctx.senderChat)) {
    return {
      sender: pick(ctx.senderChat, ["id", "type"]),
    };
  }

  if (!isNil(ctx.from)) {
    return {
      sender: pick(ctx.from, ["id"]),
    };
  }

  return {};
};

export const getMetadata = (ctx: Context) => ({
  message_id: ctx.msg?.message_id,
  ...getChatInfo(ctx),
  ...getSenderInfo(ctx),
});

export const getFullMetadata = (ctx: Context) => ({
  ...ctx.update,
});

export const logHandle =
  (id: string): Middleware<Context> =>
  (ctx, next) => {
    updateHandledCounter.inc({
      from_id: ctx.from?.id,
      chat_id: ctx.chat?.id,
      handler_id: id,
    });

    ctx.logger.info({
      msg: `handle ${id}`,
      ...(id === "unhandled" ? getFullMetadata(ctx) : getMetadata(ctx)),
    });

    return next();
  };
