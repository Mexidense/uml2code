"use client"
import {Box, Container, CssBaseline, ThemeProvider} from "@mui/material";
import CodeGeneration from "@uml2code/view/code-generation/code-generation";
import {StickyFooter} from "@uml2code/components/sticky-footer";
import {getTheme} from "@uml2code/app/theme";
import Header from "@uml2code/components/header";

export default function Home() {
    return (
        <ThemeProvider theme={getTheme()}>
            <CssBaseline />
            <Container maxWidth="md">
                <Header/>
                <Box sx={{ marginTop: 10 }}>
                    <CodeGeneration />
                </Box>
                <StickyFooter />
            </Container>
        </ThemeProvider>
  )
}
