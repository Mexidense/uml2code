import ScienceIcon from "@mui/icons-material/Science";
import {Autocomplete, Checkbox, FormControlLabel, TextField, useTheme} from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/system/Unstable_Grid";
import * as React from "react";


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
        <Grid spacing={2} container>
            <Box sx={{ width: '100%', alignItems: 'center'}}>
                <Grid md={12} style={{ textAlign: 'center', alignItems: 'center' }} xs={12}>
                    <Typography
                        color={theme.palette.primary.main}
                        sx={{ mt: 2, mb: 1, ml: 1, textAlign: 'left', fontStyle: 'italic' }}
                        variant="subtitle1"
                    >
                        Select your favourite programming language, framework and software architecture
                    </Typography>
                    <Grid spacing={2} container>
                        <Grid md={4} style={{ textAlign: 'center', alignItems: 'center' }} xs={12}>
                            <Autocomplete
                                color="secondary"
                                disabled={isGeneratingCode}
                                getOptionLabel={(option) => option}
                                id="programming-language"
                                options={PROGRAMING_LANGUAGES_LIST.map((value) => value.value)}
                                renderInput={(params) =>
                                    <TextField {...params} color="primary" label="Programming language" />
                                }
                                sx={{ width: '100%' }}
                                value={programmingLanguage}
                                autoComplete
                                disablePortal
                                onChange={(_event: React.SyntheticEvent<Element, Event>, newValue: string | null) => {
                                    setProgrammingLanguage(newValue);
                                    setFramework(null)
                                }}
                            />
                        </Grid>
                        <Grid md={4} style={{ textAlign: 'center', alignItems: 'center' }} xs={12}>
                            <Autocomplete
                                color="secondary"
                                disabled={isGeneratingCode}
                                getOptionLabel={(option) => option}
                                id="framework"
                                options={PROGRAMING_LANGUAGES_LIST.find((value) => value.value === programmingLanguage)?.frameworks ?? []}
                                renderInput={(params) =>
                                    <TextField {...params} color="primary" label="Frameworks" />
                                }
                                sx={{ width: '100%' }}
                                value={framework}
                                autoComplete
                                disablePortal
                                onChange={(_event: React.SyntheticEvent<Element, Event>, newValue: string | null) => {
                                    setFramework(newValue);
                                }}
                            />
                        </Grid>
                        <Grid md={4} style={{ textAlign: 'center', alignItems: 'center' }} xs={12}>
                            <Autocomplete
                                color="secondary"
                                disabled={isGeneratingCode}
                                getOptionLabel={(option) => option}
                                id="software-architecture"
                                options={SOFTWARE_ARCHITECTURES}
                                renderInput={(params) =>
                                    <TextField {...params} color="primary" label="Software architecture" />
                                }
                                sx={{ width: '100%' }}
                                value={architecture}
                                autoComplete
                                disablePortal
                                onChange={(_event: React.SyntheticEvent<Element, Event>, newValue: string | null) => {
                                    setArchitecture(newValue);
                                }}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid md={12} style={{ display: 'flex', flexDirection: 'column', textAlign: 'center', alignItems: 'center' }} xs={12}>
                    <Grid md={4} style={{ textAlign: 'center', alignItems: 'center' }} xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={wantTest}
                                    checkedIcon={<ScienceIcon />}
                                    color="success"
                                    onChange={() => setWantTest((prev: boolean) => !prev)}
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