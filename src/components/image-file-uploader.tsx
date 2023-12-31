"use client"
import {Alert, Box, Snackbar, Stack, Typography, useTheme} from "@mui/material";
import Grid from "@mui/system/Unstable_Grid";
import {CSSProperties, ChangeEvent, DragEvent, SyntheticEvent, useRef, useState} from 'react';
import * as React from "react";

interface ImageFileUploaderProps {
    setUploadedImage: (imageSource: string|null) => void;
}
const MAX_FILE_SIZE = 4194304;

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

    const handleErrorAlertClose = (_event?: SyntheticEvent | Event, reason?: string) => {
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
        if (onlyOneFile.size > MAX_FILE_SIZE) {
            throwErrorAlert('Maximum image size is 4MB')

            return;
        }

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
            if (selectedFile.size > MAX_FILE_SIZE) {
                throwErrorAlert('Maximum image size is 4MB')

                return;
            }

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

    const theme = useTheme();
    const containerStyle: CSSProperties = {
        padding: '70px 0',
        textAlign: 'center',
        border: '2px dotted',
        borderRadius: '24px',
        color: theme.palette.primary.main,
        transition: 'background-color 0.3s',
    };

    const hoverStyle: CSSProperties = {
        backgroundColor: theme.palette.secondary.main,
        cursor: 'pointer'
    };

    return (
        <>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    autoHideDuration={6000}
                    open={displayErrorAlert}
                    onClose={handleErrorAlertClose}
                >
                    <Alert severity="error" variant="filled">{errorAlertMessage}</Alert>
                </Snackbar>
            </Stack>
            <Box
                style={{
                    ...containerStyle,
                    ...(isOver || isHovered ? hoverStyle : {}),
                }}
                onClick={handleClick}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Box sx={{ width: '100%' }}>
                    <Grid color={theme.palette.primary.main} spacing={4} container>
                        <input
                            accept="image/png, image/jpeg"
                            ref={fileInputRef}
                            style={{ display: 'none' }}
                            type="file"
                            onChange={handleFileInputChange}
                        />
                        <Grid md={12} xs={12}>
                            <Typography sx={{ p: 2 }} variant="subtitle1">
                                Click or drag & drop your UML sequence diagram image here 📥
                            </Typography>
                        </Grid>
                        <Grid md={12} xs={12}>
                            <Typography variant="caption">
                                <code>(Maximum size: 4MB)</code>
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
}