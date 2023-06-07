import { DynamicRoute } from "next-typesafe-url";
import { z } from "zod";

export const Route = {
  routeParams: z.object({
    id: z.object({
      id: z.string(),
    }),
  }),
} satisfies DynamicRoute;
export type RouteType = typeof Route;
