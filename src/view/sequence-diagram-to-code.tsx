"use client"
import AutorenewIcon from "@mui/icons-material/Autorenew";
import EditIcon from "@mui/icons-material/Edit";
import {Box, SpeedDial, SpeedDialAction, SpeedDialIcon, Typography} from "@mui/material";
import Grid from "@mui/system/Unstable_Grid";
import {useState} from "react";

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
                <Grid spacing={2} container>
                    <Grid md={12} xs={12}>
                        <Box sx={{ textAlign: 'center'}}>
                            <Typography align="center" color="primary" variant="h4">
                                UML sequence diagram to code
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid md={12} xs={12}>
                        {!generatedCode || !prompt || !promptText ? (
                            <Form
                                prompt={prompt}
                                setGeneratedCode={setGeneratedCode}
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
                                    ariaLabel="Actions"
                                    icon={<SpeedDialIcon />}
                                    sx={{
                                        flexDirection: 'row-reverse',
                                        position: 'sticky',
                                        textAlign: 'right',
                                        alignItems: 'flex-end',
                                    }}
                                >
                                    <SpeedDialAction
                                        icon={<AutorenewIcon />}
                                        key="new-request"
                                        tooltipTitle="New request"
                                        tooltipOpen
                                        onClick={handleNewRequest}
                                    />
                                    <SpeedDialAction
                                        icon={<EditIcon />}
                                        key="edit-request"
                                        tooltipTitle="Edit request"
                                        tooltipOpen
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
