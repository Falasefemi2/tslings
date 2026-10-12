const noColor =
  !!process.env.NO_COLOR || process.env.TERM === "dumb" || !(process.stdout as unknown as { isTTY?: boolean }).isTTY;

function paint(code: string, s: string): string {
  return noColor ? s : `\x1b[${code}m${s}\x1b[0m`;
}

export const red = (s: string): string => paint("31", s);
export const green = (s: string): string => paint("32", s);
export const yellow = (s: string): string => paint("33", s);
export const cyan = (s: string): string => paint("36", s);
export const bold = (s: string): string => paint("1", s);
export const dim = (s: string): string => paint("2", s);

export function progressBar(done: number, total: number, width = 24): string {
  const ratio = total <= 0 ? 1 : Math.min(1, Math.max(0, done / total));
  const filled = Math.round(ratio * width);
  return `[${"#".repeat(filled)}${"-".repeat(width - filled)}] ${done}/${total}`;
}

export function pad(n: number, width = 3): string {
  return String(n).padStart(width, "0");
}
