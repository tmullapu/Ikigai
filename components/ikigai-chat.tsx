'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport, type UIMessage } from 'ai'
import { ArrowUp } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import type { Persona, PersonaId } from '@/lib/personas'
import { ChatBubble, ThinkingBubble } from './chat-bubble'
import { DriftingClouds } from './drifting-clouds'
import { SeasonBokeh } from './season-bokeh'

function messageText(message: UIMessage) {
  return (
    message.parts
      ?.filter((p): p is { type: 'text'; text: string } => p.type === 'text')
      .map((p) => p.text)
      .join('') ?? ''
  )
}

export function IkigaiChat({
  persona,
  onPersonaChange,
}: {
  persona: Persona
  onPersonaChange: (id: PersonaId) => void
}) {
  const greeting: UIMessage = {
    id: `${persona.id}-greeting`,
    role: 'assistant',
    parts: [{ type: 'text', text: persona.greeting }],
  }

  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
      prepareSendMessagesRequest: ({ messages }) => ({
        body: { messages, persona: persona.id },
      }),
    }),
    messages: [greeting],
    onResponse: async (response) => {
      try {
        const cloned = response.clone()
        const data = await cloned.json()
        if (data.persona && data.persona !== persona.id) {
          onPersonaChange(data.persona as PersonaId)
        }
      } catch {
        // ignore parse errors
      }
    },
  })

  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)

  const isBusy = status === 'submitted' || status === 'streaming'
  const showThinking =
    status === 'submitted' ||
    (status === 'streaming' &&
      messages[messages.length - 1]?.role !== 'assistant')

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages, showThinking])

  function submit(text: string) {
    const trimmed = text.trim()
    if (!trimmed || isBusy) return
    sendMessage({ text: trimmed })
    setInput('')
  }

  const onlyGreeting = messages.length <= 1
  const Icon = persona.icon
  const avatarProps = {
    avatarSrc: persona.scene,
    avatarImageClass: persona.avatarImageClass,
    personaName: persona.name,
  }

  return (
    <main className="relative isolate flex min-h-svh flex-1 flex-col overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 transition-[background] duration-700"
        style={{ background: persona.chatBackground }}
      />
      <SeasonBokeh colors={persona.bokeh} />
      <DriftingClouds className="opacity-40" />

      <header className="relative z-10 flex items-center gap-3 px-6 py-5 md:px-10">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </span>
        <div className="leading-tight">
          <p className="font-heading text-lg font-semibold text-foreground">
            {persona.name}
          </p>
          <p className="text-sm text-muted-foreground">{persona.subtitle}</p>
        </div>
      </header>

      <div
        ref={scrollRef}
        className="relative z-10 flex-1 overflow-y-auto scroll-smooth px-4 pb-4 md:px-10"
      >
        <div className="mx-auto flex max-w-2xl flex-col gap-5 py-4">
          {messages.map((message) => (
            <ChatBubble
              key={message.id}
              role={message.role as 'user' | 'assistant'}
              {...avatarProps}
            >
              {messageText(message)}
            </ChatBubble>
          ))}
          {showThinking && <ThinkingBubble {...avatarProps} />}
          {error && (
            <div className="mx-auto max-w-md rounded-2xl border border-border bg-card/70 px-4 py-3 text-center text-sm text-muted-foreground shadow-sm backdrop-blur">
              {persona.errorNote}
            </div>
          )}
        </div>
      </div>

      <div className="relative z-10 px-4 pb-6 md:px-10">
        <div className="mx-auto w-full max-w-2xl">
          {onlyGreeting && (
            <div className="mb-3 flex flex-wrap gap-2">
              {persona.suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => submit(s)}
                  className="rounded-full border border-border bg-card/70 px-4 py-2 text-sm text-muted-foreground shadow-sm backdrop-blur transition-colors hover:bg-card hover:text-foreground"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault()
              submit(input)
            }}
            className="flex items-end gap-2 rounded-[1.8rem] border border-border bg-card/80 p-2 pl-5 shadow-md backdrop-blur-md transition-shadow focus-within:shadow-lg"
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  submit(input)
                }
              }}
              rows={1}
              placeholder={`Share a thought with ${persona.name}…`}
              aria-label={`Message ${persona.name}`}
              className="max-h-36 flex-1 resize-none self-center bg-transparent py-2.5 text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
            />
            <button
              type="submit"
              disabled={!input.trim() || isBusy}
              aria-label="Send message"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
            >
              <ArrowUp className="h-5 w-5" aria-hidden="true" />
            </button>
          </form>
          <p className="mt-3 text-center text-xs text-muted-foreground/80">
            {persona.disclaimer}
          </p>
        </div>
      </div>
    </main>
  )
}