import { findAllRoutes } from "$lib/route";
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params }) => {
  const { from, to } = params;
  return json(findAllRoutes(from, to));
};
