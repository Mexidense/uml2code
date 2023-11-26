"use client"
import {useState} from "react";
import {ImageFileUploader} from "@uml2code/components/image-file-uploader";
import {CodeBlockViewer} from "@uml2code/components/code-block-viewer";

interface GenerateCodeProps {
    setLoading: (value: boolean) => void;
}

export function GenerateCode({ setLoading }: GenerateCodeProps) {
    const [generatedCode, setGeneratedCode] = useState('');
    const handleCodeUpdate = (newCode: string) => {
        setGeneratedCode(newCode);
    };

    return (
        <div>
            <ImageFileUploader onCodeUpdate={handleCodeUpdate} setLoading={setLoading} />
            <CodeBlockViewer generatedCode={generatedCode} />
        </div>
    );
}