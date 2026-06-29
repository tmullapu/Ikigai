'use client'

import { useState } from 'react'
import { IkigaiChat } from '@/components/ikigai-chat'
import { PersonaPanel } from '@/components/persona-panel'
import { PersonaSwitcher } from '@/components/persona-switcher'
import { PERSONAS, type PersonaId } from '@/lib/personas'

export default function Page() {
  const [personaId, setPersonaId] = useState<PersonaId>('elder')
  const persona = PERSONAS[personaId]

  return (
    <div
      className="relative flex min-h-svh w-full bg-background transition-colors duration-700"
      style={persona.theme as React.CSSProperties}
    >
      <PersonaPanel persona={persona} />

      {/* Remount the chat per persona so the conversation begins fresh */}
      <IkigaiChat key={persona.id} persona={persona} />

      {/* Choose a companion */}
      <div className="absolute right-4 top-4 z-20 md:right-8 md:top-6">
        <PersonaSwitcher active={personaId} onChange={setPersonaId} />
      </div>
    </div>
  )
}
