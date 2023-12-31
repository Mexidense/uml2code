import {VisionHttpClient} from "@uml2code/back-end/open-ai/vision.http-client";

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

const GENERAL_ERROR = `[Error 002] I didn't understand your sequence diagram. I appreciate your effort in sharing the sequence diagram. However, it seems like there might be some clarity issues. Could you please resend the image with a higher resolution or provide additional details for better understanding? Thank you! 🙏🏽`

export class GenerateCodeFromSequenceDiagram {
  static async generateCode(
    request: GenerateCodeFromSequenceDiagramRequest
  ): Promise<GenerateCodeFromSequenceDiagramResponse> {
    const prompt = GenerateCodeFromSequenceDiagram.generatePrompt(
        request.programmingLanguage,
        request.framework,
        request.architecture,
        request.shouldHasTests
    )

    console.table(`[Prompt] ${prompt}`);

    let result = null;
    try {
      result = await VisionHttpClient.understandImage(prompt, request.image);
    } catch (error) {
      const errorMessage = `[Error 001] Open AI error: ${(error as Error).message}`;
      console.log(errorMessage);

      throw new Error(errorMessage)
    }
    console.log(`[Open AI result] ${result}`);

    if (!result) {
      const errorMessage = GENERAL_ERROR;
      console.log(errorMessage);

      throw new Error(errorMessage);
    }
    const programmingLanguageInLowerCase = request.programmingLanguage.toLowerCase();

    const codeBlock = GenerateCodeFromSequenceDiagram.extractTypescriptCode(result, programmingLanguageInLowerCase);
    if (!codeBlock) {
      const errorMessage = GENERAL_ERROR;
      console.log(errorMessage);

      throw new Error(errorMessage)
    }

    const fileContent = `\`\`\`${programmingLanguageInLowerCase}\n${codeBlock}\n\`\`\``;

    const response = {code: fileContent, prompt: prompt} as GenerateCodeFromSequenceDiagramResponse;

    console.log(`[Code generated] ${response.code}`);

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

    const match = markdownString.match(codeBlockRegex);
    if (match && match[1]) {
      return match[1].trim();
    }

    return null;
  }

  static generatePrompt(
      programmingLanguage: string,
      framework: string,
      architecture: string,
      shouldHasTests: boolean
  ): string {
    const whoAreYouInstruction = `You are the best architecture software engineer who has knowledge in ${architecture} architecture.\n`;
    const visionInstruction =
        'I provide you with a sequence diagram in PNG/JPG file format.\n';
    const mainInstruction = `You should provide a ${programmingLanguage} example with all code generated watching this sequence diagram and, using ${architecture} architecture taking into account all their principles. If the image contains hand-written notes, ignore these notes and generate the code in base the diagram. \n`;
    const outputInstruction = `Do not explain anything just generate all within ONLY one ${programmingLanguage} code block.\n`;
    const outputFormat = `All within a block like this: "\`\`\`${programmingLanguage.toLowerCase()}<CODE_HERE>\`\`\`" in Markdown format.\n`;

    let prompt = `${whoAreYouInstruction}${visionInstruction}${mainInstruction}${outputInstruction}${outputFormat}`;
    if (framework) {
      prompt += `Also, follows the rules of this framework: ${framework}.\n`;
    }
    if (shouldHasTests) {
      prompt += `Finally, include test.\n`;
    }

    return prompt;
  }
}
