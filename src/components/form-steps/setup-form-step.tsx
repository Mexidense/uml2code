import Box from "@mui/material/Box";
import Grid from "@mui/system/Unstable_Grid";
import Typography from "@mui/material/Typography";
import {Autocomplete, Checkbox, FormControlLabel, TextField, useTheme} from "@mui/material";
import * as React from "react";
import ScienceIcon from "@mui/icons-material/Science";


type ProgramingLanguagesType = {
    value: string;
    frameworks: string[]
}

const PROGRAMING_LANGUAGES_LIST: readonly ProgramingLanguagesType[] = [
    { value: 'PHP', frameworks: ['Laravel', 'Symfony', 'CodeIgniter', 'Yii', 'CakePHP', 'Slim', 'Laminas', 'FuelPHP', 'Flight'] },
    { value: 'Typescript', frameworks: ['NestJS', 'NextJS', 'Express', 'React', 'VueJS', 'Angular']},
    { value: 'Javascript', frameworks: ['Vanilla code', 'NestJS', 'MeteorJS', 'Express', 'React', 'VueJS', 'Angular', 'EmberJS']},
    { value: 'Python', frameworks: ['Django', 'Flask', 'FastAPI', 'Pyramid', 'Bottle'] },
    { value: 'Ruby', frameworks: ['Ruby on Rails', 'Sinatra', 'Hanami', 'Padrino', 'Cuba'] },
    { value: 'Java', frameworks: ['Spring Framework', 'Apache Struts', 'Apache Wicket', 'Play', 'Vaadin'] },
    { value: 'Golang', frameworks: ['Gin', 'Echo', 'Beego', 'Revel', 'Fiber'] },
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

interface SetupFormStepProps {
    isGeneratingCode: boolean;
    programmingLanguage: string|null;
    framework: string|null;
    architecture: string|null;
    wantTest: boolean;
    setProgrammingLanguage: (value: string|null) => void;
    setFramework: (value: string|null) => void;
    setArchitecture: (value: string|null) => void;
    setWantTest: (prev: (prev: boolean) => boolean) => void;
}

export default function SetupFormStep({ isGeneratingCode, programmingLanguage, framework, architecture, wantTest, setProgrammingLanguage, setFramework, setArchitecture, setWantTest }: SetupFormStepProps) {
    const theme = useTheme();

    return (
        <Grid container spacing={2}>
            <Box sx={{ width: '100%', alignItems: 'center'}}>
                <Grid xs={12} md={12} style={{ textAlign: 'center', alignItems: 'center' }}>
                    <Typography
                        color={theme.palette.primary.main}
                        sx={{ mt: 2, mb: 1, ml: 1, textAlign: 'left', fontStyle: 'italic' }}
                        variant="subtitle1"
                    >
                        Select your favourite programming language, framework and software architecture
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
                                    setFramework(null)
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
                                    onChange={() => setWantTest((prev: boolean) => !prev)}
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
    )
}