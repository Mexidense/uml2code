"use client"
import {useState} from "react";
import Spinner from "@uml2code/components/spinner";
import Grid from "@mui/system/Unstable_Grid";
import {Box, Typography} from "@mui/material";
import {CodeBlockViewer} from "@uml2code/components/code-block-viewer";
import FormStepper from "@uml2code/components/form-stepper";

export default function SequenceDiagramToCode() {
    const [loading, setLoading] = useState(false);
    const [generatedCode, setGeneratedCode] = useState('');


    return (
        <main style={ loading ? { cursor: 'progress' } : {}}>
            <Box sx={{ width: '100%', padding: '0 10px' }}>
                <Grid container spacing={2}>
                    <Grid xs={12} md={12}>
                        <Box sx={{ textAlign: 'center'}}>
                            <Typography align="center" variant="h4" color="primary">
                                UML sequence diagram to code
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid xs={12} md={12}>

                    </Grid>
                    <Grid xs={12} md={12}>
                        {
                            loading &&
                            <Spinner />
                        }
                    </Grid>
                    <Grid xs={12} md={12}>
                        {
                            !generatedCode &&
                            <FormStepper setLoading={setLoading} setGeneratedCode={setGeneratedCode}/>
                        }
                        {
                            generatedCode &&
                            <CodeBlockViewer generatedCode={generatedCode} />
                        }
                    </Grid>
                </Grid>
            </Box>
        </main>
    )
}
