export function secondStringify(e: number): string {
	if (e === 0) return "Instant"
  const t = Math.floor(e / 60),
    n = e % 60;
  let o;
  return (
    (o = 1 == t ? "1 minute" : Math.round(t) + " minutes"),
    n > 0
      ? 1 == n
        ? o + " 1 second"
        : o + " " + Math.round(n) + " seconds"
      : o
  );
}
