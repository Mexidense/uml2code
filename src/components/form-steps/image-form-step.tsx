"use client"
import {useState} from "react";
import {ImageFileUploader} from "@uml2code/components/image-file-uploader";
import Grid from "@mui/system/Unstable_Grid";
import {Box, Card, CardActionArea, CardMedia} from "@mui/material";

interface ImageFormStepProps {
    setUploadedImage: (value: string) => void;
    imageSource: string|null;
}

export function ImageFormStep({ setUploadedImage, imageSource }: ImageFormStepProps) {
    const [image, setImage] = useState<string|null>(imageSource);

    const handleImageUpdate = (imageSource: string) => {
        setUploadedImage(imageSource);
        setImage(imageSource);
    };

    return (
        <>
            <Box sx={{ width: '100%', alignItems: 'center'}}>
                <Grid container spacing={2}>
                    <Grid xs={12} md={12} style={{ textAlign: 'center', alignItems: 'center' }}>
                        {
                            !image &&
                            // <ImageFileUploader onCodeUpdate={handleCodeUpdate} setLoading={setLoading} onImageSourceUpdate={handleImageUpdate}/>
                            <ImageFileUploader setUploadedImage={handleImageUpdate}/>
                        }
                        {image &&
                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Card sx={{ maxWidth: 200 }}>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            width="100%"
                                            image={image}
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