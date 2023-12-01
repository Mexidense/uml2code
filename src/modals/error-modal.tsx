import {Box, Button, Modal, Typography, useTheme} from "@mui/material";
import {useState} from "react";
import Image from 'next/image'
import RestartAltIcon from '@mui/icons-material/RestartAlt';

interface ErrorModalProps {
    openProp: boolean;
    setReset: () => void;
}

export function ErrorModal ({ openProp, setReset }: ErrorModalProps) {
    const [open, setOpen] = useState(openProp);
    const handleOpen = () => {
        setOpen(false);
        setReset();
    }
    const handleClose = () => setOpen(false);

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
            open={open}
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