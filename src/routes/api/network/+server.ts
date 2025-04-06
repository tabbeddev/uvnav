import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import network from "../../../network";

export const GET: RequestHandler = async () => {
  return json(network);
};
