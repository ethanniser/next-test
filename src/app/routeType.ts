import { DynamicRoute } from "next-typesafe-url";
import { z } from "zod";

export const Route = {
  searchParams: z.object({
    id: z.string(),
  }),
} satisfies DynamicRoute;
export type RouteType = typeof Route;
