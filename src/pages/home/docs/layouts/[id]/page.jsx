import clsx from "clsx";
import { Check, Clipboard } from "lucide-react";
import { useState } from "react";
const CodeSnippet = ({ code, copyButtonDisabled = false }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };

    return (
        <div className="rounded-lg border border-border bg-muted p-4 w-full flex flex-col gap-2">
            <div className="flex flex-row">


                <pre className="font-mono text-sm whitespace-pre-wrap">{code}</pre>

                {!copyButtonDisabled && <button
                    onClick={handleCopy}
                    className="text-muted-foreground hover:text-foreground transition ml-auto"
                    aria-label="Copy to clipboard"
                >
                    {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
                </button>}


            </div>

        </div>

    );
};

const Layouts = ({ meta, isMobileView, fullScreen, setFullScreen }) => {

    const [activeTab, setActiveTab] = useState("manual")


    return (
        <div className={clsx("py-4", fullScreen ? "px-40" : "px-6")}>

            {meta?.docs?.info && <div className="mt-2 mb-4">
                <CodeSnippet code={meta?.docs?.info} copyButtonDisabled={true} />
            </div>}

            <div className="flex flex-col gap-1">
                <p className="text-base font-semibold">Installation</p>
                <p className="text-sm text-muted-foreground">
                    Install this layout/component manually or via the CLI.
                </p>
            </div>

            <div className="flex h-9 w-[272px] items-center flex-shrink-0 mb-2 mt-2">

                <div className="flex flex-row items-center w-full gap-1">
                    <div className={clsx("flex-1 flex justify-center py-2 cursor-pointer hover:bg-muted rounded-lg border border-border", activeTab == "manual" && "bg-muted")} onClick={() => setActiveTab("manual")}>
                        <p className="text-sm font-bold">Manual</p>

                    </div>

                    <div className={clsx("flex-1 flex justify-center py-2 cursor-pointer hover:bg-muted rounded-lg border border-border", activeTab == "cli" && "bg-muted")} onClick={() => setActiveTab("cli")}>
                        <p className="text-sm font-bold">CLI</p>
                    </div>
                </div>
            </div>

            <div className="w-full">



                {activeTab === "manual" && (
                    <>
                        <div className="mt-4 flex flex-col gap-4">
                            {meta?.docs?.steps?.manual.map((step, index) => (
                                <div key={index} className="flex flex-col gap-2 mt-4">

                                    <div className="flex items-start space-x-4">
                                        <div className="w-8 h-8 flex items-center justify-center rounded-full border border-border">
                                            {index + 1}
                                        </div>

                                        <div className="flex flex-col flex-1">
                                            <p className="text-sm font-semibold">{step.title}</p>
                                            <p className="text-sm text-muted-foreground">{step.description}</p>
                                        </div>
                                    </div>

                                    {step?.codeViewer && (
                                        <div className="mt-2">
                                            <div className="h-[60vh] flex flex-col">
                                                {step.codeViewer()}
                                            </div>
                                        </div>
                                    )}

                                    {step?.code && step.code.map((code, idx) => (
                                        <div key={idx} className="mt-2">
                                            <CodeSnippet code={code} />
                                        </div>
                                    ))}

                                </div>
                            ))}

                        </div>
                    </>
                )}


                {activeTab === "cli" && <>
                    <div className="mt-4 flex flex-col gap-4">
                        {meta?.docs?.steps?.cli.map((step, index) => (
                            <div key={index} className="flex flex-col gap-2 mt-4">

                                <div className="flex items-start space-x-4">
                                    <div className="w-8 h-8 flex items-center justify-center rounded-full border border-border">
                                        {index + 1}
                                    </div>

                                    <div className="flex flex-col flex-1">
                                        <p className="text-sm font-semibold">{step.title}</p>
                                        <p className="text-sm text-muted-foreground">{step.description}</p>
                                    </div>
                                </div>

                                {/* CodeViewer */}
                                {step?.codeViewer && (
                                    <div className="mt-2">
                                        <div className="h-[60vh] flex flex-col">
                                            {step.codeViewer()}
                                        </div>
                                    </div>
                                )}

                                {/* Code Snippets */}
                                {step?.code && step.code.map((code, idx) => (
                                    <div key={idx} className="mt-2">
                                        <CodeSnippet code={code} />
                                    </div>
                                ))}

                            </div>
                        ))}
                    </div>
                </>}
            </div>

            <div className="flex flex-col gap-1 mt-4">
                <p className="text-base font-semibold">{meta?.docs?.usage?.title}</p>
                <p className="text-sm text-muted-foreground">
                    {meta?.docs?.usage?.description}
                </p>
            </div>

            <div className="mt-2">
                {meta?.docs?.usage?.fn()}
            </div>

        </div>
    )
}

export default Layouts