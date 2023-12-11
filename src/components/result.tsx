import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography,
    useTheme
} from "@mui/material";
import Grid from "@mui/system/Unstable_Grid";

import {CodeBlockViewer} from "@uml2code/components/code-block-viewer";
import Summary from "@uml2code/components/summary";
import {PromptInfo} from "@uml2code/view/sequence-diagram-to-code";

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

    return <Grid justifyContent='center' container>
            <Grid md={12} sx={{ mb: 2 }} xs={12}>
                <Accordion
                    defaultExpanded={ true }
                    sx={ accordionStyle }
                >
                    <AccordionSummary
                        aria-controls="code-content"
                        expandIcon={<ExpandMoreIcon />}
                        id="code-header"
                    >
                        <Typography color={theme.palette.primary.main} variant="subtitle1">Your beautiful generated code 💅</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <CodeBlockViewer generatedCode={generatedCode} />
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Grid md={12} xs={12}>
                <Accordion
                    defaultExpanded={ false }
                    sx={ accordionStyle }
                >
                    <AccordionSummary
                        aria-controls="code-content"
                        expandIcon={<ExpandMoreIcon />}
                        id="code-header"
                    >
                        <Typography color={theme.palette.primary.main} variant="subtitle1">Your request 🙋</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Summary image={prompt.imageSource} prompt={prompt} promptText={promptText}/>
                    </AccordionDetails>
                </Accordion>
            </Grid>
        </Grid>
}