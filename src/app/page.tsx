"use client"
import {useState} from "react";
import {GenerateCode} from "@uml2code/components/generate-code";
import Spinner from "@uml2code/components/spinner/spinner";

export default function Home() {
    const [loading, setLoading] = useState(false);

    return (
    <main>
        <div>UML2Code!</div>
        {loading && <Spinner />} {/* Conditionally render the spinner */}
        <GenerateCode setLoading={setLoading} />
    </main>
  )
}
