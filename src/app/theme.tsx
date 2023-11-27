import { createTheme } from '@mui/material/styles';
import {responsiveFontSizes} from "@mui/material";

let theme = createTheme({
    palette: {
        primary: {
            main: '#005B41',
        },
        secondary: {
            main: '#ECE3CE',
        },
    },
});
export const getTheme = () => responsiveFontSizes(theme);