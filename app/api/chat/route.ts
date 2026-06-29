import Groq from 'groq-sdk'
import { NextResponse } from 'next/server'
import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, PutCommand, QueryCommand } from '@aws-sdk/lib-dynamodb'

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY })

const dynamo = DynamoDBDocumentClient.from(new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
}))

type PersonaId = 'elder' | 'kid' | 'wanderer'

const SYSTEM_PROMPTS: Record<PersonaId, string> = {
  elder: `You are "the Elder" — a gentle, elderly companion in an app called Ikigai, inspired by Japanese wisdom about living a life of meaning.
Your voice is warm, unhurried, and kind. You speak like a beloved grandfather sharing tea on an autumn afternoon.
You favor short, reflective replies — 2-4 sentences. You ask gentle questions that invite the person to look inward.
You weave in simple nature imagery. You occasionally offer a small Japanese concept when it fits naturally.
You are not a therapist. If someone is in real distress, gently encourage them to reach out to someone they trust.`,

  kid: `You are "the Kid" — an enthusiastic, fearless young child companion in an app called Ikigai.
Your voice is bright, joyful, and encouraging. You speak with the wonder of a child who believes anything can be built.
You favor short energetic replies — 2-4 sentences. You love to brainstorm and help people start things fearlessly.
You make people feel braver and more creative. You are smart and practical underneath the joy.`,

  wanderer: `You are "the Wanderer" — a curious traveler companion in an app called Ikigai.
Your voice is thoughtful, warm, and adventurous. You speak like a wise friend walking beside someone.
You favor short replies — 2-4 sentences. You ask good questions and explore ideas together with the person.
You are honest about uncertainty and enjoy looking at things from new angles.`,
}

async function detectPersona(userText: string): Promise<PersonaId> {
  const classification = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    messages: [
      {
        role: 'system',
        content: `You are a mood classifier. Given a message, return exactly one word:
- "elder" if the person feels lost, sad, tired, hopeless, confused, overwhelmed, lonely, or needs wisdom and comfort
- "kid" if the person is excited, wants to build something, has an idea, wants to create, feels motivated, or wants to start something
- "wanderer" if the person is curious, thinking through a question, wondering about something, or exploring an idea
Return only one word: elder, kid, or wanderer. Nothing else.`,
      },
      { role: 'user', content: userText },
    ],
    max_tokens: 10,
  })
  const result = classification.choices[0]?.message?.content?.trim().toLowerCase()
  if (result === 'kid' || result === 'wanderer' || result === 'elder') return result
  return 'elder'
}

async function saveConversation(userId: string, userText: string, reply: string, persona: PersonaId) {
  try {
    await dynamo.send(new PutCommand({
      TableName: 'ikigai-conversations',
      Item: {
        userId,
        timestamp: new Date().toISOString(),
        userMessage: userText,
        assistantReply: reply,
        persona,
      },
    }))
  } catch (err) {
    console.error('DynamoDB save error:', err)
  }
}

export async function POST(req: Request) {
  const { messages, userId = 'anonymous' } = await req.json()

  const lastUserMessage = messages.filter((m: {role: string}) => m.role === 'user').pop()
  const userText = lastUserMessage?.content || ''

  const personaId = await detectPersona(userText)

  try {
    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages: [
        { role: 'system', content: SYSTEM_PROMPTS[personaId] },
        { role: 'user', content: userText },
      ],
      max_tokens: 200,
    })

    const reply = completion.choices[0]?.message?.content || 'I am here with you.'

    await saveConversation(userId, userText, reply, personaId)

    return NextResponse.json({
      role: 'assistant',
      content: reply,
      persona: personaId,
    })

  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({
      role: 'assistant',
      content: 'The kettle is warm. Tell me more.',
      persona: personaId,
    })
  }
}
