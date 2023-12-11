import { responsiveFontSizes } from "@mui/material";
import { createTheme } from '@mui/material/styles';

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