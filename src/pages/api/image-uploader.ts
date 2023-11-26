import { NextApiRequest, NextApiResponse } from "next";
import {VisionHttpClient} from "@uml2code/back-end/generate-code/open-ai/vision.http-client";
import {
    GenerateCodeFromSequenceDiagram
} from "@uml2code/back-end/generate-code/generate-code-from-sequence-diagram.service";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await new Promise(resolve => setTimeout(resolve, 1000));

    res.status(200).json({code: "```typescript\n" +
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
            "```\n"});
    // const code = await GenerateCodeFromSequenceDiagram.generateCode(req.body)
    //
    // res.status(200).json({code: code});
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '10mb',
        },
    },
}