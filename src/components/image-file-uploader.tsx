"use client"
import { DragEvent, useState } from 'react';

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
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '50px',
                width: '300px',
                border: '1px dotted',
                backgroundColor: isOver ? 'lightgray' : 'white',
            }}
        >
            Drag and drop some files here (Maximum size: 4MB)
        </div>
    );
}