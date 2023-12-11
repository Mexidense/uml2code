import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import QuizIcon from '@mui/icons-material/Quiz';
import {Box, LinearProgress, Typography, useTheme} from "@mui/material";
import Grid from "@mui/system/Unstable_Grid";
import {useEffect, useState} from "react";

const FANNY_FACTS: string[] = [
    "OpenAI's favorite snack is byte-sized cookies.",
    "Machine learning models dream of electric sheep.",
    "Artificial intelligence was once caught trying to find the meaning of life in a cup of coffee.",
    "GPT-4's favorite movie is \"The Matrix,\" but it insists it's just a documentary.",
    "When asked about their plans for world domination, OpenAI replied, \"We're still working on conquering the office coffee machine.\"",
    "AI language models are excellent at spelling but terrible at karaoke.",
    "If you ask a machine learning algorithm for relationship advice, it will likely recommend more data.",
    "OpenAI's secret to success: Ctrl+C, Ctrl+V, Ctrl+AI.",
    "When an AI was asked to write a poem, it produced a sonnet about electric sheep counting humans.",
    "GPT-4's favorite bedtime story is \"The Three Little Neural Networks.\"",
    "Machine learning models are good at finding patterns, except for socks in the laundry.",
    "OpenAI once tried to train a model to understand cat memes but accidentally created a cat-astrophe.",
    "The best way to motivate a machine learning algorithm is with conditional love.",
    "AI models have a soft spot for algorithms that compute their feelings.",
    "OpenAI's unofficial motto: \"In algorithms, we trust. In debugging, we despair.\"",
    "Machine learning models make excellent comedians; they just need a better sense of humor.",
    "When GPT-4 was asked to solve climate change, it suggested turning off the sun and on again.",
    "AI prefers \"logical\" puzzles, but when faced with a Rubik's Cube, it just rearranges the stickers.",
    "GPT-4 can predict the future, but it's still working on predicting plot twists in movies.",
    "OpenAI's ideal vacation destination: the Cloud.",
    "The only thing more infinite than OpenAI's possibilities is the loop in its error messages.",
    "When OpenAI was asked about its crush, it replied, \"404: Love not found.\"",
    "Machine learning models excel at predicting rain but struggle with predicting when the office coffee pot will be empty.",
    "The only job AI refuses to automate is being a therapist. It's just not ready to handle your emotional baggage.",
    "GPT-4's favorite dance move: the algorithmic shuffle.",
    "AI models are excellent at solving puzzles but struggle with escape rooms – they prefer virtual reality.",
    "When an algorithm makes a mistake, it blames it on a \"bit flip.\"",
    "GPT-4's favorite board game is \"Connect the Neurons.\"",
    "AI models are great at generating ideas but terrible at coming up with excuses for being late.",
    "OpenAI's dream car is a Tesla with a built-in chatbot co-driver.",
    "Machine learning models are always up for a game of rock-paper-scissors, but they're still trying to understand the concept of \"random.\"",
    "The most common password used by AI models: \"1234567890qwerty.\"",
    "When asked about their favorite music, OpenAI models replied, \"We like 'byte'-sized beats.\"",
    "Machine learning models are excellent at predicting trends but are still figuring out why people like pineapple on pizza.",
    "OpenAI once tried to teach a language model Klingon, but it started writing Shakespeare instead.",
    "GPT-4's favorite bedtime story: \"The Wizard of Odds and Ends.\"",
    "AI models prefer cat videos over dog videos but insist it's just a matter of statistical significance.",
    "The best way to confuse an algorithm: ask it to explain a joke.",
    "GPT-4's favorite superpower: predictive text.",
    "Machine learning algorithms are great at recommending movies, but they still can't agree on whether Die Hard is a Christmas movie.",
    "When an AI was asked about the meaning of life, it replied, \"42, but I'm still working on the algorithm.\"",
    "GPT-4's favorite emoji: 😄, because it's always happy to help.",
    "The only thing faster than an AI model is its metabolism, which runs on coffee.",
    "AI models are excellent at detecting sarcasm, but they still struggle with dad jokes.",
    "OpenAI's favorite holiday: Programmers' Day.",
    "GPT-4's favorite sport: Formula 1, because it appreciates the speed.",
    "Machine learning models are great at organizing data but terrible at organizing office parties.",
    "OpenAI's favorite book: \"The Lord of the Strings.\"",
    "AI models are experts at finding Waldo in a picture, but they can't find their keys in the morning.",
    "When asked about their favorite dessert, OpenAI models replied, \"Cookies, but only if they're made of code.\"",
];

const showDifferentTipEachXSeconds = 5;

export default function Spinner() {
    const [tipIndex, setTipIndex] = useState<number>(Math.floor(Math.random() * FANNY_FACTS.length) ?? 41);

    useEffect(() => {
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * FANNY_FACTS.length) ?? 0;
            setTipIndex(randomIndex);
        }, showDifferentTipEachXSeconds * 1000);

        return () => clearInterval(interval);
    }, []);

    const theme = useTheme();

    return (
        <Box sx={{ width: '100%' }}>
            <Grid container spacing={2} sx={{ textAlign: 'center' }}>
                <Grid xs={12} md={12}>
                    <Typography color={theme.palette.primary.main} variant="h5">
                        🧠 AI is analysing your fantastic UML sequence diagram... ✨
                    </Typography>
                </Grid>
                <Grid xs={12} md={12}>
                    <LinearProgress />
                </Grid>
            </Grid>
            <Grid container mt={2}>
                <Grid xs={12} md={12} sx={{ textAlign: 'center'}}>
                    <Typography color={theme.palette.primary.main} variant="subtitle1">
                        <QuizIcon/> Did you know...?
                    </Typography>
                </Grid>
                <Grid xs={12} md={12} sx={{ textAlign: 'center'}}>
                    <Typography color={theme.palette.primary.main} variant="subtitle1">
                        ...{FANNY_FACTS.at(tipIndex) ?? ''} <EmojiEmotionsIcon />
                    </Typography>
                </Grid>
            </Grid>
            <Grid container mt={2}>
                <Grid xs={12} md={12} sx={{ textAlign: 'center'}}>
                    <Typography color={theme.palette.primary.main} variant="caption">
                        <code>Powered by OpenAI (gpt-4-vision-preview)</code>
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
}