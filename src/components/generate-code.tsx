"use client"
import {useState} from "react";
import {ImageFileUploader} from "@uml2code/components/image-file-uploader";
import {CodeBlockViewer} from "@uml2code/components/code-block-viewer";
import Grid from "@mui/system/Unstable_Grid";
import {Box} from "@mui/material";

interface GenerateCodeProps {
    setLoading: (value: boolean) => void;
    loading: boolean;
}

export function GenerateCode({ setLoading, loading }: GenerateCodeProps) {
    const [generatedCode, setGeneratedCode] = useState('');
    const [uploadedImage, setUploadedImage] = useState<string|null>(null);

    const handleCodeUpdate = (newCode: string) => {
        setGeneratedCode(newCode);
    };
    const handleImageUpdate = (imageSource: string) => {
        setUploadedImage(imageSource);
    };

    return (
        <>
            {
                !loading && <Box sx={{ width: '100%', alignItems: 'center'}}>
                    <Grid container spacing={2}>
                        <Grid xs={12} md={12} style={{ textAlign: 'center' }}>
                            {!uploadedImage && (
                                <ImageFileUploader onCodeUpdate={handleCodeUpdate} setLoading={setLoading} onImageSourceUpdate={handleImageUpdate}/>
                            )}
                            {uploadedImage && (
                                <img src={uploadedImage} alt="Image uploaded" width="100%"/>
                            )}
                        </Grid>
                        <Grid xs={12} md={12}>
                            <CodeBlockViewer generatedCode={generatedCode} />
                        </Grid>
                    </Grid>
                </Box>
            }
        </>
    );
}