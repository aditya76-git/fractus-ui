import Explorer from "@/components/explorer"
import { ThemeToggle } from "@/components/theme-toggle"
import { files as explorerFiles, info as explorerInfo, steps as explorerSteps, usage as explorerUsage } from "@/pages/home/config/layouts/explorer"
import { Braces, Folder, Maximize } from 'lucide-react'
import React from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const RootLayout = ({ children }) => {
  const navigate = useNavigate()
  const location = useLocation()


  const IntroHeader = () => {

    return <div className="text-sm text-muted-foreground">FRACTUS-UI is an open-source collection of reusable components and layouts to help you quickly build user interfaces.
    </div>
  }

  const IntroHeaderMobile = () => {
    return <div className="text-muted-foreground"><p className="text-2xl font-bold mb-4">
      built with{" "}
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
        Tailwind CSS
      </span>{" "}
      and{" "}
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-cyan-400">
        ShadCN UI
      </span>
      .
    </p>
    </div>
  }

  const master = [
    {
      id: "intro-mobile",
      title: "Welcome to FRACTUS-UI👋",
      element: <IntroHeaderMobile />,
      type: "section",
      mobileOnly: true
    },
    {
      id: "intro",
      element: <IntroHeader />,
      type: "section"
    },
    {
      id: "layouts",
      title: "Layouts",
      description: "Ready-made layouts to copy paste in your apps.",
      type: "block",
      blocks: [
        {
          id: "explorer",
          title: "Explorer",
          description: "A sidebar-like interface to easily browse and preview UI components and layouts with smooth navigation",
          slug: "/docs/layouts/explorer",
          icon: <Folder />,
          docs: {
            files: explorerFiles,
            usage: explorerUsage,
            info: explorerInfo,
            steps: explorerSteps
          }
        },
      ]
    },
    {
      id: "components",
      title: "Components",
      description: "Ready to use components to copy paste in your apps.",
      type: "block",
      blocks: [
        {
          id: "code-viewer",
          title: "Code Viewer",
          description: "A VSCode like code viewer to view code snippets and files.",
          slug: "/docs/components/code-viewer",
          icon: <Braces />
        },
      ]
    }
  ];


  const config = {
    baseSlug: "/",
    navigate: (path) => navigate(path),
    getPathname: () => location.pathname
  }

  return <Explorer master={master} config={config}>


    {/* Navigator Slot */}
    <Explorer.Navigator>
      <div className="flex h-12 items-center gap-2 px-4">
        <Explorer.NavigatorHeader>
          <Explorer.NavigatorLeft>
            <h1 className="text-md font-bold cursor-pointer">
              <Link to={config?.baseSlug}>FRACTUS-UI</Link>
            </h1>

          </Explorer.NavigatorLeft>
        </Explorer.NavigatorHeader>
      </div>
      <div className="border-t" />
      <Explorer.NavigatorBody>

        <Explorer.NavigatorFooter>
          <div className="w-full bg-muted text-muted-foreground h-12 flex items-center px-4">
            <div className="flex flex-1 items-center justify-between text-sm">
              <h1 className="font-semibold tracking-tight">© 2025 FRACTUS-UI.</h1>
              <span className = "italic">aditya76-git/fractus-ui</span>
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

export default RootLayout