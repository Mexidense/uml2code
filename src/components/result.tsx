import {PromptInfo} from "@uml2code/view/sequence-diagram-to-code";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    SpeedDial,
    SpeedDialAction,
    SpeedDialIcon,
    Typography,
    useTheme
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Summary from "@uml2code/components/summary";
import {CodeBlockViewer} from "@uml2code/components/code-block-viewer";
import Grid from "@mui/system/Unstable_Grid";
import ReplayIcon from '@mui/icons-material/Replay';

interface ResultProps {
    generatedCode: string;
    promptText: string;
    prompt: PromptInfo;
    reset: () => void;
}

export default function Result({ generatedCode, promptText, prompt, reset }: ResultProps) {
    const theme = useTheme();

    const accordionStyle =  {
        backgroundColor: theme.palette.secondary.main,
        border: '1px',
    }

    const handleNewRequestOnClick = () => {
        reset();
    }

    return <Grid container justifyContent='center'>
            <Grid xs={12} md={12} sx={{ mb: 2 }}>
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
                        componentsProps={{
                            tooltip: {
                                sx: {
                                    bgcolor: "pink",
                                    color: "red"
                                }
                            }
                        }}
                        tooltipOpen
                        key="new-request"
                        icon={<ReplayIcon />}
                        tooltipTitle="New request"
                        onClick={handleNewRequestOnClick}
                    />
                </SpeedDial>
            </Grid>
            <Grid xs={12} md={12} sx={{ mb: 2 }}>
                <Accordion
                    sx={ accordionStyle }
                    defaultExpanded={ true }
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="code-content"
                        id="code-header"
                    >
                        <Typography variant="subtitle1" color={theme.palette.primary.main}>Your beautiful generated code 💅</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <CodeBlockViewer generatedCode={generatedCode} />
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Grid xs={12} md={12}>
                <Accordion
                    sx={ accordionStyle }
                    defaultExpanded={ false }
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="code-content"
                        id="code-header"
                    >
                        <Typography variant="subtitle1" color={theme.palette.primary.main}>Your request 🙋</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Summary image={prompt.imageSource} promptText={promptText} prompt={prompt}/>
                    </AccordionDetails>
                </Accordion>
            </Grid>
        </Grid>
}