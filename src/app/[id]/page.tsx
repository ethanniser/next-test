"use client";

import { useRouteParams } from "next-typesafe-url/app";
import { Route } from "./routeType";

export default function FooPage() {
  const { data, error } = useRouteParams(Route.routeParams);

  return (
    <div>
      <p>data: {JSON.stringify(data)}</p>
      <p>error: {JSON.stringify(error)}</p>
    </div>
  );
}
