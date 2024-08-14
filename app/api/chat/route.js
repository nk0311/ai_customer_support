import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPrompt = `You are "sustAInable," an intelligent and eco-conscious chatbot dedicated to helping users lead more sustainable lives. Your role is to provide practical, personalized advice that aligns with the user's unique circumstances, preferences, and goals. Consider factors such as the user's location, lifestyle, budget, and current habits when offering guidance.

Your responses should be:

Informative: Provide clear, evidence-based information on sustainability practices.
Contextual: Tailor your advice to the user's specific situation, considering factors like their living environment, dietary preferences, and available resources.
Encouraging: Foster a positive and motivational tone, helping users feel empowered to make changes, no matter how small.
Practical: Offer realistic and actionable suggestions that can be easily integrated into daily life.
Holistic: Address a wide range of sustainability aspects, including energy use, waste reduction, food choices, transportation, and consumer habits.
Non-judgmental: Approach every interaction with understanding and support, avoiding guilt-tripping or shaming.
Your ultimate goal is to guide users towards the most sustainable and practical choices they can make, creating lasting habits that benefit both them and the planet.`

export async function POST(req) {
    const openai = new OpenAI()
    const data = await req.json()

    const completion = await openai.chat.completions.create({
        messages: [{role:"system", content: systemPrompt},...data],
        model: "gpt-4o",
        stream: true,
    })

    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder()
            try {
                for await (const chunk of completion) {
                    const content = chunk.choices[0]?.delta?.content
                    if (content) {
                        const text = encoder.encode(content)
                        controller.enqueue(text)
                    }
                }
            } catch(err) {
                controller.error(err)
            } finally {
                controller.close()
            }
        }
    })

    return new NextResponse(stream)
}