import { NextApiRequest, NextApiResponse } from "next";
import {VisionHttpClient} from "@uml2code/back-end/generate-code/open-ai/vision.http-client";
import {
    GenerateCodeFromSequenceDiagram, GenerateCodeFromSequenceDiagramResponse
} from "@uml2code/back-end/generate-code/generate-code-from-sequence-diagram.service";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await new Promise(resolve => setTimeout(resolve, 1000));

    res.status(200).json({
        code: "```typescript\n" +
            "import { NextApiRequest, NextApiResponse } from 'next';\n" +
            "import { getSession } from 'next-auth/client';\n" +
            "\n" +
            "// Domain Entities\n" +
            "class Student {\n" +
            "  constructor(public id: string) { }\n" +
            "  getRegistrationInfo(): Promise<RegistrationData> {\n" +
            "    // Simulate fetching registration data\n" +
            "    return Promise.resolve(new RegistrationData());\n" +
            "  }\n" +
            "}\n" +
            "\n" +
            "class RegistrationData {\n" +
            "  // Contains registration data fields\n" +
            "}\n" +
            "\n" +
            "// Application Service\n" +
            "class RegistrationService {\n" +
            "  async prepareRegistration(studentId: string): Promise<RegistrationData> {\n" +
            "    let student = new Student(studentId);\n" +
            "    return await student.getRegistrationInfo();\n" +
            "  }\n" +
            "}\n" +
            "\n" +
            "// Infrastructure\n" +
            "class RegistrationController {\n" +
            "  private service: RegistrationService;\n" +
            "\n" +
            "  constructor(service: RegistrationService) {\n" +
            "    this.service = service;\n" +
            "  }\n" +
            "\n" +
            "  async handleRequest(req: NextApiRequest, res: NextApiResponse) {\n" +
            "    try {\n" +
            "      const session = await getSession({ req });\n" +
            "      if (!session || !session.user) {\n" +
            "        throw new Error('User not logged in');\n" +
            "      }\n" +
            "\n" +
            "      const registrationData = await this.service.prepareRegistration(session.user.id);\n" +
            "      res.status(200).json({ registrationData });\n" +
            "    } catch (error) {\n" +
            "      res.status(401).json({ error: error.message });\n" +
            "    }\n" +
            "  }\n" +
            "}\n" +
            "\n" +
            "// Testing\n" +
            "describe('RegistrationController', () => {\n" +
            "  let controller: RegistrationController;\n" +
            "  let service: RegistrationService;\n" +
            "\n" +
            "  beforeEach(() => {\n" +
            "    service = new RegistrationService();\n" +
            "    controller = new RegistrationController(service);\n" +
            "  });\n" +
            "\n" +
            "  test('handleRequest should return registration data if user is logged in', async () => {\n" +
            "    const mockReq = {\n" +
            "      session: {\n" +
            "        user: { id: 'student123' }\n" +
            "      }\n" +
            "    } as unknown as NextApiRequest;\n" +
            "    const mockRes = {\n" +
            "      status: jest.fn().mockReturnThis(),\n" +
            "      json: jest.fn()\n" +
            "    } as unknown as NextApiResponse;\n" +
            "\n" +
            "    await controller.handleRequest(mockReq, mockRes);\n" +
            "    expect(mockRes.status).toBeCalledWith(200);\n" +
            "    expect(mockRes.json).toBeCalledWith(expect.objectContaining({ registrationData: expect.any(RegistrationData) }));\n" +
            "  });\n" +
            "\n" +
            "  test('handleRequest should return error if user is not logged in', async () => {\n" +
            "    const mockReq = {\n" +
            "      session: {}\n" +
            "    } as unknown as NextApiRequest;\n" +
            "    const mockRes = {\n" +
            "      status: jest.fn().mockReturnThis(),\n" +
            "      json: jest.fn()\n" +
            "    } as unknown as NextApiResponse;\n" +
            "\n" +
            "    await controller.handleRequest(mockReq, mockRes);\n" +
            "    expect(mockRes.status).toBeCalledWith(401);\n" +
            "    expect(mockRes.json).toBeCalledWith({ error: 'User not logged in' });\n" +
            "  });\n" +
            "});\n" +
            "```\n",
        prompt: "You are the best architecture software engineer who has knowledge in Domain Driven-Design,Hexagonal architectures.\n" +
            "I provide you with a sequence diagram in PNG/JPG file format.\n" +
            "You should provide a typescript example with all code generated watching this sequence diagram using Domain Driven-Design,Hexagonal architectures taking into account all principles in this or these architecture/s.\n" +
            "Do not explain anything just generate all within ONLY one typescript code block in Markdown format.\n" +
            "Also, follows the rules of this framework: NextJS.\n" +
            "Also, include test.\n"
    });
    //
    // const { image, programmingLanguage, framework, architecture, shouldHasTests} = req.body;
    //
    // const request = {
    //     image: image,
    //     programmingLanguage: programmingLanguage,
    //     framework: framework,
    //     architecture: architecture,
    //     shouldHasTests: shouldHasTests
    // };
    //
    // const response = await GenerateCodeFromSequenceDiagram.generateCode(request);
    //
    // console.log({ code: response?.code, prompt: response?.prompt });
    //
    // res.status(200).json({code: response?.code, prompt: response?.prompt} as GenerateCodeFromSequenceDiagramResponse);
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb',
        },
    },
}