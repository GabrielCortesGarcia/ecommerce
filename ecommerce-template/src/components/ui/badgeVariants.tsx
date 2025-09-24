import { cva, type VariantProps } from "class-variance-authority";

export const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 ...",
  {
    variants: {
      variant: {
        default: "...",
        secondary: "...",
        destructive: "...",
        outline: "...",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type BadgeVariants = VariantProps<typeof badgeVariants>;
