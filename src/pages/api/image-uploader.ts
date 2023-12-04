import { NextApiRequest, NextApiResponse } from "next";
import {
    GenerateCodeFromSequenceDiagram, GenerateCodeFromSequenceDiagramResponse
} from "@uml2code/back-end/generate-code/generate-code-from-sequence-diagram.service";
import {ImageTransformationService} from "@uml2code/back-end/image-transformation/image-transformation.service";

export default async function POST (apiRequest: NextApiRequest, apiResponse: NextApiResponse) {
    try {
        const { image, programmingLanguage, framework, architecture, shouldHasTests} = apiRequest.body;

        const transformedImage = await ImageTransformationService.transform(image);

        const request = {
            image: transformedImage,
            programmingLanguage: programmingLanguage,
            framework: framework,
            architecture: architecture,
            shouldHasTests: shouldHasTests
        };
        const response = await GenerateCodeFromSequenceDiagram.generateCode(request);

        return apiResponse.status(200).json({code: response?.code, prompt: response?.prompt} as GenerateCodeFromSequenceDiagramResponse);
    } catch (error) {
        return apiResponse.status(422).json({ error: (error as Error).message});
    }
}

export const config = {
    api: {
        bodyParser: {
            sizeLimit: '4mb',
        },
    },
}