"use client";

import { $path } from "next-typesafe-url";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link
        href={$path({
          route: "/",
          searchParams: {
            tictactoe: [
              ["_", "_", "_"],
              ["_", "_", "_"],
              ["_", "_", "_"],
            ],
          },
        })}
        className="text-5xl font-extrabold"
      >
        CLICK TO GO TO TICTACTOE
      </Link>
    </div>
  );
}
