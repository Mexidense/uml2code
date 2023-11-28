"use client"
import {useState} from "react";
import Grid from "@mui/system/Unstable_Grid";
import {Accordion, AccordionDetails, AccordionSummary, Box, Typography, useTheme} from "@mui/material";
import {CodeBlockViewer} from "@uml2code/components/code-block-viewer";
import FormStepper from "@uml2code/components/form-stepper";
import Summary from "@uml2code/components/summary";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export type PromptInfo = {
    imageSource: string;
    programmingLanguage: string;
    framework: string;
    architectures: string;
    isItNeedTests: boolean;
};

export default function SequenceDiagramToCode() {
    const [generatedCode, setGeneratedCode] = useState<string|null>('asdsd');
    const [prompt, setPrompt] = useState<PromptInfo|null>(null);

    const theme = useTheme();

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
                            <>
                                <Accordion
                                    sx={{ backgroundColor: theme.palette.secondary.main }}
                                    defaultExpanded={false}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="summary-content"
                                        id="summary-header"
                                    >
                                        <Typography>Summary 📝</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Summary/>
                                    </AccordionDetails>
                                </Accordion>
                                <Accordion
                                    sx={{ backgroundColor: theme.palette.secondary.main }}
                                    defaultExpanded={true}
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="code-content"
                                        id="code-header"
                                    >
                                        <Typography>Beautiful code 💅</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <CodeBlockViewer generatedCode={generatedCode} />
                                    </AccordionDetails>
                                </Accordion>
                            </>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </main>
    )
}
