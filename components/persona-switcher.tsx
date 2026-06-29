'use client'

import Image from 'next/image'
import { PERSONA_ORDER, PERSONAS, type PersonaId } from '@/lib/personas'
import { cn } from '@/lib/utils'

export function PersonaSwitcher({
  active,
  onChange,
}: {
  active: PersonaId
  onChange: (id: PersonaId) => void
}) {
  return (
    <div
      role="tablist"
      aria-label="Choose a companion"
      className="flex items-center gap-1.5 rounded-full border border-border bg-card/70 p-1.5 shadow-sm backdrop-blur-md"
    >
      {PERSONA_ORDER.map((id) => {
        const persona = PERSONAS[id]
        const isActive = id === active
        return (
          <button
            key={id}
            role="tab"
            aria-selected={isActive}
            title={persona.name}
            onClick={() => onChange(id)}
            className={cn(
              'group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full transition-transform hover:scale-105',
              isActive
                ? 'ring-2 ring-primary ring-offset-2 ring-offset-card'
                : 'opacity-70 hover:opacity-100',
            )}
          >
            <span className="sr-only">{persona.name}</span>
            <Image
              src={persona.scene || '/placeholder.svg'}
              alt=""
              fill
              sizes="40px"
              className={persona.avatarImageClass}
            />
          </button>
        )
      })}
    </div>
  )
}
