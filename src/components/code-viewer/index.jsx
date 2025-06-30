import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useWindowSize } from "@/hooks/use-window-size";
import clsx from "clsx";
import { ArrowLeftRight, Braces, ChevronDown, ChevronRight, Clipboard, Code, File, FileText, Folder, FolderOpen, Image, Search, Settings, Settings2, X, Check } from "lucide-react";
import React, { createContext, useContext, useState } from "react";
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Editor from '@monaco-editor/react';


const CodeViewerContext = createContext();
export const useCodeViewer = () => useContext(CodeViewerContext)

const CodeViewer = ({ children, className, files = [] }) => {
    const { width } = useWindowSize();
    const isMobileView = width < 768;

    const [selectedFile, setSelectedFile] = useState(null);
    const [fullScreen, setFullScreen] = useState(false);

    const showFileExplorer = !selectedFile || !isMobileView;
    const showFileViewer = !fullScreen && selectedFile

    const childArray = React.Children.toArray(children);

    let fileExplorer = null;
    let fileViewer = null;
    let emptyState = null;

    childArray.forEach(child => {
        if (child.type === CodeViewer.FileExplorer) {
            fileExplorer = child;
        } else if (child.type === CodeViewer.FileViewer) {
            fileViewer = child;
        } else if (child.type === CodeViewer.EmptyViewerState) {
            emptyState = child;
        }
    });

    // Fallback
    if (!emptyState) {
        emptyState = (
            <div className="flex flex-1 items-center justify-center h-full text-muted-foreground px-4">
                Select a file to view code
            </div>
        );
    }

    return (
        <CodeViewerContext.Provider value={{ selectedFile, setSelectedFile, fullScreen, setFullScreen, files, isMobileView }}>
            <div className={clsx("flex w-full bg-background border rounded-lg overflow-hidden", className)}>

                {/* Sidebar */}
                <div className="w-[45px] border-r border-border flex-shrink-0">
                    <div className="flex flex-col justify-between h-full">
                        <div className="flex flex-col items-center divide-y divide-border border-b">
                            <div
                                className={clsx(
                                    "w-full flex justify-center py-2",
                                    "cursor-pointer hover:bg-muted",
                                    fullScreen && "bg-muted",
                                    isMobileView && "opacity-50 cursor-not-allowed hover:bg-transparent"
                                )}
                                onClick={() => {
                                    if (!isMobileView) {
                                        setFullScreen(prev => !prev);
                                    }
                                }}
                            >
                                <File className="h-5 w-5" />
                            </div>

                            <div className="w-full flex justify-center py-2 cursor-pointer hover:bg-muted">
                                <Search className="h-5 w-5" />
                            </div>
                        </div>

                        <div className="flex flex-col items-center divide-y divide-border border-t">
                            <div className="w-full flex justify-center py-2 cursor-pointer hover:bg-muted">
                                <Settings className="h-5 w-5" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-1 min-w-0 overflow-hidden">

                    {!fullScreen && showFileExplorer && (
                        <div className={clsx(
                            isMobileView ? "flex-1" : "w-[300px] min-w-[250px] max-w-[400px]",
                            "border-r flex-shrink-0 flex flex-col overflow-hidden"
                        )}>
                            {fileExplorer}
                        </div>
                    )}

                    {showFileViewer && (
                        <div className={clsx(
                            isMobileView ? "flex-1" : "flex flex-1",
                            "min-w-0 overflow-hidden"
                        )}>
                            <div className="flex flex-col w-full h-full min-w-0 overflow-hidden">
                                {fileViewer}
                            </div>
                        </div>
                    )}

                    {!showFileViewer && !isMobileView && (
                        <div className="flex-1 flex items-center justify-center">
                            {emptyState}
                        </div>
                    )}
                </div>

            </div>
        </CodeViewerContext.Provider>
    );
};

const FileExplorer = ({ children }) => (
    <div className="flex flex-col h-full overflow-hidden">
        {children}
    </div>
);

const Header = ({ children }) => (
    <div className="flex h-9 items-center border-b border-border flex-shrink-0">{children}</div>
);

const HeaderLeft = ({ children, className }) => (
    <div className={clsx("flex flex-1 items-center gap-2 min-w-0", className)}>{children}</div>
);

const HeaderRight = ({ children }) => (
    <div className="flex items-center flex-shrink-0">{children}</div>
);

const HeaderMobileOnly = ({ children }) => {
    const { isMobileView } = useCodeViewer();
    return isMobileView ? children : null;
};

const HeaderDesktopOnly = ({ children }) => {
    const { isMobileView } = useCodeViewer();
    return !isMobileView ? children : null;
};

// File Viewer
const iconMap = {
    react: (className) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-11.5 -10.23174 23 20.46348"
            className={className}
            fill="none"
        >
            <title>React Logo</title>
            <circle cx="0" cy="0" r="2.05" fill="#a3a3a3" />
            <g stroke="#a3a3a3" strokeWidth="1">
                <ellipse rx="11" ry="4.2" />
                <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                <ellipse rx="11" ry="4.2" transform="rotate(120)" />
            </g>
        </svg>
    ),
    markdown: (className) => (
        <svg className={className}
            fill="#a3a3a3" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" fill="none" />
            <path d="M2,16V8H4l3,3,3-3h2v8H10V10.83l-3,3-3-3V16H2M16,8h3v4h2.5l-4,4.5-4-4.5H16Z" />
        </svg>
    ),
};

const getFileIcon = (extension, className) => {
    switch (extension) {
        case "tsx":
        case "jsx":
            return iconMap["react"](className)
        case "ts":
        case "js":
        case "mjs":
            return <Code className={className} />
        case "json":
            return <Braces className={className} />
        case "svg":
        case "ico":
        case "png":
        case "jpg":
            return <Image className={className} />
        case "md":
            return iconMap["markdown"](className)
        default:
            return <FileText className={className} />
    }
}

const getFileExtension = (name) => {
    const parts = name.split(".");
    return parts[parts.length - 1];
}

const FileItem = ({ item, level = 0 }) => {
    const [expanded, setExpanded] = useState(false);
    const { selectedFile, setSelectedFile } = useCodeViewer();

    const isFolder = item.type === "folder";
    const isSelected = selectedFile?.id === item.id;

    const toggleExpand = () => {
        if (isFolder) {
            setExpanded(!expanded);
        } else {
            setSelectedFile(item);
        }
    };

    return (
        <div>
            <div
                onClick={toggleExpand}
                className={clsx(
                    "flex items-center px-2 py-1 text-sm cursor-pointer rounded hover:bg-muted border border-transparent hover:border-border",
                    isSelected && "bg-muted"
                )}
                style={{ paddingLeft: `${level * 16 + 8}px` }}
            >
                {isFolder ? (
                    expanded ? <ChevronDown className="w-4 h-4 mr-1" /> : <ChevronRight className="w-4 h-4 mr-1" />
                ) : (
                    getFileIcon(getFileExtension(item.name), "w-4 h-4 mr-1 text-muted-foreground")
                )}
                {isFolder ? (
                    expanded ? <FolderOpen className="w-4 h-4 mr-1 text-muted-foreground" /> : <Folder className="w-4 h-4 mr-1 text-muted-foreground" />
                ) : null}
                <span className="truncate">{item.name}</span>
            </div>

            {expanded && isFolder && item.children?.map(child => (
                <FileItem key={child.id} item={child} level={level + 1} />
            ))}
        </div>
    );
};

const FileExplorerBody = () => {
    const { files } = useCodeViewer();

    return (
        <div className="flex-1 min-h-0 overflow-hidden">
            <ScrollArea className="h-full">
                <div className="px-2 py-2">
                    <div className="flex flex-col gap-1">
                        {files.map(file => (
                            <FileItem key={file.id} item={file} />
                        ))}
                    </div>
                </div>
            </ScrollArea>
        </div>
    );
};

const FileViewerHeader = ({ className }) => {

    const { setSelectedFile, selectedFile } = useCodeViewer()

    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(selectedFile?.content);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch (err) {
            console.error("Failed to copy:", err);
        }
    };


    return <CodeViewer.Header>
        <CodeViewer.HeaderLeft className={className}>
            <div className="p-2 flex items-center justify-center gap-1 min-w-0">
                {getFileIcon(getFileExtension(selectedFile?.name), "w-4 h-4 mr-1 text-muted-foreground flex-shrink-0")}
                <p className="text-sm font-medium truncate">{selectedFile?.name}</p>

                <div className="hover:bg-muted p-2 cursor-pointer flex-shrink-0"
                    onClick={() => setSelectedFile(null)}
                >
                    <X className="h-5 w-5" />
                </div>
            </div>

        </CodeViewer.HeaderLeft>

        <CodeViewer.HeaderRight>
            <div className="flex border-b border-l divide-x divide-border">
                <div onClick={handleCopy} className="p-2 cursor-pointer hover:bg-muted flex items-center justify-center transition">
                    {copied ? <Check className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}

                </div>
                <div onClick={() => setSelectedFile(null)} className="p-2 cursor-pointer hover:bg-muted flex items-center justify-center">
                    <X className="h-5 w-5" />
                </div>
            </div>
        </CodeViewer.HeaderRight>
    </CodeViewer.Header>
}


function getFilePathById(fileTree, targetId) {
    const path = [];

    function traverse(nodeList, currentPath) {
        for (const node of nodeList) {
            const newPath = [...currentPath, { id: node.id, name: node.name, type: node.type }];

            if (node.id === targetId) {
                path.push(...newPath);
                return true;
            }

            if (node.children) {
                const found = traverse(node.children, newPath);
                if (found) return true;
            }
        }

        return false;
    }

    traverse(fileTree, []);
    return path;
}


const FileViewerBreadcrumb = ({ className }) => {
    const { files, selectedFile, isMobileView } = useCodeViewer();
    if (isMobileView) return;
    const nav = getFilePathById(files, selectedFile?.id);

    let trimmedNav = [];

    if (nav.length > 4) {
        trimmedNav = [
            nav[0],
            { id: 'ellipsis', name: '...', type: 'ellipsis' },
            ...nav.slice(-2)
        ];
    } else {
        trimmedNav = nav;
    }


    return (
        <CodeViewer.Header>
            <CodeViewer.HeaderLeft className={className}>
                <ArrowLeftRight className="h-4 w-4 ml-3 flex-shrink-0" />

                <Breadcrumb className="min-w-0">
                    <BreadcrumbList>
                        {trimmedNav.map((item, index) => {
                            const isLast = index === trimmedNav.length - 1;

                            if (item.type === "ellipsis") {
                                return (
                                    <BreadcrumbItem key="ellipsis">
                                        <BreadcrumbEllipsis />
                                    </BreadcrumbItem>
                                );
                            }

                            return isLast ? (
                                <BreadcrumbItem key={item.id}>
                                    <BreadcrumbPage className="truncate">{item.name}</BreadcrumbPage>
                                </BreadcrumbItem>
                            ) : (
                                <React.Fragment key={item.id}>
                                    <BreadcrumbItem className="truncate">{item.name}</BreadcrumbItem>
                                    <BreadcrumbSeparator />
                                </React.Fragment>
                            );
                        })}
                    </BreadcrumbList>
                </Breadcrumb>


            </CodeViewer.HeaderLeft>
        </CodeViewer.Header>
    );
};

const languageExtensionMap = {
    javascript: ['.js', '.cjs', '.mjs', '.jsx'],
    typescript: ['.ts', '.mts', '.cts', '.tsx'],
    json: ['.json', '.jsonc'],
    html: ['.html', '.htm'],
    css: ['.css'],
    scss: ['.scss'],
    less: ['.less'],
    markdown: ['.md', '.markdown'],
    xml: ['.xml'],
    yaml: ['.yml', '.yaml'],
    sql: ['.sql'],
    python: ['.py'],
    java: ['.java'],
    c: ['.c'],
    cpp: ['.cpp', '.cc', '.cxx', '.hpp'],
    csharp: ['.cs'],
    go: ['.go'],
    ruby: ['.rb'],
    php: ['.php'],
    shell: ['.sh', '.bash'],
    powershell: ['.ps1'],
    rust: ['.rs'],
    dart: ['.dart'],
    kotlin: ['.kt', '.kts'],
    swift: ['.swift'],
    plaintext: ['.txt', '.text'],
    ini: ['.ini', '.cfg'],
    dockerfile: ['Dockerfile'],
    makefile: ['Makefile'],
    graphql: ['.graphql', '.gql'],
    perl: ['.pl'],
    lua: ['.lua'],
};


const FileViewerBody = ({ className }) => {
    const { selectedFile } = useCodeViewer();
    const extension = "." + getFileExtension(selectedFile?.name)

    const entry = Object.entries(languageExtensionMap).find(([_, extList]) =>
        extList.includes(extension)
    );

    const defaultLanguage = entry ? entry[0] : "plaintext"

    return (
        <div className="flex-1 w-full min-w-0 overflow-hidden">

            <div className={clsx("text-sm h-full w-full", className)}>
                <Editor
                    defaultLanguage={defaultLanguage}
                    value={selectedFile?.content}
                    theme="vs-dark"
                    options={{
                        readOnly: true,
                        domReadOnly: true,
                        fontSize: 12,
                        wordWrap: 'on',
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        scrollbar: {
                            horizontal: 'auto',
                            vertical: 'auto'
                        },
                        minimap: {
                            enabled: false
                        },
                    }}
                />

            </div>
        </div>
    );
};

const FileViewer = ({ children }) => (
    <div className="flex flex-col h-full min-w-0 overflow-hidden">
        {children}
    </div>
);


const EmptyViewerState = ({ children }) => {
    return children;
};

export default CodeViewer;

CodeViewer.FileExplorer = FileExplorer;
CodeViewer.EmptyViewerState = EmptyViewerState;

CodeViewer.Header = Header;
CodeViewer.HeaderLeft = HeaderLeft;
CodeViewer.HeaderRight = HeaderRight;
CodeViewer.HeaderMobileOnly = HeaderMobileOnly;
CodeViewer.HeaderDesktopOnly = HeaderDesktopOnly;

CodeViewer.FileExplorerBody = FileExplorerBody;

CodeViewer.FileViewer = FileViewer;
CodeViewer.FileViewerHeader = FileViewerHeader;
CodeViewer.FileViewerBreadcrumb = FileViewerBreadcrumb;
CodeViewer.FileViewerBody = FileViewerBody;