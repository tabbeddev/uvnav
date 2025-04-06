import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { getUpdate } from "$lib/dynmapUpdateCracker";
import { error } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
	try {
		return json(await getUpdate());
	} catch {
		return error(500, "Failed to get update");
	}
};
