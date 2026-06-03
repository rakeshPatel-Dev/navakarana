import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({
  className,
  ...props
}) {
  return (
    <textarea
      data-slot="textarea"
      className={cn( "flex min-h-20 w-full rounded-xl border border-input bg-muted/50 px-3.5 py-2.5 text-sm text-foreground transition-all outline-none placeholder:text-muted-foreground focus-visible:bg-background focus-visible:border-foreground focus-visible:ring-4 focus-visible:ring-ring/5 disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-50 aria-invalid:border-brand aria-invalid:ring-4 aria-invalid:ring-brand/10",
        className
      )}
      {...props} />
  );
}

export { Textarea }
