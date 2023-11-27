"use client"
import {Container, CssBaseline, ThemeProvider} from "@mui/material";
import CodeGeneration from "@uml2code/view/code-generation/code-generation";
import {StickyFooter} from "@uml2code/components/sticky-footer";
import {getTheme} from "@uml2code/app/theme";

export default function Home() {
    return (
        <ThemeProvider theme={getTheme()}>
            <CssBaseline />
            <main>
                <Container maxWidth="md">
                    <CodeGeneration />
                </Container>
                <StickyFooter />
            </main>
        </ThemeProvider>
  )
}
