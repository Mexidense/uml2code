import {AppBar, Box, Link, Toolbar, Typography} from "@mui/material";

export function StickyFooter() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '10vh'
            }}
        >
            <AppBar color="primary" position="fixed" style={{ top: 'auto', bottom: 0, alignItems: 'flex-end'}}>
                <Toolbar>
                    <Typography color="secondary" variant="subtitle2">
                        <code>Made with ❤️ by <Link color="secondary" href="https://www.linkedin.com/in/sbrionesr/" target="_blank" underline="hover">Salvador Briones</Link></code>
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}