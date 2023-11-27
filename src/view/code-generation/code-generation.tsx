"use client"
import {useState} from "react";
import Spinner from "@uml2code/components/spinner/spinner";
import {GenerateCode} from "@uml2code/components/generate-code";
import Grid from "@mui/system/Unstable_Grid";
import {Box} from "@mui/material";

export default function CodeGeneration() {
    const [loading, setLoading] = useState(false);

    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={2}>
                <Grid xs={12} md={12}>
                    <Box sx={{ textAlign: 'center'}}>
                        <h1>UML2Code</h1>
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
    )
}
