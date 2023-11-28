import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {ImageFormStep} from "@uml2code/components/form-steps/image-form-step";

interface ImageFormStepProps {
    setLoading: (value: boolean) => void;
    setGeneratedCode: (value: string) => void;
}

const numberOfSteps = 3;

export default function FormStepper({ setLoading, setGeneratedCode }: ImageFormStepProps) {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set<number>());

    const isStepOptional = (step: number) => {
        return step === 1;
    };

    const isStepSkipped = (step: number) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
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
        setActiveStep(0);
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                <Step key="image">
                    <StepLabel>Upload image</StepLabel>
                </Step>
                <Step key="framework">
                    <StepLabel optional={<Typography variant="caption">Optional</Typography>}>
                        Select
                    </StepLabel>
                </Step>
                <Step key="yay">
                    <StepLabel>yay</StepLabel>
                </Step>
            </Stepper>
            {
                activeStep === 0 && (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                           Please, leave your fantastic UML sequence diagram here ⬇️
                        </Typography>
                        <ImageFormStep setLoading={setLoading} setGeneratedCode={setGeneratedCode} />
                    </React.Fragment>
                )
            }
            {
                activeStep === 1 && (
                    <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                            Select your favourite programming language and framework
                        </Typography>
                    </React.Fragment>
                )
            }
            {activeStep === numberOfSteps - 1 && (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            )}
            <React.Fragment>
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
                    <Button onClick={handleNext}>
                        {activeStep === numberOfSteps - 1 ? 'Finish' : 'Next'}
                    </Button>
                </Box>
            </React.Fragment>
        </Box>
    );
}
