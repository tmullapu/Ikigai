import Image from 'next/image'
import { cn } from '@/lib/utils'

function Avatar({
  src,
  imageClass,
  name,
}: {
  src: string
  imageClass: string
  name: string
}) {
  return (
    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-border bg-secondary shadow-sm">
      <Image
        src={src || '/placeholder.svg'}
        alt={name}
        fill
        sizes="40px"
        className={imageClass}
      />
    </div>
  )
}

export function ChatBubble({
  role,
  children,
  avatarSrc,
  avatarImageClass,
  personaName,
}: {
  role: 'user' | 'assistant'
  children: React.ReactNode
  avatarSrc: string
  avatarImageClass: string
  personaName: string
}) {
  const isCompanion = role === 'assistant'

  return (
    <div
      className={cn(
        'flex animate-rise items-end gap-3',
        isCompanion ? 'justify-start' : 'justify-end',
      )}
    >
      {isCompanion && (
        <Avatar src={avatarSrc} imageClass={avatarImageClass} name={personaName} />
      )}
      <div
        className={cn(
          'max-w-[78%] text-pretty px-5 py-3.5 leading-relaxed shadow-sm md:max-w-[70%]',
          isCompanion
            ? 'rounded-[1.4rem] rounded-bl-md bg-card text-card-foreground'
            : 'rounded-[1.4rem] rounded-br-md bg-primary text-primary-foreground',
        )}
      >
        {children}
      </div>
    </div>
  )
}

export function ThinkingBubble({
  avatarSrc,
  avatarImageClass,
  personaName,
}: {
  avatarSrc: string
  avatarImageClass: string
  personaName: string
}) {
  return (
    <div className="flex animate-rise items-end gap-3">
      <Avatar src={avatarSrc} imageClass={avatarImageClass} name={personaName} />
      <div className="flex items-center gap-1.5 rounded-[1.4rem] rounded-bl-md bg-card px-5 py-4 shadow-sm">
        <span className="h-2 w-2 animate-float rounded-full bg-muted-foreground/60" />
        <span className="h-2 w-2 animate-float rounded-full bg-muted-foreground/60 [animation-delay:0.2s]" />
        <span className="h-2 w-2 animate-float rounded-full bg-muted-foreground/60 [animation-delay:0.4s]" />
      </div>
    </div>
  )
}
