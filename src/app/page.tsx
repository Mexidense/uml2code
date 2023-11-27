import CodeGeneration from "@uml2code/view/code-generation/code-generation";
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
        <CodeGeneration />
    )
}
