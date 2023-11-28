import SequenceDiagramToCode from "@uml2code/view/sequence-diagram-to-code";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: 'UML2Code',
    description: 'Generate code using UML sequence diagrams',
    icons: {
        icon: '/favicon.ico'
    }
}

export default function Home() {
    return (
        <SequenceDiagramToCode />
    )
}
