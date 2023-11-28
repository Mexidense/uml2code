"use client"
import {useState} from "react";
import Grid from "@mui/system/Unstable_Grid";
import {Box, Typography} from "@mui/material";
import {CodeBlockViewer} from "@uml2code/components/code-block-viewer";
import FormStepper from "@uml2code/components/form-stepper";

export type PromptInfo = {
    imageSource: string;
    programmingLanguage: string;
    framework: string;
    architectures: string;
    isItNeedTests: boolean;
};

export default function SequenceDiagramToCode() {
    const [generatedCode, setGeneratedCode] = useState<string|null>(null);
    const [prompt, setPrompt] = useState<PromptInfo|null>(null);

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
                        {!generatedCode ? (
                            <FormStepper setGeneratedCode={setGeneratedCode} setPrompt={setPrompt} />
                        ) : (
                            <CodeBlockViewer generatedCode={generatedCode} />
                        )}
                    </Grid>
                </Grid>
            </Box>
        </main>
    )
}
