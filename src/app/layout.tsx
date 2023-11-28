"use client"
import { Inter } from 'next/font/google'
import {getTheme} from "@uml2code/app/theme";
import {Box, Container, CssBaseline, ThemeProvider} from "@mui/material";
import Header from "@uml2code/view/header";
import {StickyFooter} from "@uml2code/view/sticky-footer";

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <ThemeProvider theme={getTheme()}>
        <CssBaseline />
        <html lang="en">
            <body className={inter.className}>
                <Container>
                    <Header />
                    <Box sx={{ marginTop: 10 }}>
                        <div className={inter.className}>
                            {children}
                        </div>
                    </Box>
                    <StickyFooter />
                </Container>
            </body>
        </html>
      </ThemeProvider>
  )
}
