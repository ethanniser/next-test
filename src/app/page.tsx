"use client";

import { $path } from "next-typesafe-url";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link
        href={$path({
          route: "/tictactoe",
          searchParams: {
            tictactoe: [
              ["_", "_", "_"],
              ["_", "_", "_"],
              ["_", "_", "_"],
            ],
          },
        })}
      >
        TICTACTOE
      </Link>
    </div>
  );
}
