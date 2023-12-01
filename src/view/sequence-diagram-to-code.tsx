"use client"
import {useState} from "react";
import Grid from "@mui/system/Unstable_Grid";
import {Box, Typography} from "@mui/material";
import Form from "@uml2code/components/form-steps/form";
import Result from "@uml2code/components/result";

export type PromptInfo = {
    imageSource: string;
    programmingLanguage: string;
    framework: string;
    architecture: string;
    isItNeedTests: boolean;
};

export default function SequenceDiagramToCode() {
    const [generatedCode, setGeneratedCode] = useState<string|null>(null);
    const [prompt, setPrompt] = useState<PromptInfo|null>(null);
    const [promptText, setPromptText] = useState<string|null>(null);

    return (
        <main>
            <Box sx={{ width: '100%', padding: '0 10px' }}>
                <Grid container spacing={2}>
                    <Grid xs={12} md={12}>
                        <Box sx={{ textAlign: 'center'}}>
                            <Typography align="center" variant="h4" color="primary">
                                UML sequence diagram to code
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid xs={12} md={12}>
                        {!generatedCode || !prompt || !promptText ? (
                            <Form setGeneratedCode={setGeneratedCode} setPrompt={setPrompt} setPromptText={setPromptText} />
                        ) : (
                            <Result generatedCode={generatedCode} prompt={prompt} promptText={promptText}/>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </main>
    )
}
