import { z } from "zod";

export const stringToNumber = z.string().transform((val, ctx) => {
    const numberValue = Number(val);
    if (isNaN(numberValue)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Invalid number",
      });
      return z.NEVER;
    }
    return numberValue;
});

export function getDateNow() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}