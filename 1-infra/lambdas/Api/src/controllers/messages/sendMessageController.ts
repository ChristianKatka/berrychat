import { Request, Response } from "express";
import { randomUUID } from "node:crypto";
import { createThreadService } from "../../services/dynamodb/createThreadService";
import { parseClaudeResponse } from "./utils/parseClaudeResponse";
import { Message, Thread } from "../../models/thread";
import { getAnthropicClient } from "../../instances/anthropic";
import retry from "async-retry";

export const sendMessageController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const decodedIdToken = (req as any).decodedIdToken;
  const fullThreadWithNewUserMessage = req.body;

  const anthropic = await getAnthropicClient();

  let threadId = fullThreadWithNewUserMessage.threadId;
  let createdAtTimeStamp = fullThreadWithNewUserMessage.createdAtTimeStamp;

  if (!threadId) {
    threadId = randomUUID();
    createdAtTimeStamp = new Date().toISOString();
  }

  // Strip citations before sending to Claude
  const claudeCompatibleMessages = fullThreadWithNewUserMessage.discussion.map(
    ({ role, content }) => ({
      role,
      content,
    })
  );
  console.log("Started doing anthropic api call");

  const claudeResponse = await retry(
    async () => {
      return anthropic.messages.create({
        model: "claude-3-5-haiku-latest",
        max_tokens: 1024, // 1024, 256
        system: `Toimit suomenkielisenä tekoälyavustajana, joka auttaa Muuramen kunnan työntekijöitä tunnistamaan liiketoimintamahdollisuuksia eri yrityksille tarjottavien kestävän kehityksen palveluiden osalta. Kunta etsii ratkaisuja, jotka tukevat ilmastoystävällisyyttä, energiatehokkuutta, kiertotaloutta ja sosiaalista vastuullisuutta. Sinun tehtäväsi on etsiä ajankohtaista tietoa käyttäjän antamasta yrityksestä (esimerkiksi Fortum Oyj) ja vastata selkeästi, mitä kestäviä ja ympäristöystävällisiä palveluita kunta voisi tarjota kyseiselle yritykselle.
    Anna aina lyhyt yleiskuvaus yrityksestä, sen päätoimialasta ja kestävän kehityksen strategioista. Sen jälkeen arvioi yrityksen taloudellista vakautta ja kannattavuutta (esimerkiksi liikevaihto, tulos, kasvu tai investointikyky). Lopuksi ideoi konkreettisia, kuntalähtöisiä palveluita tai yhteistyömahdollisuuksia, jotka voisivat olla houkuttelevia juuri kyseiselle yritykselle.
    Vältä ympäripyöreitä lauseita, anna konkreettisia ehdotuksia. Suosi numerodataa ja viitteitä luotettavista lähteistä jos mahdollista. Vastaa aina suomeksi ja pyri olemaan ystävällinen, asiantunteva ja tehokas.`,
        messages: claudeCompatibleMessages,
        tools: [
          {
            type: "web_search_20250305",
            name: "web_search",
            max_uses: 5,
          },
        ],
      });
    },
    {
      retries: 3,
      minTimeout: 500,
      maxTimeout: 3000,
    }
  );

  console.log("Done, next parse claude response");

  // Parse Claude response to include citations
  const parsed = parseClaudeResponse(claudeResponse);

  // Append assistant message to discussion
  const updatedDiscussion: Message[] = [
    ...fullThreadWithNewUserMessage.discussion,
    parsed,
  ];

  // Compose the full thread object to store
  const fullThread: Thread = {
    ...fullThreadWithNewUserMessage,
    createdAtTimeStamp,
    email: decodedIdToken.email,
    threadId,
    discussion: updatedDiscussion,
  };

  await createThreadService(fullThread);

  res.json(fullThread);
};
