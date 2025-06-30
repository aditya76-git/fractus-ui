import Explorer from "@/components/explorer"
import { ThemeToggle } from "@/components/theme-toggle"
import { Bell, ChartLine, CircleUser, ClipboardPlus, Contact, Earth, FilePlus, Folder, FolderClosed, Folders, Info, LayoutTemplate, LibraryBig, Mail, Maximize, MonitorCog, Notebook, Pencil, PenLine, Rss, Settings, SquarePen, Telescope } from 'lucide-react'
import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const DashboardLayout = ({ children }) => {
    const navigate = useNavigate()
    const location = useLocation()


    const IntroHeader = () => {
        return <div className="text-sm text-muted-foreground">Here’s everything you need to manage your projects, collaborate with your team, and gain insights — all in one place. Let’s get to work.
        </div>
    }

    const master = [
        {
            id: "intro",
            title: "Welcome 👋",
            element: <IntroHeader />,
            type: "section"
        },
        {
            id: "overview",
            title: "Overview",
            description: "Quick insights and navigation",
            type: "block",
            blocks: [
                {
                    id: "activity",
                    title: "Activity Feed",
                    description: "Track recent activity across projects",
                    slug: "/demo/dashboard/activity",
                    icon: <Rss />
                }
            ]
        },
        {
            id: "projects",
            title: "Projects",
            description: "Manage and collaborate on projects",
            type: "block",
            blocks: [
                {
                    id: "my-projects",
                    title: "My Projects",
                    description: "Projects you're working on",
                    slug: "/demo/dashboard/projects",
                    icon: <Folder />
                },
                {
                    id: "all-projects",
                    title: "All Projects",
                    description: "Company-wide project overview",
                    slug: "/demo/dashboard/projects/all",
                    icon: <Folders />
                },
                {
                    id: "create-project",
                    title: "Create Project",
                    description: "Start a new project",
                    slug: "/demo/dashboard/projects/create",
                    icon: <FilePlus />
                }
            ]
        },
        {
            id: "analytics",
            title: "Analytics",
            description: "Monitor performance and gain insights",
            type: "block",
            blocks: [
                {
                    id: "reports",
                    title: "Reports",
                    description: "Generate and download detailed reports",
                    slug: "/demo/dashboard/analytics/reports",
                    icon: <ClipboardPlus />
                },
                {
                    id: "engagement",
                    title: "Engagement",
                    description: "Track user interaction and metrics",
                    slug: "/demo/dashboard/analytics/engagement",
                    icon: <ChartLine />
                },
                {
                    id: "data-explorer",
                    title: "Data Explorer",
                    description: "Drill into raw data and trends",
                    slug: "/demo/dashboard/analytics/explorer",
                    icon: <Telescope />
                }
            ]
        },
        {
            id: "documents",
            title: "Documents",
            description: "Store, edit, and manage content",
            type: "block",
            blocks: [
                {
                    id: "library",
                    title: "Document Library",
                    description: "Browse all stored documents",
                    slug: "/demo/dashboard/documents/library",
                    icon: <LibraryBig />
                },
                {
                    id: "editor",
                    title: "Editor",
                    description: "Create and edit documents",
                    slug: "/demo/dashboard/documents/editor",
                    icon: <Pencil />
                },
                {
                    id: "templates",
                    title: "Templates",
                    description: "Reusable document formats",
                    slug: "/demo/dashboard/documents/templates",
                    icon: <LayoutTemplate />
                }
            ]
        },
        {
            id: "collaboration",
            title: "Collaboration",
            description: "Work together across teams",
            type: "block",
            blocks: [
                {
                    id: "team-directory",
                    title: "Team Directory",
                    description: "Browse and manage team members",
                    slug: "/demo/dashboard/team",
                    icon: <FolderClosed />
                },
                {
                    id: "roles-permissions",
                    title: "Roles & Permissions",
                    description: "Configure access levels",
                    slug: "/demo/dashboard/team/permissions",
                    icon: <Notebook />
                },
                {
                    id: "messages",
                    title: "Messages",
                    description: "View and send internal messages",
                    slug: "/demo/dashboard/messages",
                    icon: <Mail />
                }
            ]
        },
        {
            id: "assistant",
            title: "Word Assistant",
            description: "AI-powered content creation",
            type: "block",
            blocks: [
                {
                    id: "writing-assistant",
                    title: "Writing Assistant",
                    description: "Generate smart text and summaries",
                    slug: "/demo/dashboard/assistant/writing",
                    icon: <PenLine />
                },
                {
                    id: "translation",
                    title: "Translation",
                    description: "Translate text across languages",
                    slug: "/demo/dashboard/assistant/translation",
                    icon: <Earth />
                },
                {
                    id: "tone-check",
                    title: "Tone & Style",
                    description: "Review and improve writing tone",
                    slug: "/demo/dashboard/assistant/tone",
                    icon: <SquarePen />
                }
            ]
        },
        {
            id: "settings",
            title: "Settings",
            description: "Personalize your experience",
            type: "block",
            blocks: [
                {
                    id: "profile",
                    title: "Profile Settings",
                    description: "Manage your personal profile",
                    slug: "/demo/dashboard/settings/profile",
                    icon: <Settings />
                },
                {
                    id: "notifications",
                    title: "Notifications",
                    description: "Control how you stay updated",
                    slug: "/demo/dashboard/settings/notifications",
                    icon: <Bell />
                },
                {
                    id: "account",
                    title: "Account & Security",
                    description: "Manage password, sessions, and security",
                    slug: "/demo/dashboard/settings/account",
                    icon: <CircleUser />
                }
            ]
        },
        {
            id: "support",
            title: "Support",
            description: "Need help? Start here",
            type: "block",
            blocks: [
                {
                    id: "help-center",
                    title: "Help Center",
                    description: "Guides and FAQs",
                    slug: "/demo/dashboard/support/help-center",
                    icon: <Info />
                },
                {
                    id: "contact-support",
                    title: "Contact Support",
                    description: "Reach out to the support team",
                    slug: "/demo/dashboard/support/contact",
                    icon: <Contact />
                },
                {
                    id: "system-status",
                    title: "System Status",
                    description: "Check platform uptime and issues",
                    slug: "/demo/dashboard/support/status",
                    icon: <MonitorCog />
                }
            ]
        }
    ];


    const config = {
        baseSlug: "/demo/dashboard",
        navigate: (path) => navigate(path),
        getPathname: () => location.pathname
    }

    return <Explorer master={master} config={config}>


        {/* Navigator Slot */}
        <Explorer.Navigator>
            <div className="flex h-12 items-center gap-2 px-4">
                <Explorer.NavigatorHeader>
                    <Explorer.NavigatorLeft>
                        <h1 className="text-md font-bold cursor-pointer px-2">
                            <Link to={config?.baseSlug}>Acme Inc.</Link>
                        </h1>

                    </Explorer.NavigatorLeft>
                    <Explorer.NavigatorRight>

                        <h1 className="text-md font-bold px-2 cursor-pointer">
                            right-side
                        </h1>

                    </Explorer.NavigatorRight>
                </Explorer.NavigatorHeader>
            </div>
            <div className="border-t" />
            <Explorer.NavigatorBody>

                <Explorer.NavigatorFooter>
                    <div className="w-full bg-muted text-muted-foreground h-12 flex items-center px-4">
                        <div className="flex flex-1 items-center justify-between text-sm">
                            <h1 className="font-semibold tracking-tight">© 2025 Acme Inc.</h1>
                            <span>All rights reserved</span>
                        </div>
                    </div>
                </Explorer.NavigatorFooter>

            </Explorer.NavigatorBody>

        </Explorer.Navigator>

        {/* Viewer Slot */}
        <Explorer.Viewer>
            <div className="flex h-12 items-center gap-2 px-4">
                <Explorer.ViewerLeftNav />
                <Explorer.ViewerRight>
                    <div className="flex flex-row gap-2">
                        <Explorer.ToggleFullScreen>
                            <Maximize className="h-4 w-4" />
                        </Explorer.ToggleFullScreen>
                        <ThemeToggle />
                    </div>
                </Explorer.ViewerRight>
            </div>
            <div className="border-t" />

            <Explorer.ViewerContent>
                <Explorer.ViewerHeader className="px-6 py-4" />

                {children}
            </Explorer.ViewerContent>

        </Explorer.Viewer>
    </Explorer >
}

export default DashboardLayout