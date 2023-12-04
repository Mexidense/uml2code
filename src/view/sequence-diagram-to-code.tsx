"use client"
import {useState} from "react";
import Grid from "@mui/system/Unstable_Grid";
import {Box, SpeedDial, SpeedDialAction, SpeedDialIcon, Typography} from "@mui/material";
import Form from "@uml2code/components/form-steps/form";
import Result from "@uml2code/components/result";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import EditIcon from "@mui/icons-material/Edit";

export type PromptInfo = {
    imageSource: string;
    programmingLanguage: string;
    framework: string;
    architecture: string;
    isItNeedTests: boolean;
};

export default function SequenceDiagramToCode() {
    const [generatedCode, setGeneratedCode] = useState<string|null>(null);
    const [prompt, setPrompt] = useState<PromptInfo|undefined>(undefined);
    const [promptText, setPromptText] = useState<string|null>(null);

    const handleNewRequest = () => {
        setPrompt(undefined);
        setPromptText(null);
        setGeneratedCode(null);
    }

    const handleEditSetup = () => {
        setGeneratedCode(null);
    }

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
                            <Form
                                setGeneratedCode={setGeneratedCode}
                                prompt={prompt}
                                setPrompt={setPrompt}
                                setPromptText={setPromptText}
                            />
                        ) : (
                            <>
                                <Result
                                    generatedCode={generatedCode}
                                    prompt={prompt}
                                    promptText={promptText}
                                />
                                <SpeedDial
                                    sx={{
                                        flexDirection: 'row-reverse',
                                        position: 'sticky',
                                        textAlign: 'right',
                                        alignItems: 'flex-end',
                                    }}
                                    ariaLabel="Actions"
                                    icon={<SpeedDialIcon />}
                                >
                                    <SpeedDialAction
                                        tooltipOpen
                                        key="new-request"
                                        icon={<AutorenewIcon />}
                                        tooltipTitle="New request"
                                        onClick={handleNewRequest}
                                    />
                                    <SpeedDialAction
                                        tooltipOpen
                                        key="edit-request"
                                        icon={<EditIcon />}
                                        tooltipTitle="Edit request"
                                        onClick={handleEditSetup}
                                    />
                                </SpeedDial>
                            </>

                        )}
                    </Grid>
                </Grid>
            </Box>
        </main>
    )
}
