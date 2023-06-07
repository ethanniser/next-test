"use client";

import { $path } from "next-typesafe-url";
import type { AppRouter } from "next-typesafe-url";
import Link from "next/link";

type test = AppRouter["/"]["searchParams"];

export default function FooPage() {
  return (
    <Link href={$path({ route: "/[id]", routeParams: { id: { id: "JO" } } })}>
      Link
    </Link>
  );
}
