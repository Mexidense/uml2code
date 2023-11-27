import {Box, LinearProgress} from "@mui/material";
import Grid from "@mui/system/Unstable_Grid";

export default function Spinner() {
    return (
        <Box sx={{ width: '100%', textAlign: 'center'}}>
            <Grid container spacing={2}>
                <Grid xs={12} md={12}>
                    🧠 AI is analysing your fantastic UML sequence diagram... ✨
                </Grid>
                <Grid xs={12} md={12}>
                    <LinearProgress />
                </Grid>
            </Grid>
        </Box>
    );
}