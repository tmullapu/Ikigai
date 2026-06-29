import { cn } from '@/lib/utils'

function Cloud({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn('absolute h-40 w-80', className)}
      style={{
        background:
          'radial-gradient(closest-side, oklch(0.99 0.02 85 / 0.9), oklch(0.99 0.02 85 / 0) 70%)',
      }}
    />
  )
}

/**
 * A soft layer of pastel clouds that drift slowly across the sky.
 * Built from radial gradients (not blur) so they render cleanly.
 * Purely decorative.
 */
export function DriftingClouds({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute inset-0 overflow-hidden',
        className,
      )}
    >
      <Cloud className="top-[8%] animate-drift-slow" />
      <Cloud className="top-[30%] scale-75 animate-drift-med [animation-delay:-14s]" />
      <Cloud className="top-[55%] scale-110 animate-drift-fast [animation-delay:-24s]" />
      <Cloud className="top-[78%] scale-50 animate-drift-slow [animation-delay:-32s]" />
    </div>
  )
}
