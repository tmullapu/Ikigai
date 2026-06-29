import { cn } from '@/lib/utils'

type Dot = {
  className: string
  size: number
  blur: number
}

/* Soft out-of-focus orbs of light. Layout is fixed; colors come from the
   active persona's season palette so the mood shifts with the companion. */
const DOTS: Dot[] = [
  { className: 'left-[6%] top-[14%] animate-float', size: 150, blur: 28 },
  { className: 'left-[24%] top-[68%] animate-float [animation-delay:-2s]', size: 90, blur: 20 },
  { className: 'left-[48%] top-[20%] animate-float [animation-delay:-4s]', size: 60, blur: 14 },
  { className: 'right-[10%] top-[30%] animate-float [animation-delay:-1s]', size: 180, blur: 34 },
  { className: 'right-[20%] top-[78%] animate-float [animation-delay:-5s]', size: 110, blur: 24 },
  { className: 'left-[70%] top-[8%] animate-float [animation-delay:-3s]', size: 70, blur: 16 },
  { className: 'left-[14%] top-[40%] animate-float [animation-delay:-6s]', size: 44, blur: 10 },
  { className: 'right-[6%] bottom-[12%] animate-float [animation-delay:-2.5s]', size: 130, blur: 30 },
]

export function SeasonBokeh({
  colors,
  className,
}: {
  colors: string[]
  className?: string
}) {
  return (
    <div
      aria-hidden="true"
      className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}
    >
      {DOTS.map((dot, i) => (
        <span
          key={i}
          className={cn('absolute rounded-full', dot.className)}
          style={{
            width: dot.size,
            height: dot.size,
            background: `radial-gradient(closest-side, ${colors[i % colors.length]}, transparent 72%)`,
            filter: `blur(${dot.blur}px)`,
          }}
        />
      ))}
    </div>
  )
}
