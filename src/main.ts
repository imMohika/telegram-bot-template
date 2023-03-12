#!/usr/bin/env tsx
import "reflect-metadata";
import { RedisAdapter } from "@grammyjs/storage-redis";
import Redis from "ioredis";
import { createBot } from "~/bot";
import { container } from "~/container";
import { createServer } from "~/server";
import { initializeDatabase } from "./bot/database";
import { userRepository } from "./bot/repositories/user.repository";

async function main() {
  const { config, logger } = container.items;

  await initializeDatabase();

  const bot = createBot(config.BOT_TOKEN, {
    container,
    sessionStorage: new RedisAdapter({
      instance: new Redis(config.REDIS_URL),
    }),
  });
  await bot.init();

  const server = await createServer(bot, container);

  // update bot owner role
  await userRepository.upsert(
    {
      where: {
        telegramId: config.BOT_ADMIN_USER_ID,
      },
    },
    {
      telegramId: config.BOT_ADMIN_USER_ID,
      role: "owner",
    }
  );

  if (config.isProd) {
    await server.listen({
      host: config.BOT_SERVER_HOST,
      port: config.BOT_SERVER_PORT,
    });

    await bot.api.setWebhook(config.BOT_WEBHOOK, {
      allowed_updates: config.BOT_ALLOWED_UPDATES,
    });
  } else if (config.isDev) {
    await bot.start({
      allowed_updates: config.BOT_ALLOWED_UPDATES,
      onStart: ({ username }) =>
        logger.info({
          msg: "bot running...",
          username,
        }),
    });
  }
}

main().catch((err) => {
  container.items.logger.error(err);
  process.exit(1);
});
