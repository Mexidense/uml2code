"use client"
import {ChangeEvent, CSSProperties, DragEvent, SyntheticEvent, useRef, useState} from 'react';
import Grid from "@mui/system/Unstable_Grid";
import {Alert, Box, Snackbar, Stack, useTheme} from "@mui/material";
import * as React from "react";

interface ImageFileUploaderProps {
    setUploadedImage: (imageSource: string|null) => void;
}

export function ImageFileUploader({ setUploadedImage }: ImageFileUploaderProps) {
    const [isOver, setIsOver] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [displayErrorAlert, setDisplayErrorAlert] = useState(false);
    const [errorAlertMessage, setErrorAlertMessage] = useState('');

    const throwErrorAlert = (message: string) => {
        setUploadedImage(null);
        setErrorAlertMessage(message);
        setDisplayErrorAlert(true);
    }

    const handleErrorAlertClose = (event?: SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setDisplayErrorAlert(false);
    }

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsOver(true);
    };

    const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsOver(false);
    };

    const handleDrop = async (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        setIsOver(false);

        const droppedFiles = Array.from(event.dataTransfer.files);
        if (droppedFiles.length > 1) {
            setUploadedImage(null);
            throwErrorAlert('Please, drag and drop only one image file (PNG/JPG).')

            return;
        }

        const onlyOneFile = droppedFiles[0];

        try {
            await processFile(onlyOneFile);
        } catch (error) {
            throwErrorAlert('Please, drag and drop only one image file (PNG/JPG).')
        }
    };

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];

        if (selectedFile) {
            event.preventDefault();
            setIsOver(false);

            try {
                await processFile(selectedFile);
            } catch (error) {
                throwErrorAlert('File not allowed: Is it a PNG/JPG image file?')
            }
        }
    };

    const processFile = async (file: File) => {
        return new Promise<void>((resolve, reject) => {
            const reader = new FileReader();

            reader.onloadend = async () => {
                try {
                    const file = reader.result as string;

                    if (!file.includes('data:image')) {
                        reject();
                    }
                    setUploadedImage(file);

                    resolve();
                } catch (error) {
                    throwErrorAlert('File not allowed: Is it a PNG/JPG image file?')

                    reject(error);
                }
            };

            reader.onerror = (error) => {
                setUploadedImage(null);
                setDisplayErrorAlert(true);

                reject(error);
            };

            reader.readAsDataURL(file);
        });
    };

    const containerStyle: CSSProperties = {
        padding: '70px 0',
        textAlign: 'center',
        border: '2px dotted',
        borderRadius: '24px',
        color: 'primary',
        transition: 'background-color 0.3s',
    };

    const theme = useTheme();
    const hoverStyle: CSSProperties = {
        backgroundColor: theme.palette.secondary.main,
        cursor: 'pointer'
    };

    return (
        <>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar open={displayErrorAlert} autoHideDuration={6000} onClose={handleErrorAlertClose}>
                    <Alert severity="error">{errorAlertMessage}</Alert>
                </Snackbar>
            </Stack>
            <Box
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleClick}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{
                    ...containerStyle,
                    ...(isOver || isHovered ? hoverStyle : {}),
                }}
            >
                <Box sx={{ width: '100%' }}>
                    <Grid container spacing={4}>
                        <input
                            type="file"
                            accept="image/png, image/jpeg"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            onChange={handleFileInputChange}
                        />
                        <Grid xs={12} md={12}>
                            Drag and drop your UML sequence diagram here 📥
                        </Grid>
                        <Grid xs={12} md={12}>
                            <code>(PNG/JPG image file. Maximum size: 4MB)</code>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
}