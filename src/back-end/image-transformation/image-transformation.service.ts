import sharp from "sharp";

export class ImageTransformationService {
    static async transform(image: string): Promise<string> {
        const regex = /^data:([a-zA-Z0-9]+\/[a-zA-Z0-9]+);base64,([a-zA-Z0-9+/=]+)$/;
        const match = image.match(regex);

        if (!match) {
            throw new Error('Encoded Regex image not matched')
        }

        const dataHeader = match[1];
        const base64Content = match[2];

        if (!dataHeader || !base64Content) {
            throw new Error('Image not decoded properly')
        }

       try {
           const initialImageBuffer = Buffer.from(base64Content, 'base64');

           const transformedImageBuffer = await sharp(initialImageBuffer)
               .modulate({
                   saturation: 500,
                   brightness: 0.5
               })
               .gamma()
               .median()
               .trim()
               .grayscale()
               .toColourspace('b-w')
               .negate()
               .toBuffer();

           return `data:${dataHeader};base64,${transformedImageBuffer.toString('base64')}`;
       } catch (error) {
           throw new Error(`Image transformation failed: ${(error as Error).message}`);
       }
    }
}
