import OpenAI from 'openai';

export class VisionHttpClient {
  static async understandImage(
    prompt: string,
    image: string
  ): Promise<string | null> {
    try {
      const apiKey =  process.env.OPENAI_API_KEY;
      if (!apiKey) {
        throw new Error(`OPENAI_API_KEY not found`)
      }

      const response = await new OpenAI({apiKey: apiKey}).chat.completions.create({
        model: 'gpt-4-vision-preview',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              {
                type: 'image_url',
                image_url: {
                  url: image,
                },
              },
            ],
          },
        ],
        max_tokens: 2000,
      });

      return response.choices[0].message.content;
    } catch (error) {
      console.error(`❌ Error understanding image`, error);

      return null;
    }
  }
}
