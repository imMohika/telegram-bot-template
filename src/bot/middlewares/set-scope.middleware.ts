import { type NextFunction } from "grammy";
import { userRepository } from "../repositories/user.repository";
import { type Context } from "~/bot/context";

export const setScope = async (ctx: Context, next: NextFunction) => {
  if (ctx.from?.is_bot === false) {
    const {
      id: telegramId,
      language_code: languageCode,
      first_name: firstName,
      last_name: lastName,
      username,
    } = ctx.from;

    const user = await userRepository.upsert(
      {
        where: {
          telegramId: telegramId.toString(),
        },
      },
      {
        telegramId: telegramId.toString(),
        languageCode,
        username,
        name: `${firstName} ${lastName ?? ""}`.trim(),
      }
    );

    ctx.updateScope({ user });
  }

  await next();
};
