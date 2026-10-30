import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import * as Slot from "@radix-ui/react-slot"

const buttonVariants = cva(
  "inline-flex min-h-11 min-w-11 shrink-0 items-center justify-center gap-2 rounded-plate text-label pressable disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      variant: {
        default: "border border-ink bg-plate text-plate-ink hover:bg-slab hover:text-ink active:text-ink",
        outline: "border border-rule bg-ground text-ink hover:bg-slab",
        ghost: "text-ink hover:bg-slab",
      },
      size: {
        default: "px-4 py-3",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
