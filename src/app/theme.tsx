import { createTheme } from '@mui/material/styles';
import {responsiveFontSizes} from "@mui/material";

let theme = createTheme({
    palette: {
        primary: {
            main: '#739072',
        },
        secondary: {
            main: '#ECE3CE',
        },
    },
});
export const getTheme = () => responsiveFontSizes(theme);