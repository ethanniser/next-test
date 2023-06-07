import { type DynamicRoute } from "next-typesafe-url";
import { z } from "zod";

export const Route = {
  searchParams: z.object({
    tictactoe: z
      .tuple([
        z.tuple([
          z.enum(["_", "X", "O"]),
          z.enum(["_", "X", "O"]),
          z.enum(["_", "X", "O"]),
        ]),
        z.tuple([
          z.enum(["_", "X", "O"]),
          z.enum(["_", "X", "O"]),
          z.enum(["_", "X", "O"]),
        ]),
        z.tuple([
          z.enum(["_", "X", "O"]),
          z.enum(["_", "X", "O"]),
          z.enum(["_", "X", "O"]),
        ]),
      ])
      .optional(),
  }),
} satisfies DynamicRoute;
export type RouteType = typeof Route;
