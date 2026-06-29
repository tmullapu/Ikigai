import Image from 'next/image'
import type { Persona } from '@/lib/personas'
import { DriftingClouds } from './drifting-clouds'

export function PersonaPanel({ persona }: { persona: Persona }) {
  return (
    <aside className="relative isolate hidden overflow-hidden lg:flex lg:w-[42%] xl:w-[40%]">
      {/* Painterly scene for the active persona's season */}
      <Image
        key={persona.scene}
        src={persona.scene || '/placeholder.svg'}
        alt={persona.sceneAlt}
        fill
        priority
        sizes="42vw"
        className={`animate-rise ${persona.panelImageClass}`}
      />

      {/* Animated clouds / petals drifting over the painting */}
      <DriftingClouds className="mix-blend-soft-light opacity-70" />

      {/* Seasonal wash so the painting blends and text stays legible */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `linear-gradient(to top, ${persona.panelWashFrom}, transparent 55%, ${persona.panelWashTo})`,
        }}
      />

      {/* Intro text resting at the bottom of the scene */}
      <div className="relative z-10 mt-auto flex flex-col gap-3 p-10 xl:p-12">
        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-card/90">
          生き甲斐 · Ikigai
        </span>
        <h1 className="text-pretty font-heading text-4xl font-semibold leading-tight text-card xl:text-5xl">
          {persona.cta}
        </h1>
        <p className="max-w-sm text-pretty leading-relaxed text-card/90">
          {persona.intro}
        </p>
      </div>
    </aside>
  )
}
