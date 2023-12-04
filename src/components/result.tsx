import {PromptInfo} from "@uml2code/view/sequence-diagram-to-code";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
    useTheme
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Summary from "@uml2code/components/summary";
import {CodeBlockViewer} from "@uml2code/components/code-block-viewer";
import Grid from "@mui/system/Unstable_Grid";

interface ResultProps {
    generatedCode: string;
    promptText: string;
    prompt: PromptInfo;
}

export default function Result({ generatedCode, promptText, prompt }: ResultProps) {
    const theme = useTheme();

    const accordionStyle =  {
        backgroundColor: theme.palette.secondary.main,
        border: '1px',
    }

    return <Grid container justifyContent='center'>
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