import { NextApiRequest, NextApiResponse } from "next";
import {
    GenerateCodeFromSequenceDiagram, GenerateCodeFromSequenceDiagramResponse
} from "@uml2code/back-end/generate-code/generate-code-from-sequence-diagram.service";
import {AUTHORIZATION_HEADER_KEY} from "@uml2code/middleware";

export default async function handler(apiRequest: NextApiRequest, apiResponse: NextApiResponse) {
    const authorizationToken = apiRequest.headers[AUTHORIZATION_HEADER_KEY];
    if (authorizationToken !== process.env.AUTHORIZATION_TOKEN) {
        apiResponse.status(401).json({message: 'Unauthorized'});
    }

    try {
        const { image, programmingLanguage, framework, architecture, shouldHasTests} = apiRequest.body;

        const request = {
            image: image,
            programmingLanguage: programmingLanguage,
            framework: framework,
            architecture: architecture,
            shouldHasTests: shouldHasTests
        };

        const response = await GenerateCodeFromSequenceDiagram.generateCode(request);

        console.log({ code: response?.code, prompt: response?.prompt });

        apiResponse.status(200).json({code: response?.code, prompt: response?.prompt} as GenerateCodeFromSequenceDiagramResponse);
    } catch (error) {
        apiResponse.status(422).json({ error: (error as Error).message});
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb',
        },
    },
}