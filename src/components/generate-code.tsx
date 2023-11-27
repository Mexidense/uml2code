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
    const handleCodeUpdate = (newCode: string) => {
        setGeneratedCode(newCode);
    };

    return (
        <>
            {
                !loading && <Box sx={{ width: '100%' }}>
                    <Grid container spacing={2}>
                        <Grid xs={12} md={12}>
                            <ImageFileUploader onCodeUpdate={handleCodeUpdate} setLoading={setLoading} />
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