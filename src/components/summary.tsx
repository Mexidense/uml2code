import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ScienceIcon from "@mui/icons-material/Science";
import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Collapse,
    Grid,
    IconButton,
    IconButtonProps, Typography,
    styled, useTheme
} from "@mui/material";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import {useState} from "react";

import {PromptInfo} from "@uml2code/view/sequence-diagram-to-code";


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
        <Grid alignItems="center" flexDirection="column" flexWrap="nowrap" id="request-box" justifyContent="center" container>
            <Grid md={12} sx={{ minWidth: 300 }} xs={12} item>
                <Box sx={ boxStyle } >
                    <Card>
                        <CardMedia
                            alt="UML sequence diagram"
                            component="img"
                            height={300}
                            image={image}
                            sx={{ padding: "1em 1em 0 1em", objectFit: 'cover' }}
                        />
                        <CardContent>
                            <Grid alignItems="flex-end" justifyContent='center' container>
                                <Grid md={6} xs={12} item>
                                    <Typography color="text.primary" variant="h5">
                                        Programming language:
                                    </Typography>
                                </Grid>
                                <Grid md={6} xs={12} item>
                                    <Typography color={theme.palette.primary.main} textAlign="right" variant="h5">
                                        {prompt.programmingLanguage}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid alignItems="flex-end" justifyContent='center' container>
                                <Grid md={6} xs={12} item>
                                    <Typography color="text.primary" variant="h5">
                                        Framework:
                                    </Typography>
                                </Grid>
                                <Grid md={6} xs={12} item>
                                    <Typography color={theme.palette.primary.main} textAlign="right" variant="h5">
                                        {prompt.framework}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid alignItems="flex-end" justifyContent='center' container>
                                <Grid md={6} xs={12} item>
                                    <Typography color="text.primary" variant="h5">
                                        Software architecture:
                                    </Typography>
                                </Grid>
                                <Grid md={6} xs={12} item>
                                    <Typography color={theme.palette.primary.main} textAlign="right" variant="h5">
                                        {prompt.architecture}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid alignItems="flex-end" justifyContent='center' container>
                                <Grid md={6} xs={12} item>
                                    <Typography color="text.primary" variant="h5">
                                        Did you want to add test?
                                    </Typography>
                                </Grid>
                                <Grid md={6} xs={12} item>
                                    <Typography color={theme.palette.primary.main} textAlign="right" variant="h5">
                                        {prompt.isItNeedTests ? <ScienceIcon /> : <CloseIcon />} {prompt.isItNeedTests ? 'Yes' : 'No'}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions>
                            <Grid alignItems="center" id='prompt-details' justifyContent='right' textAlign="right" container onClick={handleExpandClick}>
                                <Grid md={11} xs={11}>
                                    <Typography color={theme.palette.primary.main} variant="body2">
                                        See more details
                                    </Typography>
                                </Grid>
                                <Grid md={1} xs={1}>
                                    <ExpandMore
                                        aria-expanded={expandedDetails}
                                        aria-label="show more details"
                                        expand={expandedDetails}
                                    >
                                        <ExpandMoreIcon />
                                    </ExpandMore>
                                </Grid>
                            </Grid>
                        </CardActions>
                        <Collapse in={expandedDetails} timeout="auto" unmountOnExit>
                            <CardContent>
                                <Typography variant="subtitle2" paragraph>Prompt</Typography>
                                <Typography color={theme.palette.primary.main} variant="body2" paragraph>
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