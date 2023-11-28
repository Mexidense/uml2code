"use client"
import {useState} from "react";
import {ImageFileUploader} from "@uml2code/components/image-file-uploader";
import Grid from "@mui/system/Unstable_Grid";
import {Box, Card, CardActionArea, CardMedia} from "@mui/material";

interface ImageFormStepProps {
    setLoading: (value: boolean) => void;
    setGeneratedCode: (value: string) => void;
}

export function ImageFormStep({ setLoading, setGeneratedCode }: ImageFormStepProps) {
    const [uploadedImage, setUploadedImage] = useState<string|null>(null);

    const handleCodeUpdate = (newCode: string) => {
        setGeneratedCode(newCode);
    };

    const handleImageUpdate = (imageSource: string) => {
        setUploadedImage(imageSource);
    };

    return (
        <>
            <Box sx={{ width: '100%', alignItems: 'center'}}>
                <Grid container spacing={2}>
                    <Grid xs={12} md={12} style={{ textAlign: 'center', alignItems: 'center' }}>
                        {
                            !uploadedImage &&
                            <ImageFileUploader onCodeUpdate={handleCodeUpdate} setLoading={setLoading} onImageSourceUpdate={handleImageUpdate}/>
                        }
                        {uploadedImage &&
                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Card sx={{ maxWidth: 365 }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            width="100%"
                                            image={uploadedImage}
                                            alt="Image uploaded"
                                        />
                                    </CardActionArea>
                                </Card>
                            </Box>
                        }
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}