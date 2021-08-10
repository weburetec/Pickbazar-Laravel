import { useTranslation } from "next-i18next";

export function formatString(count: number | null | undefined, string: string) {
  if (!count) return `${count} ${string}`;
  return count > 1 ? `${count} ${string}s` : `${count} ${string}`;
  // const { t } = useTranslation();

  // if (!count) return `${count} ${t(string)}`;
  // return count > 1 ? `${count} ${t(string)}s` : `${count} ${t(string)}`;
}
