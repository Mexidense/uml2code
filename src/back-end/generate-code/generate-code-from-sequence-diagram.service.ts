import {VisionHttpClient} from "@uml2code/back-end/generate-code/open-ai/vision.http-client";

export type GenerateCodeFromSequenceDiagramRequest = {
  image: string;
  programmingLanguage: string;
  framework: string;
  architecture: string;
  shouldHasTests: boolean;
}

export type GenerateCodeFromSequenceDiagramResponse = {
  code: string;
  prompt: string;
}

export class GenerateCodeFromSequenceDiagram {
  static async generateCode(
    request: GenerateCodeFromSequenceDiagramRequest
  ): Promise<GenerateCodeFromSequenceDiagramResponse|null> {
    const whoAreYouInstruction = `You are the best architecture software engineer who has knowledge in ${request.architecture} architecture.\n`;
    const visionInstruction =
        'I provide you with a sequence diagram in PNG/JPG file format.\n';
    const mainInstruction = `You should provide a ${request.programmingLanguage} example with all code generated watching this sequence diagram and, using ${request.architecture} architecture taking into account all their principles.\n`;
    const outputInstruction = `Do not explain anything just generate all within ONLY one ${request.programmingLanguage} code block.\n`;
    const outputFormat = `All within a block like this: "\`\`\`${request.programmingLanguage.toLowerCase()}<CODE_HERE>\`\`\`" in Markdown format.\n`;

    let prompt = `${whoAreYouInstruction}${visionInstruction}${mainInstruction}${outputInstruction}${outputFormat}`;
    if (request.framework) {
      prompt += `Also, follows the rules of this framework: ${request.framework}.\n`;
    }
    if (request.shouldHasTests) {
      prompt += `Finally, include test.\n`;
    }

    console.table(`🧪 ${prompt}`);
    console.log(`🧠 Understanding your sequence diagram...`);

    const result = await VisionHttpClient.understandImage(prompt, request.image);
    if (!result) {
      console.log(`😅 I didn't understand your sequence diagram`);

      return null;
    }
    const programmingLanguageInLowerCase = request.programmingLanguage.toLowerCase();

    const codeBlock = GenerateCodeFromSequenceDiagram.extractTypescriptCode(result, programmingLanguageInLowerCase);
    if (!codeBlock) {
      console.log(`😅 Sorry, I couldn't generate the code`, result);

      return null;
    }

    const fileContent = `\`\`\`${programmingLanguageInLowerCase}\n${codeBlock}\n\`\`\``;

    const response = {code: fileContent, prompt: prompt} as GenerateCodeFromSequenceDiagramResponse;

    console.log(`✅ Code generated: ${response}`);

    return response;
  }

  static extractTypescriptCode(
    markdownString: string,
    programmingLanguage: string,
  ): string | null {
    // Define a regular expression to match TypeScript code blocks in Markdown
    const codeBlockRegex = new RegExp(
      '```' + programmingLanguage + '([\\s\\S]*?)```',
    );

    // Use the regular expression to find matches in the input string
    const match = markdownString.match(codeBlockRegex);

    // If a match is found, return the TypeScript code, otherwise return null
    return match ? match[1].trim() : null;
  }
}
