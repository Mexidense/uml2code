"use client"
import { DragEvent, useState } from 'react';
import Grid from "@mui/system/Unstable_Grid";
import {Box} from "@mui/material";

interface ImageFileUploaderProps {
    onCodeUpdate: (newCode: string) => void;
    setLoading: (value: boolean) => void;
}
export function ImageFileUploader({ onCodeUpdate, setLoading }: ImageFileUploaderProps) {
    const [isOver, setIsOver] = useState(false);

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
        setLoading(true);

        const droppedFiles = Array.from(event.dataTransfer.files);

        try {
            for (const file of droppedFiles) {
                const codeGenerated = await processFile(file);

                onCodeUpdate(codeGenerated.code);
            }
        } catch (error) {
            console.error('Error processing files:', error);
        } finally {
            setLoading(false);
        }
    };

    const processFile = async (file: File) => {
        return new Promise<{ code: string }>((resolve, reject) => {
            const reader = new FileReader();

            reader.onloadend = async () => {
                try {
                    const response = await fetch('api/image-uploader', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(reader.result),
                    });

                    const codeGenerated = (await response.json()) as { code: string };
                    resolve(codeGenerated);
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

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
                padding: '70px 0',
                textAlign: 'center',
                border: '2px dotted',
                backgroundColor: isOver ? 'lightgray' : 'white',
                borderRadius: '24px'
            }}
        >
            <Box sx={{ width: '100%' }}>
                <Grid container spacing={4}>
                    <Grid xs={12} md={12}>
                        Drag and drop your UML sequence diagram here 📥
                    </Grid>
                    <Grid xs={12} md={12}>
                        <code>(Maximum size: 4MB)</code>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}