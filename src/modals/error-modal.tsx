import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {Box, Button, Modal, Typography, useTheme} from "@mui/material";
import Image from 'next/image'
import {SyntheticEvent, useState} from "react";

interface ErrorModalProps {
    errorMessage: string|null;
    open: boolean;
    setReset: () => void;
}

export function ErrorModal ({ errorMessage, open, setReset }: ErrorModalProps) {
    const [openModal, setOpenModal] = useState(open);
    const handleOpen = () => {
        setOpenModal(false);
        setReset();
    }
    const handleClose = (_event?: SyntheticEvent | Event, reason?: "backdropClick" | "escapeKeyDown") => {
        if (reason && reason == "backdropClick") {
            return;
        }

        setOpenModal(false);
    }

    const theme = useTheme();
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: theme.palette.secondary.main,
        border: '1px solid #000',
        boxShadow: 24,
        p: 4,
    };

    return <>
        <Modal
            aria-describedby="modal-modal-description"
            aria-labelledby="modal-modal-title"
            open={openModal}
            disableEscapeKeyDown
            // @ts-ignore
            onClose={handleClose}
        >
            <>
                <Box sx={style}>
                    <Typography color={theme.palette.primary.main} component="h2" id="modal-modal-title" textAlign="center" variant="h5">
                        Open AI is overwhelmed 😢
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Image
                            alt="OpenAI failed"
                            height={400}
                            layout="responsive"
                            loading="lazy"
                            src="/issue-image-modal.png"
                            width={400}
                        />
                    </Typography>
                    {
                        errorMessage && (
                            <Box p={2} sx={{ backgroundColor: '#000', color: '#39FF14' }} textAlign="left">
                                <Typography mt={2} variant="caption">
                                    <code>❗️ {errorMessage}</code>
                                </Typography>
                            </Box>
                        )
                    }
                    <Typography mt={2} textAlign="center">
                        <Button
                            endIcon={<RestartAltIcon />}
                            sx={{ border: '1px solid #000', borderColor: theme.palette.primary.main }}
                            onClick={handleOpen}>
                            Try again
                        </Button>
                    </Typography>
                </Box>
            </>
        </Modal>
    </>
}