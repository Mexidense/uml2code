"use client"
import {CSSProperties, DragEvent, useRef, useState} from 'react';
import Grid from "@mui/system/Unstable_Grid";
import {Box, useTheme} from "@mui/material";

interface ImageFileUploaderProps {
    setUploadedImage: (imageSource: string) => void;
}

export function ImageFileUploader({ setUploadedImage }: ImageFileUploaderProps) {
    const [isOver, setIsOver] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

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
        // setLoading(true);

        const droppedFiles = Array.from(event.dataTransfer.files);
        const onlyOneFile = droppedFiles[0];

        try {
            await processFile(onlyOneFile);
        } catch (error) {
            console.error('Error processing files:', error);
        } finally {
            // setLoading(false);
        }
    };

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileInputChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];

        if (selectedFile) {
            event.preventDefault();
            setIsOver(false);
            // setLoading(true);

            try {
                await processFile(selectedFile);
            } catch (error) {
                console.error('Error processing files:', error);
            } finally {
                // setLoading(false);
            }
        }
    };

    const processFile = async (file: File) => {
        return new Promise<void>((resolve, reject) => {
            const reader = new FileReader();

            reader.onloadend = async () => {
                try {
                    const file = reader.result as string;
                    setUploadedImage(file);

                    resolve();
                } catch (error) {
                    reject(error);
                }
            };

            reader.onerror = (error) => {
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
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileInputChange}
                    />
                    <Grid xs={12} md={12}>
                        Drag and drop your UML sequence diagram here 📥
                    </Grid>
                    <Grid xs={12} md={12}>
                        <code>(Maximum size: 4MB)</code>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
}