import GitHubIcon from '@mui/icons-material/GitHub';
import MenuIcon from '@mui/icons-material/Menu';
import {
    AppBar,
    Box, Button,
    CssBaseline,
    Divider, Drawer, IconButton,
    Link,
    List,
    ListItem,
    ListItemButton, ListItemIcon,
    ListItemText, Toolbar,
    Typography
} from "@mui/material";
import React from "react";

interface Props {
    window?: () => Window;
}

const drawerWidth = 240;
type Pages = {
    label: string;
    url: string;
    icon: React.JSX.Element
}
const navItems: Pages[] = [
    {
        label: 'About me',
        url: 'https://github.com/Mexidense',
        icon: <GitHubIcon/>
    }
]

export default function Header(props: Props) {
    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box sx={{ textAlign: 'center' }} onClick={handleDrawerToggle}>
            <Typography sx={{ my: 2 }} variant="h6">
                <Link href="/" underline="none">
                    UML2Code
                </Link>
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.label}>
                        <ListItemButton href={item.url} sx={{ textAlign: 'center' }} target="_blank">
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        aria-label="open drawer"
                        color="inherit"
                        edge="start"
                        sx={{ mr: 2, display: { sm: 'none' } }}
                        onClick={handleDrawerToggle}
                    >
                        <MenuIcon />
                    </IconButton>
                   <Link
                       color={theme => theme.palette.secondary.main}
                       href="/"
                       sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                       underline="none"
                   >
                       <Typography
                           component="div"
                           variant="h6"
                       >
                           UML2Code
                       </Typography>
                   </Link>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <Button
                                endIcon={item.icon}
                                href={item.url}
                                key={item.label}
                                sx={{ color: theme => theme.palette.secondary.main }}
                                target="_blank"
                            >
                                {item.label}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    container={container}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    open={mobileOpen}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                    variant="temporary"
                    onClose={handleDrawerToggle}
                >
                    {drawer}
                </Drawer>
            </nav>
        </Box>
    );
}