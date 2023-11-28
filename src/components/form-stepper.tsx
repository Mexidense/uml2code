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
import {Autocomplete, Checkbox, FormControlLabel, TextField} from "@mui/material";
import Grid from "@mui/system/Unstable_Grid";
import ScienceIcon from '@mui/icons-material/Science';
import Spinner from '@uml2code/components/spinner';

type ProgramingLanguagesType = {
    value: string;
    frameworks: string[]
}

const PROGRAMING_LANGUAGES_LIST: readonly ProgramingLanguagesType[] = [
    { value: 'Typescript', frameworks: ['React', 'VueJS', 'Angular', 'NestJS', 'NextJS', 'Express']},
    { value: 'PHP', frameworks: ['Laravel', 'Symfony', 'CodeIgniter', 'Yii', 'Phalcon', 'CakePHP', 'Slim', 'Laminas', 'FuelPHP', 'Flight'] },
    { value: 'Golang', frameworks: ['Gin', 'Echo', 'Beego', 'Revel', 'Fiber', 'Buffalo', 'Gorilla', 'Gorm', 'Iris', 'Goji'] },
    { value: 'Java', frameworks: ['Spring Framework', 'Apache Struts', 'Apache Wicket', 'Play', 'Vaadin', 'Grails', 'Dropwizard', 'Vert.x'] },
    { value: 'Ruby', frameworks: ['Ruby on Rails', 'Sinatra', 'Hanami', 'Padrino', 'Cuba', 'Merb', 'Grape', 'Camping', 'Ramaze', 'Nancy'] },
    { value: 'Python', frameworks: ['Django', 'Flask', 'FastAPI', 'Pyramid', 'Bottle', 'CherryPy', 'Tornado', 'TurboGears', 'Web2py', 'Dash'] },
];

const SOFTWARE_ARCHITECTURES: readonly string[] = [
    'Layered (N-Tier)',
    'Microservice',
    'Event Driven',
    'Microkernel',
    'Space-Based',
    'Client-Server',
    'Master-Slave',
    'Pipe-Filter',
    'Broker',
    'Peer-to-Peer'
]

interface ImageFormStepProps {
    setGeneratedCode: (value: string) => void;
    setPrompt: (value: PromptInfo) => void;
}

export default function FormStepper({ setGeneratedCode, setPrompt }: ImageFormStepProps) {
    const numberOfSteps = 2;

    const [uploadedImage, setUploadedImage] = useState<string|null>(null);
    const [programmingLanguage, setProgrammingLanguage] = React.useState<string | null>(null);
    const [framework, setFramework] = React.useState<string | null>(null);
    const [architecture, setArchitecture] = React.useState<string | null>(null);
    const [wantTest, setWantTest] = React.useState<boolean>(false);

    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set<number>());

    const [isGeneratingCode, setIsGeneratingCode] = React.useState<boolean>(false);

    const isStepOptional = (step: number) => {
        return step === numberOfSteps + 1;
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
        return activeStep === numberOfSteps - 1
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

        if (isFinalStep()) {
            setIsGeneratingCode(true);

            setPrompt({
                imageSource: uploadedImage ?? '',
                programmingLanguage: programmingLanguage ?? '',
                framework: framework ?? '',
                architectures: architecture ?? '',
                isItNeedTests: wantTest,
            })

            await generateCode();

            return;
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

    const generateCode = async () => {
        try {
            const response = await fetch('api/image-uploader', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(uploadedImage),
            });

            const result = await response.json();
            const codeGenerated = { code: result.code };

            setGeneratedCode(codeGenerated.code);
        } catch (error) {
            console.log(`❌ Something wrong generating code with AI...`, error)
        }
    };

    return (
        <Box sx={{ width: '100%', cursor: isGeneratingCode ? 'progress' : 'default'}}>
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
            {
                activeStep === 0 && (
                    <>
                        <Box sx={{ width: '100%', alignItems: 'center'}}>
                            <Grid container spacing={2}>
                                <Grid xs={12} md={12} style={{ textAlign: 'center', alignItems: 'center' }}>
                                    <Typography sx={{ mt: 2, mb: 1, textAlign: 'left' }} variant="subtitle1">
                                        Please, leave your fantastic UML sequence diagram here ⬇️
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
                        <Grid container spacing={2}>
                            <Box sx={{ width: '100%', alignItems: 'center'}}>
                                <Grid xs={12} md={12} style={{ textAlign: 'center', alignItems: 'center' }}>
                                    <Typography sx={{ mt: 2, mb: 1, textAlign: 'left'}} variant="subtitle1">
                                        Select your favourite programming language, framework and software architecture ⬇️
                                    </Typography>
                                    <Grid container spacing={2}>
                                        <Grid xs={12} md={4} style={{ textAlign: 'center', alignItems: 'center' }}>
                                            <Autocomplete
                                                autoComplete
                                                disablePortal
                                                id="programming-language"
                                                color="secondary"
                                                disabled={isGeneratingCode}
                                                options={PROGRAMING_LANGUAGES_LIST.map((value) => value.value)}
                                                getOptionLabel={(option) => option}
                                                sx={{ width: '100%' }}
                                                renderInput={(params) =>
                                                    <TextField {...params} color="primary" label="Programming language" />
                                                }
                                                value={programmingLanguage}
                                                onChange={(_event: React.SyntheticEvent<Element, Event>, newValue: string | null) => {
                                                    setProgrammingLanguage(newValue);
                                                }}
                                            />
                                        </Grid>
                                        <Grid xs={12} md={4} style={{ textAlign: 'center', alignItems: 'center' }}>
                                            <Autocomplete
                                                autoComplete
                                                disablePortal
                                                id="framework"
                                                color="secondary"
                                                disabled={isGeneratingCode}
                                                options={PROGRAMING_LANGUAGES_LIST.find((value) => value.value === programmingLanguage)?.frameworks ?? []}
                                                getOptionLabel={(option) => option}
                                                sx={{ width: '100%' }}
                                                renderInput={(params) =>
                                                    <TextField {...params} color="primary" label="Frameworks" />
                                                }
                                                value={framework}
                                                onChange={(_event: React.SyntheticEvent<Element, Event>, newValue: string | null) => {
                                                    setFramework(newValue);
                                                }}
                                            />
                                        </Grid>
                                        <Grid xs={12} md={4} style={{ textAlign: 'center', alignItems: 'center' }}>
                                            <Autocomplete
                                                autoComplete
                                                disablePortal
                                                id="software-architecture"
                                                color="secondary"
                                                disabled={isGeneratingCode}
                                                options={SOFTWARE_ARCHITECTURES}
                                                getOptionLabel={(option) => option}
                                                sx={{ width: '100%' }}
                                                renderInput={(params) =>
                                                    <TextField {...params} color="primary" label="Software architecture" />
                                                }
                                                value={architecture}
                                                onChange={(_event: React.SyntheticEvent<Element, Event>, newValue: string | null) => {
                                                    setArchitecture(newValue);
                                                }}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid xs={12} md={12} style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', alignItems: 'center' }}>
                                    <Grid xs={12} md={4} style={{ textAlign: 'center', alignItems: 'center' }}>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    checked={wantTest}
                                                    onChange={() => setWantTest((prev) => !prev)}
                                                    color="success"
                                                    checkedIcon={<ScienceIcon />}
                                                />
                                            }
                                            disabled={isGeneratingCode}
                                            label="Would you like to add tests?"
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </Grid>
                    </>
                )
            }
            {
                isGeneratingCode ?
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
                            {activeStep === numberOfSteps - 1 ? 'Generate code' : 'Next'}
                        </Button>
                    </Box>
            }
        </Box>
    );
}