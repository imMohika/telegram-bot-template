import { type Context, type ContextScopeWith } from "~/bot/context";

export const isOwnerUser = <C extends Context>(
  ctx: C
): ctx is C & ContextScopeWith<"user"> => ctx.scope.user?.role === "owner";
