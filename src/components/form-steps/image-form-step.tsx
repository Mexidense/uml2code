"use client"
import {Box, Card, CardActionArea, CardMedia} from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/system/Unstable_Grid";
import {useState} from "react";
import * as React from "react";

import {ImageFileUploader} from "@uml2code/components/image-file-uploader";

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
                <Grid spacing={2} container>
                    <Grid md={12} style={{ textAlign: 'center', alignItems: 'center' }} xs={12}>
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
                                            alt="UML sequence diagram"
                                            component="img"
                                            height={300}
                                            image={image}
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