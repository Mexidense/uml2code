"use client"
import {useState} from "react";
import Spinner from "@uml2code/components/spinner";
import {GenerateCode} from "@uml2code/components/generate-code";
import Grid from "@mui/system/Unstable_Grid";
import {Box, Typography} from "@mui/material";

export default function CodeGeneration() {
    const [loading, setLoading] = useState(false);

    return (
        <main>
            <Box sx={{ width: '100%', padding: '0 10px' }}>
                <Grid container spacing={2}>
                    <Grid xs={12} md={12}>
                        <Box sx={{ textAlign: 'center'}}>
                            <Typography align="center" variant="h1" color="primary">
                                UML2Code
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid xs={12} md={12}>
                        {loading && <Spinner />}
                    </Grid>
                    <Grid xs={12} md={12}>
                        <GenerateCode setLoading={setLoading} loading={loading} />
                    </Grid>
                </Grid>
            </Box>
        </main>
    )
}
