import * as fs from 'fs';
import {VisionHttpClient} from "@uml2code/back-end/generate-code/open-ai/vision.http-client";

export class GenerateCodeFromSequenceDiagram {
  static async generateCode(
    image: string,
  ): Promise<string|null> {
    const programmingLanguage = 'typescript';
    const architectures = ['Domain Driven-Design', 'Hexagonal'];
    const shouldHasTests = true;
    const framework = 'NextJS';

    const whoAreYouInstruction = `You are the best architecture software engineer who has knowledge in ${architectures.join(
        ',',
    )} architectures.\n`;
    const visionInstruction =
        'I provide you with a sequence diagram in PNG/JPG file format.\n';
    const mainInstruction = `You should provide a ${programmingLanguage} example with all code generated watching this sequence diagram using ${architectures.join(
        ',',
    )} architectures taking into account all principles in this or these architecture/s.\n`;
    const outputInstruction = `Do not explain anything just generate all within ONLY one ${programmingLanguage} code block in Markdown format.\n`;

    let prompt = `${whoAreYouInstruction}${visionInstruction}${mainInstruction}${outputInstruction}`;
    if (shouldHasTests) {
      prompt += `Also, include test.\n`;
    }
    if (framework) {
      prompt += `Also, follows the rules of this framework: ${framework}.`;
    }

    console.table(`🧪 ${prompt}`);
    console.log(`🧠 Understanding your sequence diagram...`);

    const result = await VisionHttpClient.understandImage(prompt, image);
    if (!result) {
      console.log(`😅 I didn't understand your sequence diagram`);

      return null;
    }

    const codeBlock = GenerateCodeFromSequenceDiagram.extractTypescriptCode(result, programmingLanguage);
    if (!codeBlock) {
      console.log(`😅 Sorry, I couldn't generate the code`);

      return null;
    }

    const fileContent = `\`\`\`${programmingLanguage}\n${codeBlock}\n\`\`\``;
    // const filePath = `files/${programmingLanguage}_code.md`;
    // fs.writeFileSync(filePath, fileContent);
    //

    console.log(`✅ Code generated: ${fileContent}`);

    return fileContent;
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
