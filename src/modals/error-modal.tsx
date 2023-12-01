import {Box, Button, Modal, Typography, useTheme} from "@mui/material";
import {SyntheticEvent, useState} from "react";
import Image from 'next/image'
import RestartAltIcon from '@mui/icons-material/RestartAlt';

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
            disableEscapeKeyDown
            open={openModal}
            // @ts-ignore
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <>
                <Box sx={style}>
                    <Typography id="modal-modal-title" textAlign="center" color={theme.palette.primary.main} variant="h5" component="h2">
                        Open AI is overwhelmed 😢
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Image
                            src="/issue-image-modal.png"
                            alt="OpenAI failed"
                            loading="lazy"
                            layout="responsive"
                            width={400}
                            height={400}
                        />
                    </Typography>
                    {
                        errorMessage && (
                            <Box p={2} sx={{ backgroundColor: '#000', color: '#39FF14' }} textAlign="left">
                                <Typography variant="caption" mt={2}>
                                    <code>❗️ {errorMessage}</code>
                                </Typography>
                            </Box>
                        )
                    }
                    <Typography textAlign="center" mt={2}>
                        <Button
                            sx={{ border: '1px solid #000', borderColor: theme.palette.primary.main }}
                            endIcon={<RestartAltIcon />}
                            onClick={handleOpen}>
                            Try again
                        </Button>
                    </Typography>
                </Box>
            </>
        </Modal>
    </>
}