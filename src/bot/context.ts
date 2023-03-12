import { type Update, type UserFromGetMe } from "@grammyjs/types";
import {
  Context as DefaultContext,
  type SessionFlavor,
  type Api,
} from "grammy";
import { type AutoChatActionFlavor } from "@grammyjs/auto-chat-action";
import { type HydrateFlavor } from "@grammyjs/hydrate";
import { type I18nFlavor } from "@grammyjs/i18n";
import { type ParseModeFlavor } from "@grammyjs/parse-mode";
import { type UserEntity } from "./entities/user.entity";
import { type Logger } from "~/logger";
import { type Container } from "~/container";

export interface ContextScope {
  user?: UserEntity;
}

type ExtendedContextFlavor = {
  container: Container;
  // TODO: add database
  logger: Logger;
  scope: ContextScope;
  updateScope: (newScope: ContextScope) => void;
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

export const createContextConstructor = (container: Container) =>
  class extends DefaultContext implements ExtendedContextFlavor {
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

    updateScope(newScope: ContextScope) {
      this.scope = newScope;
    }
  } as unknown as new (update: Update, api: Api, me: UserFromGetMe) => Context;
