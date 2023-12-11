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
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                <Link href="/" underline="none">
                    UML2Code
                </Link>
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                    <ListItem key={item.label}>
                        <ListItemButton sx={{ textAlign: 'center' }} href={item.url} target="_blank">
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
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                   <Link
                       color={theme => theme.palette.secondary.main}
                       href="/"
                       underline="none"
                       sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                   >
                       <Typography
                           variant="h6"
                           component="div"
                       >
                           UML2Code
                       </Typography>
                   </Link>
                    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                        {navItems.map((item) => (
                            <Button
                                key={item.label}
                                sx={{ color: theme => theme.palette.secondary.main }}
                                href={item.url}
                                target="_blank"
                                endIcon={item.icon}
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
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}
                >
                    {drawer}
                </Drawer>
            </nav>
        </Box>
    );
}