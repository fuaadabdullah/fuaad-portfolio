import { execSync } from "node:child_process";

export type GitActivity = {
  subject: string;
  committedAt: string;
  relativeTime: string;
};

function formatRelativeTime(dateString: string) {
  const committed = new Date(dateString);
  if (Number.isNaN(committed.getTime())) {
    return null;
  }

  const now = new Date();
  const diffMs = committed.getTime() - now.getTime();
  const minutes = Math.round(diffMs / (1000 * 60));
  const hours = Math.round(diffMs / (1000 * 60 * 60));
  const days = Math.round(diffMs / (1000 * 60 * 60 * 24));
  const weeks = Math.round(diffMs / (1000 * 60 * 60 * 24 * 7));
  const months = Math.round(diffMs / (1000 * 60 * 60 * 24 * 30));
  const years = Math.round(diffMs / (1000 * 60 * 60 * 24 * 365));
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  if (Math.abs(minutes) < 60) return rtf.format(minutes, "minute");
  if (Math.abs(hours) < 24) return rtf.format(hours, "hour");
  if (Math.abs(days) < 7) return rtf.format(days, "day");
  if (Math.abs(weeks) < 5) return rtf.format(weeks, "week");
  if (Math.abs(months) < 12) return rtf.format(months, "month");
  return rtf.format(years, "year");
}

export function getLatestGitActivity(): GitActivity | null {
  try {
    const output = execSync("git log -1 --format=%cs%n%cr%n%s", {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();

    if (!output) {
      return null;
    }

    const [committedAt, fallbackRelativeTime, subject] = output.split("\n");
    if (!committedAt || !subject) {
      return null;
    }

    return {
      subject,
      committedAt,
      relativeTime: formatRelativeTime(committedAt) ?? fallbackRelativeTime ?? "Recently",
    };
  } catch {
    return null;
  }
}
