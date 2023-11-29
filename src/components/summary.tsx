import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Collapse,
    Grid,
    IconButton,
    IconButtonProps, styled,
    Typography, useTheme
} from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {useState} from "react";
import {PromptInfo} from "@uml2code/view/sequence-diagram-to-code";
import ScienceIcon from "@mui/icons-material/Science";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";

interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    maxWidth: 600,
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

interface SummaryProps {
    image: string;
    promptText: string;
    prompt: PromptInfo;
}

export default function Summary({ image, promptText, prompt }: SummaryProps) {
    const [expandedDetails, setExpandedDetails] = useState(false);

    const handleExpandClick = () => {
        setExpandedDetails(!expandedDetails);
    };

    const boxStyle = { margin: '0' };
    const theme = useTheme();

    return (
        <Grid container flexDirection="column" justifyContent="center" id="request-box" alignItems="center" flexWrap="nowrap">
            <Grid item xs={12} md={12} sx={{ minWidth: 300 }}>
                <Box sx={ boxStyle } >
                    <Card>
                        <CardMedia
                            component="img"
                            height={300}
                            image={image}
                            alt="UML sequence diagram"
                            sx={{ padding: "1em 1em 0 1em", objectFit: 'cover' }}
                        />
                        <CardContent>
                            <Grid container justifyContent='center' alignItems="flex-end">
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h5" color="text.primary">
                                        Programming language:
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h5" textAlign="right" color={theme.palette.primary.main}>
                                        {prompt.programmingLanguage}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent='center' alignItems="flex-end">
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h5" color="text.primary">
                                        Framework:
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h5" textAlign="right" color={theme.palette.primary.main}>
                                        {prompt.framework}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent='center' alignItems="flex-end">
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h5" color="text.primary">
                                        Software architecture:
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h5" textAlign="right" color={theme.palette.primary.main}>
                                        {prompt.architecture}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container justifyContent='center' alignItems="flex-end">
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h5" color="text.primary">
                                        Did you want to add test?
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Typography variant="h5" textAlign="right" color={theme.palette.primary.main}>
                                        {prompt.isItNeedTests ? <ScienceIcon /> : <CloseIcon />} {prompt.isItNeedTests ? 'Yes' : 'No'}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Grid container id='prompt-details' textAlign="right" justifyContent='right' alignItems="center" onClick={handleExpandClick}>
                                <Grid xs={11} md={11}>
                                    <Typography variant="body2" color={theme.palette.primary.main}>
                                        See more details
                                    </Typography>
                                </Grid>
                                <Grid xs={1} md={1}>
                                    <ExpandMore
                                        expand={expandedDetails}
                                        aria-expanded={expandedDetails}
                                        aria-label="show more details"
                                    >
                                        <ExpandMoreIcon />
                                    </ExpandMore>
                                </Grid>
                            </Grid>
                        </CardActions>
                        <Collapse in={expandedDetails} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography paragraph variant="subtitle2">Prompt</Typography>
                                <Typography paragraph variant="body2" color={theme.palette.primary.main}>
                                    <code>{promptText}</code>
                                </Typography>
                            </CardContent>
                        </Collapse>
                    </Card>
                </Box>
            </Grid>
        </Grid>
    )
}