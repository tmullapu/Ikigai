import { Compass, Leaf, Sparkles, type LucideIcon } from 'lucide-react'

export type PersonaId = 'elder' | 'kid' | 'wanderer'

export type Persona = {
  id: PersonaId
  name: string
  /** Short line shown beside the name and as the panel subtitle. */
  subtitle: string
  /** Headline call-to-action on the illustrated panel. */
  cta: string
  /** Longer descriptive paragraph on the panel. */
  intro: string
  icon: LucideIcon
  /** Illustrated scene for the left panel. */
  scene: string
  sceneAlt: string
  /** object-position/scale for the panel image. */
  panelImageClass: string
  /** object-position/scale for the small round avatar. */
  avatarImageClass: string
  /** First message the persona greets you with. */
  greeting: string
  suggestions: string[]
  disclaimer: string
  errorNote: string
  /** Bottom wash color over the panel painting (keeps text legible). */
  panelWashFrom: string
  panelWashTo: string
  /** Inline gradient for the chat-side sky. */
  chatBackground: string
  /** Soft out-of-focus light orbs for this season. */
  bokeh: string[]
  /** CSS variable overrides applied to the whole world for this season. */
  theme: Record<string, string>
}

export const PERSONAS: Record<PersonaId, Persona> = {
  elder: {
    id: 'elder',
    name: 'The Elder',
    subtitle: 'here with you, unhurried',
    cta: 'Sit a while with the Elder',
    intro:
      'A quiet companion for reflection. Share what rests on your heart, and let the conversation drift like clouds across an autumn sky.',
    icon: Leaf,
    scene: '/images/elder-scene.png',
    sceneAlt:
      'The Elder, a gentle bearded figure in an amber robe, sitting peacefully among soft autumn clouds',
    panelImageClass: 'object-cover object-top',
    avatarImageClass: 'scale-[1.6] object-cover object-top',
    greeting:
      'Welcome, friend. The kettle is warm and there is no hurry here. Tell me — what is on your heart this autumn morning?',
    suggestions: [
      'I feel a little lost lately.',
      'What gives a life meaning?',
      'Help me slow down today.',
    ],
    disclaimer: 'The Elder offers gentle reflection, not professional advice.',
    errorNote:
      'The Elder grew quiet for a moment — the connection wavered like a breeze. Please try again shortly.',
    panelWashFrom: 'oklch(0.62 0.13 55 / 0.55)',
    panelWashTo: 'oklch(0.85 0.08 85 / 0.25)',
    chatBackground:
      'radial-gradient(120% 90% at -5% 25%, oklch(0.86 0.1 62 / 0.85), transparent 55%),' +
      'radial-gradient(110% 80% at 110% 0%, oklch(0.92 0.07 88 / 0.7), transparent 55%),' +
      'linear-gradient(170deg, oklch(0.95 0.04 82) 0%, oklch(0.91 0.06 70) 45%, oklch(0.87 0.08 58) 100%)',
    bokeh: [
      'oklch(0.86 0.1 75 / 0.45)',
      'oklch(0.82 0.12 55 / 0.4)',
      'oklch(0.9 0.09 85 / 0.5)',
      'oklch(0.84 0.11 65 / 0.4)',
      'oklch(0.92 0.08 90 / 0.5)',
    ],
    theme: {
      '--background': 'oklch(0.97 0.022 78)',
      '--foreground': 'oklch(0.36 0.045 55)',
      '--card': 'oklch(0.985 0.015 80)',
      '--card-foreground': 'oklch(0.36 0.045 55)',
      '--primary': 'oklch(0.74 0.12 65)',
      '--primary-foreground': 'oklch(0.99 0.01 80)',
      '--secondary': 'oklch(0.93 0.03 82)',
      '--secondary-foreground': 'oklch(0.42 0.05 55)',
      '--muted': 'oklch(0.94 0.025 82)',
      '--muted-foreground': 'oklch(0.56 0.04 60)',
      '--accent': 'oklch(0.88 0.05 45)',
      '--accent-foreground': 'oklch(0.4 0.06 40)',
      '--border': 'oklch(0.88 0.03 75)',
      '--input': 'oklch(0.9 0.025 78)',
      '--ring': 'oklch(0.74 0.12 65)',
    },
  },

  kid: {
    id: 'kid',
    name: 'The Kid',
    subtitle: 'here to build things with you, fearlessly',
    cta: 'Play a while with the Kid',
    intro:
      'A bright spark of curiosity and courage. Dream out loud, start before you feel ready, and let’s build something wonderful together.',
    icon: Sparkles,
    scene: '/images/kid-scene.png',
    sceneAlt:
      'The Kid, an enthusiastic young child with arms raised joyfully among blooming cherry blossoms in a bright spring sky',
    panelImageClass: 'object-cover object-top',
    avatarImageClass: 'scale-[1.15] object-cover object-top',
    greeting:
      'Hi hi! I’m so happy you’re here! What should we make today — a story, a plan, a wild idea? Let’s build it together, no fear!',
    suggestions: [
      'Help me start something new!',
      'I have a big idea...',
      'Let’s make a plan together!',
    ],
    disclaimer: 'The Kid loves big ideas — double-check the important stuff!',
    errorNote:
      'Oops! The Kid got distracted chasing a butterfly. Try sending that again!',
    panelWashFrom: 'oklch(0.72 0.12 350 / 0.5)',
    panelWashTo: 'oklch(0.9 0.06 150 / 0.2)',
    chatBackground:
      'radial-gradient(120% 90% at -5% 20%, oklch(0.9 0.07 350 / 0.8), transparent 55%),' +
      'radial-gradient(110% 80% at 110% 5%, oklch(0.92 0.06 150 / 0.6), transparent 55%),' +
      'linear-gradient(170deg, oklch(0.975 0.025 350) 0%, oklch(0.95 0.04 340) 50%, oklch(0.94 0.05 350) 100%)',
    bokeh: [
      'oklch(0.88 0.08 350 / 0.5)',
      'oklch(0.9 0.07 150 / 0.45)',
      'oklch(0.95 0.04 340 / 0.55)',
      'oklch(0.86 0.09 10 / 0.4)',
      'oklch(0.92 0.06 160 / 0.5)',
    ],
    theme: {
      '--background': 'oklch(0.975 0.02 350)',
      '--foreground': 'oklch(0.42 0.06 10)',
      '--card': 'oklch(0.99 0.012 350)',
      '--card-foreground': 'oklch(0.42 0.06 10)',
      '--primary': 'oklch(0.76 0.11 350)',
      '--primary-foreground': 'oklch(0.99 0.01 350)',
      '--secondary': 'oklch(0.93 0.045 150)',
      '--secondary-foreground': 'oklch(0.42 0.06 150)',
      '--muted': 'oklch(0.95 0.03 345)',
      '--muted-foreground': 'oklch(0.56 0.05 10)',
      '--accent': 'oklch(0.85 0.08 150)',
      '--accent-foreground': 'oklch(0.4 0.07 150)',
      '--border': 'oklch(0.9 0.03 350)',
      '--input': 'oklch(0.92 0.025 350)',
      '--ring': 'oklch(0.76 0.11 350)',
    },
  },

  wanderer: {
    id: 'wanderer',
    name: 'The Wanderer',
    subtitle: 'here to ask questions alongside you',
    cta: 'Walk a while with the Wanderer',
    intro:
      'A curious traveler who walks beside you toward the horizon. Bring your questions, and let’s explore them together as the sun sinks low.',
    icon: Compass,
    scene: '/images/wanderer-scene.png',
    sceneAlt:
      'The Wanderer, a cloaked traveler with a staff, walking a winding path toward a golden summer sunset',
    panelImageClass: 'object-cover object-center',
    avatarImageClass: 'scale-[1.2] object-cover object-center',
    greeting:
      'Well met, traveler. The road is long and good questions make fine company. Where shall we wander today — what are you trying to understand?',
    suggestions: [
      'I have a question...',
      'Help me think this through.',
      'What should I explore next?',
    ],
    disclaimer: 'The Wanderer explores ideas with you — not a substitute for an expert.',
    errorNote:
      'The Wanderer paused at a fork in the road — the path went quiet. Try again in a moment.',
    panelWashFrom: 'oklch(0.5 0.13 50 / 0.6)',
    panelWashTo: 'oklch(0.8 0.12 70 / 0.2)',
    chatBackground:
      'radial-gradient(120% 90% at -5% 30%, oklch(0.82 0.13 55 / 0.85), transparent 55%),' +
      'radial-gradient(120% 90% at 105% 110%, oklch(0.72 0.15 40 / 0.55), transparent 55%),' +
      'linear-gradient(170deg, oklch(0.95 0.05 82) 0%, oklch(0.9 0.08 62) 45%, oklch(0.84 0.11 50) 100%)',
    bokeh: [
      'oklch(0.86 0.12 65 / 0.45)',
      'oklch(0.78 0.14 45 / 0.42)',
      'oklch(0.9 0.09 80 / 0.5)',
      'oklch(0.74 0.15 38 / 0.4)',
      'oklch(0.88 0.11 70 / 0.48)',
    ],
    theme: {
      '--background': 'oklch(0.96 0.04 75)',
      '--foreground': 'oklch(0.38 0.06 50)',
      '--card': 'oklch(0.98 0.025 76)',
      '--card-foreground': 'oklch(0.38 0.06 50)',
      '--primary': 'oklch(0.69 0.14 52)',
      '--primary-foreground': 'oklch(0.99 0.01 80)',
      '--secondary': 'oklch(0.91 0.06 70)',
      '--secondary-foreground': 'oklch(0.42 0.06 50)',
      '--muted': 'oklch(0.93 0.05 72)',
      '--muted-foreground': 'oklch(0.54 0.06 55)',
      '--accent': 'oklch(0.78 0.12 45)',
      '--accent-foreground': 'oklch(0.4 0.07 40)',
      '--border': 'oklch(0.86 0.05 68)',
      '--input': 'oklch(0.89 0.045 70)',
      '--ring': 'oklch(0.69 0.14 52)',
    },
  },
}

export const PERSONA_ORDER: PersonaId[] = ['elder', 'kid', 'wanderer']
