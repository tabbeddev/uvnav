export function convTicksToTime(t: number): string {
	const d = new Date(t * 3600 + 18000000);
	return d.toLocaleTimeString(undefined, {
		hour: "2-digit",
		minute: "2-digit",
	});
}
