"use client"
import MarkdownPreview from '@uiw/react-markdown-preview';


interface CodeBlockViewerProps {
    generatedCode: string;
}

export function CodeBlockViewer({ generatedCode }: CodeBlockViewerProps) {
    return (
        <div>
            <MarkdownPreview source={generatedCode}/>
        </div>
    );
}