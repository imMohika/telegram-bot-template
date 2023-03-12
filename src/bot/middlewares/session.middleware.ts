import { type Middleware, session as createSession, type StorageAdapter } from "grammy";
import  { type Context } from "~/bot/context";

export const session = (
  storage: StorageAdapter<unknown>
): Middleware<Context> =>
  createSession({
    initial: () => ({}),
    storage,
  });
