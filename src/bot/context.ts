import { Update, UserFromGetMe } from "@grammyjs/types";
import { Context as DefaultContext, SessionFlavor, type Api } from "grammy";
import type { Container } from "~/container";
import { Logger } from "~/logger";

import { AutoChatActionFlavor } from "@grammyjs/auto-chat-action";
import { HydrateFlavor } from "@grammyjs/hydrate";
import { I18nFlavor } from "@grammyjs/i18n";
import { ParseModeFlavor } from "@grammyjs/parse-mode";
import { UserEntity } from "./entities/user.entity";

export interface ContextScope {
  user?: UserEntity;
}

type ExtendedContextFlavor = {
  container: Container;
  // TODO: add database
  logger: Logger;
  scope: ContextScope;
};

export type ContextScopeWith<P extends keyof ContextScope> = Record<
  "scope",
  Record<P, NonNullable<ContextScope[P]>>
>;

type SessionData = {
  // field?: string;
};

export type Context = ParseModeFlavor<
  HydrateFlavor<
    DefaultContext &
      ExtendedContextFlavor &
      SessionFlavor<SessionData> &
      I18nFlavor &
      AutoChatActionFlavor
  >
>;

export function createContextConstructor(container: Container) {
  return class extends DefaultContext implements ExtendedContextFlavor {
    container: Container;

    logger: Logger;

    scope: ContextScope;

    constructor(update: Update, api: Api, me: UserFromGetMe) {
      super(update, api, me);

      this.container = container;
      this.logger = container.items.logger.child({
        update_id: this.update.update_id,
      });
      this.scope = {};
    }
  } as unknown as new (update: Update, api: Api, me: UserFromGetMe) => Context;
}
