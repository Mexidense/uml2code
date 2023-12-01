import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {ImageFormStep} from "@uml2code/components/form-steps/image-form-step";
import {useState} from "react";
import {PromptInfo} from "@uml2code/view/sequence-diagram-to-code";
import Grid from "@mui/system/Unstable_Grid";
import Spinner from '@uml2code/components/spinner';
import SetupFormStep from "@uml2code/components/form-steps/setup-form-step";
import {
    GenerateCodeFromSequenceDiagramRequest,
    GenerateCodeFromSequenceDiagramResponse
} from "@uml2code/back-end/generate-code/generate-code-from-sequence-diagram.service";
import {useTheme} from "@mui/material";
import {ErrorModal} from "@uml2code/modals/error-modal";

interface ImageFormStepProps {
    setGeneratedCode: (value: string) => void;
    setPrompt: (value: PromptInfo) => void;
    setPromptText: (value: string) => void;
}

export default function FormStepper({ setGeneratedCode, setPromptText, setPrompt }: ImageFormStepProps) {
    const NUMBER_OF_STEPS = 2;

    const [uploadedImage, setUploadedImage] = useState<string|null>(null);
    const [programmingLanguage, setProgrammingLanguage] = React.useState<string | null>(null);
    const [framework, setFramework] = React.useState<string | null>(null);
    const [architecture, setArchitecture] = React.useState<string | null>(null);
    const [wantTest, setWantTest] = React.useState<boolean>(false);

    const [activeStep, setActiveStep] = React.useState(0);
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
                                <Grid container spacing={2}>
                                    <Grid xs={12} md={12} style={{ textAlign: 'center', alignItems: 'center' }}>
                                        <Typography
                                            color={theme.palette.primary.main}
                                            sx={{ mt: 2, mb: 1, ml: 1, textAlign: 'left', fontStyle: 'italic' }}
                                            variant="subtitle1"
                                        >
                                            Please, leave your fantastic UML sequence diagram here
                                        </Typography>
                                        <ImageFormStep setUploadedImage={setUploadedImage} imageSource={uploadedImage}/>
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
                                isGeneratingCode={isLoading}
                                programmingLanguage={programmingLanguage}
                                framework={framework}
                                architecture={architecture}
                                wantTest={wantTest}
                                setProgrammingLanguage={setProgrammingLanguage}
                                setFramework={setFramework}
                                setArchitecture={setArchitecture}
                                setWantTest={setWantTest}
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
                                onClick={handleBack}
                                sx={{ mr: 1 }}
                            >
                                Back
                            </Button>
                            <Box sx={{ flex: '1 1 auto' }} />
                            {isStepOptional(activeStep) && (
                                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                                    Skip
                                </Button>
                            )}
                            <Button onClick={handleNext} disabled={!isStepValid()}>
                                {activeStep === NUMBER_OF_STEPS - 1 ? 'Generate code' : 'Next'}
                            </Button>
                        </Box>
                }
            </Box>
            {
                isThereAnyError && (
                    <ErrorModal open={isThereAnyError} errorMessage={errorMessage} setReset={handleReset}/>
                )
            }
        </>
    );
}