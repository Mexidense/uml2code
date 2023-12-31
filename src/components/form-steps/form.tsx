import {useTheme} from "@mui/material";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';
import Grid from "@mui/system/Unstable_Grid";
import {useState} from "react";
import * as React from 'react';

import {
    GenerateCodeFromSequenceDiagramRequest,
    GenerateCodeFromSequenceDiagramResponse
} from "@uml2code/back-end/generate-code/generate-code-from-sequence-diagram.service";
import {ImageFormStep} from "@uml2code/components/form-steps/image-form-step";
import SetupFormStep from "@uml2code/components/form-steps/setup-form-step";
import Spinner from '@uml2code/components/spinner';
import {ErrorModal} from "@uml2code/modals/error-modal";
import {PromptInfo} from "@uml2code/view/sequence-diagram-to-code";

interface ImageFormStepProps {
    prompt?: PromptInfo|undefined;
    setGeneratedCode: (value: string) => void;
    setPrompt: (value: PromptInfo) => void;
    setPromptText: (value: string) => void;
}

export default function Form({ setGeneratedCode, setPromptText, setPrompt, prompt }: ImageFormStepProps) {
    const NUMBER_OF_STEPS = 2;

    const [uploadedImage, setUploadedImage] = useState<string|null>(prompt?.imageSource ?? null);
    const [programmingLanguage, setProgrammingLanguage] = React.useState<string | null>(prompt?.programmingLanguage ?? null);
    const [framework, setFramework] = React.useState<string | null>(prompt?.framework ?? null);
    const [architecture, setArchitecture] = React.useState<string | null>(prompt?.architecture ?? null);
    const [wantTest, setWantTest] = React.useState<boolean>(prompt?.isItNeedTests ?? false);

    const [activeStep, setActiveStep] = React.useState(prompt ? 1 : 0);
    const [skipped, setSkipped] = React.useState(new Set<number>());

    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const [isThereAnyError, setIsThereAnyError] = React.useState<boolean>(false);
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

    const isStepOptional = (step: number) => {
        return step === NUMBER_OF_STEPS + 1;
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const isImageStepValid = (): boolean => {
        return uploadedImage !== null;
    }

    const isSetupStepValid = (): boolean => {
        return programmingLanguage !== null &&
            framework !== null &&
            architecture !== null;
    }

    const isFinalStep = (): boolean => {
        return activeStep === NUMBER_OF_STEPS - 1
    }

    const isStepValid = (): boolean => {
        switch (activeStep) {
            case 0:
                return isImageStepValid();
            case 1:
                return isSetupStepValid();
            default:
                return true;
        }
    }

    const handleNext = async () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);

        if (isFinalStep()) {
            setIsLoading(true);

            setPrompt({
                imageSource: uploadedImage ?? '',
                programmingLanguage: programmingLanguage ?? '',
                framework: framework ?? '',
                architecture: architecture ?? '',
                isItNeedTests: wantTest,
            })

            await generateCode();

            return;
        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);

            return newSkipped;
        });
    };

    const handleReset = () => {
        setIsThereAnyError(false);
        setErrorMessage(null);
        setIsLoading(false);
        setActiveStep(0);
    }

    const generateCode = async () => {
        const csrfResp = await fetch('/csrf-token');
        const { csrfToken } = await csrfResp.json();

        try {
            const payload = {
                image: uploadedImage,
                programmingLanguage: programmingLanguage,
                framework: framework,
                architecture: architecture,
                shouldHasTests: wantTest
            } as GenerateCodeFromSequenceDiagramRequest;
            const response = await fetch('api/image-uploader', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken
                },
                body: JSON.stringify(
                    {
                        ...payload
                    }
                ),
            });

            if (!response.ok) {
                const result = await response.json() as { error: string};
                setIsThereAnyError(true);
                setErrorMessage(result.error);

                return;
            }

            const result = await response.json() as GenerateCodeFromSequenceDiagramResponse;
            const { code, prompt} = result;

            setGeneratedCode(code);
            setPromptText(prompt)
        } catch (error) {
            setIsThereAnyError(true);
            setErrorMessage((error as Error).message);
            console.log(`❌ Something wrong generating code with AI...`);
        }
    };

    const theme = useTheme();

    return (
        <>
            <Box sx={{ width: '100%', cursor: isLoading ? 'progress' : 'default'}}>
                {
                    !isLoading && (
                        <>
                            <Stepper activeStep={activeStep} sx={{ margin: '20px 0' }}>
                                <Step key="image">
                                    <StepLabel>Upload image</StepLabel>
                                </Step>
                                <Step key="framework">
                                    <StepLabel>
                                        Setup your code
                                    </StepLabel>
                                </Step>
                            </Stepper>
                        </>
                    )
                }
                {
                    activeStep === 0 && (
                        <>
                            <Box sx={{ width: '100%', alignItems: 'center'}}>
                                <Grid spacing={2} container>
                                    <Grid md={12} style={{ textAlign: 'center', alignItems: 'center' }} xs={12}>
                                        <Typography
                                            color={theme.palette.primary.main}
                                            sx={{ mt: 2, mb: 1, ml: 1, textAlign: 'left', fontStyle: 'italic' }}
                                            variant="subtitle1"
                                        >
                                            Please, leave your fantastic UML sequence diagram
                                        </Typography>
                                        <ImageFormStep imageSource={uploadedImage} setUploadedImage={setUploadedImage}/>
                                    </Grid>
                                </Grid>
                            </Box>
                        </>
                    )
                }
                {
                    activeStep === 1 && (
                        <>
                            <SetupFormStep
                                architecture={architecture}
                                framework={framework}
                                isGeneratingCode={isLoading}
                                programmingLanguage={programmingLanguage}
                                setArchitecture={setArchitecture}
                                setFramework={setFramework}
                                setProgrammingLanguage={setProgrammingLanguage}
                                setWantTest={setWantTest}
                                wantTest={wantTest}
                            />
                        </>
                    )
                }
                {
                    isLoading ?
                        <Spinner /> :
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="inherit"
                                disabled={activeStep === 0}
                                sx={{ mr: 1 }}
                                onClick={handleBack}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            {isStepOptional(activeStep) && (
                                <Button color="inherit" sx={{ mr: 1 }} onClick={handleSkip}>
                                    Skip
                                </Button>
                            )}
                            <Button disabled={!isStepValid()} onClick={handleNext}>
                                {activeStep === NUMBER_OF_STEPS - 1 ? 'Generate code' : 'Next'}
                            </Button>
                        </Box>
                }
            </Box>
            {
                isThereAnyError && (
                    <ErrorModal errorMessage={errorMessage} open={isThereAnyError} setReset={handleReset}/>
                )
            }
        </>
    );
}