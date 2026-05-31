import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({
  className,
  ...props
}) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-20 w-full rounded-xl border border-stone-200 bg-stone-50/50 px-3.5 py-2.5 text-sm text-stone-900 transition-all outline-none placeholder:text-stone-450 focus-visible:bg-white focus-visible:border-stone-900 focus-visible:ring-4 focus-visible:ring-stone-950/5 disabled:cursor-not-allowed disabled:bg-stone-100 disabled:opacity-50 aria-invalid:border-brand aria-invalid:ring-4 aria-invalid:ring-brand/10",
        className
      )}
      {...props} />
  );
}

export { Textarea }
