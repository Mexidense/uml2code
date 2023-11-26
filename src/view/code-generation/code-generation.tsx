"use client"
import {useState} from "react";
import Spinner from "@uml2code/components/spinner/spinner";
import {GenerateCode} from "@uml2code/components/generate-code";
import './code-generation.css'

export default function CodeGeneration() {
    const [loading, setLoading] = useState(false);

    return (
        <div className="main-code-generation">
            <div className="main-code-generation-block">
                <h1>UML2Code!</h1>
            </div>
            <div className="main-code-generation-block">
                {loading && <Spinner />}
            </div>
            <div className="main-code-generation-block">
                <GenerateCode setLoading={setLoading} loading={loading} />
            </div>
        </div>
    )
}
