import { Middleware } from "grammy";
import type { Context } from "~/bot/context";
import { userRepository } from "../repositories/user.repository";

export const setScope = (): Middleware<Context> => async (ctx, next) => {
  if (ctx.from?.is_bot === false) {
    const {
      id: telegramId,
      language_code: languageCode,
      first_name: firstName,
      last_name: lastName,
      username,
    } = ctx.from;

    ctx.scope.user = await userRepository.upsert(
      {
        where: {
          telegramId: telegramId.toString(),
        },
      },
      {
        telegramId: telegramId.toString(),
        languageCode,
        username,
        name: `${firstName ?? ""} ${lastName ?? ""}`.trim(),
      }
    );
  }

  return next();
};
