"use client"
import {useState} from "react";
import {ImageFileUploader} from "@uml2code/components/image-file-uploader";
import Grid from "@mui/system/Unstable_Grid";
import {Box, Card, CardActionArea, CardMedia} from "@mui/material";
import Button from "@mui/material/Button";
import * as React from "react";

interface ImageFormStepProps {
    setUploadedImage: (value: string|null) => void;
    imageSource: string|null;
}

export function ImageFormStep({ setUploadedImage, imageSource }: ImageFormStepProps) {
    const [image, setImage] = useState<string|null>(imageSource);

    const handleImageUpdate = (imageSource: string|null) => {
        setUploadedImage(imageSource);
        setImage(imageSource);
    };

    const handleResetImage = () => {
        setUploadedImage(null)
        setImage(null);
    }

    return (
        <>
            <Box sx={{ width: '100%', alignItems: 'center'}}>
                <Grid container spacing={2}>
                    <Grid xs={12} md={12} style={{ textAlign: 'center', alignItems: 'center' }}>
                        {
                            !image && (
                                <ImageFileUploader setUploadedImage={handleImageUpdate}/>
                            )
                        }
                        {image &&
                            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Card>
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height={300}
                                            image={image}
                                            alt="UML sequence diagram"
                                            sx={{ padding: "1em 1em 0 1em", objectFit: 'cover' }}
                                        />
                                    </CardActionArea>
                                    <Button onClick={handleResetImage}>
                                        Change image
                                    </Button>
                                </Card>
                            </Box>
                        }
                    </Grid>
                </Grid>
            </Box>
        </>
    );
}