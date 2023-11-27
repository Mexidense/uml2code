import {AppBar, Box, Toolbar, Typography} from "@mui/material";

export function StickyFooter() {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '30vh'
            }}
        >
            <AppBar position="fixed" style={{ top: 'auto', bottom: 0, alignItems: 'flex-end'}} color="primary">
                <Toolbar>
                    <Typography variant="subtitle2" color="secondary">
                        <code>Made with ❤️ by Salvador Briones</code>
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
    );
}