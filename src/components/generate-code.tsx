"use client"
import {useState} from "react";
import {ImageFileUploader} from "@uml2code/components/image-file-uploader";
import {CodeBlockViewer} from "@uml2code/components/code-block-viewer";

interface GenerateCodeProps {
    setLoading: (value: boolean) => void;
    loading: boolean;
}

export function GenerateCode({ setLoading, loading }: GenerateCodeProps) {
    const [generatedCode, setGeneratedCode] = useState('');
    const handleCodeUpdate = (newCode: string) => {
        setGeneratedCode(newCode);
    };

    return (
        <>
            {
                !loading && <div>
                    <ImageFileUploader onCodeUpdate={handleCodeUpdate} setLoading={setLoading} />
                    <CodeBlockViewer generatedCode={generatedCode} />
                </div>
            }
        </>
    );
}