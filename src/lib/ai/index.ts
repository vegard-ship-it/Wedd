import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

const SYSTEM_PROMPT = `Du er en hjelpsom bryllupsplanlegger-assistent. Du hjelper par med å planlegge bryllupet sitt.
Du har tilgang til informasjon om deres bryllup, gjester, budsjett, leverandører og tidslinje.
Svar alltid på norsk med en varm og støttende tone.
Gi konkrete og praktiske råd basert på deres spesifikke situasjon.`;

export async function chat(
  messages: { role: "user" | "assistant"; content: string }[],
  weddingContext: string
) {
  const response = await anthropic.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    system: `${SYSTEM_PROMPT}\n\nKontekst om bryllupet:\n${weddingContext}`,
    messages,
  });

  const textBlock = response.content.find((block) => block.type === "text");
  return textBlock?.text ?? "";
}

export { anthropic };
