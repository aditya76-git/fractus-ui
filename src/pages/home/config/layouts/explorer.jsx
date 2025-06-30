import CodeViewer from "@/components/code-viewer";
import { Ellipsis } from "lucide-react";


const files = {
    setup: [
        {
            "id": "kbgld",
            "name": "src",
            "type": "folder",
            "children": [
                {
                    "id": "emm2u",
                    "name": "components",
                    "type": "folder",
                    "children": [
                        {
                            "id": "pa2pb",
                            "name": "explorer",
                            "type": "folder",
                            "children": [
                                {
                                    "id": "k3dr0",
                                    "name": "components",
                                    "type": "folder",
                                    "children": [
                                        {
                                            "id": "exrsi",
                                            "name": "toggle-fullscreen.jsx",
                                            "type": "file",
                                            "content": "import { Toggle } from \"@/components/ui/toggle\";\nimport { useExplorer } from \"../context/explorer-context\";\n\nexport const ToggleFullScreen = ({ children }) => {\n  const { fullScreen, setFullScreen, isMobileView } = useExplorer();\n\n  return (\n    <Toggle \n      disabled={isMobileView} \n      aria-label=\"Toggle fullscreen\" \n      onClick={() => setFullScreen(prev => !prev)}\n    >\n      {children}\n    </Toggle>\n  );\n};"
                                        }
                                    ]
                                },
                                {
                                    "id": "yhex8",
                                    "name": "context",
                                    "type": "folder",
                                    "children": [
                                        {
                                            "id": "62es9",
                                            "name": "explorer-context.jsx",
                                            "type": "file",
                                            "content": "import React, { createContext, useContext } from \"react\";\n\nconst ExplorerContext = createContext();\n\nexport const useExplorer = () => {\n  const context = useContext(ExplorerContext);\n  if (!context) {\n    throw new Error('useExplorer must be used within an ExplorerProvider');\n  }\n  return context;\n};\n\nexport { ExplorerContext };"
                                        }
                                    ]
                                },
                                {
                                    "id": "u9j20",
                                    "name": "index.jsx",
                                    "type": "file",
                                    "content": "import clsx from \"clsx\";\nimport React, { useState } from \"react\";\nimport { ExplorerContext } from \"./context/explorer-context\";\nimport { getResponsiveWidthClass } from \"./utils/responsive\";\nimport { useWindowSize } from \"@/hooks/use-window-size\"\n\nimport {\n  Navigator,\n  NavigatorHeader,\n  NavigatorLeft,\n  NavigatorRight,\n  NavigatorBody,\n  NavigatorMobileOnly,\n  NavigatorDesktopOnly,\n  NavigatorFooter\n} from \"./navigator\";\n\nimport {\n  Viewer,\n  ViewerLeft,\n  ViewerRight,\n  ViewerLeftNav,\n  ViewerRightMobileOnly,\n  ViewerRightDesktopOnly,\n  ViewerHeader,\n  ViewerContent\n} from \"./viewer\";\n\nimport { ToggleFullScreen } from \"./components/toggle-fullscreen\";\n\nconst Explorer = ({ master, children, config }) => {\n  const { width } = useWindowSize();\n  const isMobileView = width < 768;\n  const [fullScreen, setFullScreen] = useState(false);\n\n  const pathname = config?.getPathname();\n  const selectedBlock = React.useMemo(() => {\n    const allBlocks = master.flatMap((section) =>\n      section.type === \"block\" ? section.blocks : []);\n    return allBlocks.find((b) => b.slug === pathname);\n  }, [pathname, master]);\n\n  const showNavigator = !selectedBlock || !isMobileView;\n  const showViewer = selectedBlock !== null && !(isMobileView && config?.baseSlug === pathname);\n\n  const childArray = React.Children.toArray(children);\n\n  let navigator = null;\n  let viewer = null;\n\n  childArray.forEach(child => {\n    if (child.type === Navigator) {\n      navigator = child;\n    } else if (child.type === Viewer) {\n      viewer = child;\n    }\n  });\n\n  const navigatorWidthClass = isMobileView ? \"w-full\" : getResponsiveWidthClass(width);\n\n  return (\n    <ExplorerContext.Provider\n      value={{\n        master,\n        config,\n        selectedBlock,\n        isMobileView,\n        fullScreen,\n        setFullScreen\n      }}>\n      <div className=\"relative h-screen w-full bg-background overflow-hidden\">\n     \n        {!fullScreen && showNavigator && (\n          <div\n            className={clsx(\n              navigatorWidthClass,\n              \"absolute top-0 left-0 h-full border-r flex flex-col z-10 bg-background\"\n            )}>\n            {navigator}\n          </div>\n        )}\n\n        {showViewer && (\n          <div\n            className={clsx(\n              \"absolute top-0 right-0 h-full flex flex-col overflow-hidden\",\n              !fullScreen && showNavigator && !isMobileView \n                ? `calc(100% - ${getNavigatorWidth(width)})`\n                : \"w-full\"\n            )}\n            style={{\n              width: !fullScreen && showNavigator && !isMobileView \n                ? `calc(100% - ${getNavigatorWidth(width)})` \n                : '100%'\n            }}>\n            {viewer}\n          </div>\n        )}\n\n        {!showViewer && !isMobileView && (\n          <div className=\"flex items-center justify-center h-full text-muted-foreground\">\n            Select a component to view\n          </div>\n        )}\n      </div>\n    </ExplorerContext.Provider>\n  );\n};\n\nconst getNavigatorWidth = (width) => {\n  if (width >= 2296) return \"25%\";\n  if (width >= 1706) return \"30%\";\n  if (width >= 1133) return \"33%\";\n  if (width >= 950) return \"50%\";\n  if (width >= 800) return \"38%\";\n  return \"100%\";\n};\n\nExplorer.Navigator = Navigator;\nExplorer.NavigatorHeader = NavigatorHeader;\nExplorer.NavigatorLeft = NavigatorLeft;\nExplorer.NavigatorRight = NavigatorRight;\nExplorer.NavigatorBody = NavigatorBody;\nExplorer.NavigatorMobileOnly = NavigatorMobileOnly;\nExplorer.NavigatorDesktopOnly = NavigatorDesktopOnly;\nExplorer.NavigatorFooter = NavigatorFooter;\n\nExplorer.Viewer = Viewer;\nExplorer.ViewerLeft = ViewerLeft;\nExplorer.ViewerRight = ViewerRight;\nExplorer.ViewerLeftNav = ViewerLeftNav;\nExplorer.ViewerRightMobileOnly = ViewerRightMobileOnly;\nExplorer.ViewerRightDesktopOnly = ViewerRightDesktopOnly;\nExplorer.ViewerHeader = ViewerHeader;\nExplorer.ViewerContent = ViewerContent;\n\nExplorer.ToggleFullScreen = ToggleFullScreen;\n\nexport default Explorer;"
                                },
                                {
                                    "id": "5ggfb",
                                    "name": "navigator",
                                    "type": "folder",
                                    "children": [
                                        {
                                            "id": "p2hu4",
                                            "name": "body.jsx",
                                            "type": "file",
                                            "content": "import React from \"react\";\nimport { ScrollArea } from \"@/components/ui/scroll-area\";\nimport clsx from \"clsx\";\nimport { useExplorer } from \"../context/explorer-context\";\n\nexport const NavigatorBody = ({ children }) => {\n  const { master } = useExplorer();\n\n  return (\n    <div className=\"flex flex-col flex-1 overflow-hidden\">\n      <ScrollArea className=\"flex-1\">\n        <div className=\"p-4 space-y-4\">\n          {master.map((item) =>\n            item.type === \"section\" ? (\n              <NavigatorSection key={item.id} data={item} mobileOnly={item?.mobileOnly ?? false} />\n            ) : (\n              <NavigatorBlockGroup key={item.id} data={item} mobileOnly={item?.mobileOnly ?? false} />\n            )\n          )}\n        </div>\n      </ScrollArea>\n      {children}\n    </div>\n  );\n};\n\nconst NavigatorSection = ({ data, mobileOnly }) => {\n  const { isMobileView, fullScreen, setFullScreen } = useExplorer();\n\n  if (!data?.title && !data?.element) return null;\n  if (mobileOnly && !isMobileView) return null;\n\n  return (\n    <div className=\"space-y-2\">\n      {data.title && <h2 className=\"text-sm font-medium\">{data.title}</h2>}\n      {data.element && React.cloneElement(data.element, { meta: data, isMobileView, fullScreen, setFullScreen })}\n    </div>\n  );\n};\n\nconst NavigatorBlockGroup = ({ data, mobileOnly }) => {\n  const { config, isMobileView } = useExplorer();\n  const pathname = config?.getPathname();\n  \n  if (mobileOnly && !isMobileView) return null;\n\n  return (\n    <div className=\"space-y-3\">\n      {(data?.title || data?.description) && (\n        <div className=\"space-y-1\">\n          {data?.title && <p className=\"text-sm font-medium\">{data.title}</p>}\n          {data?.description && (\n            <p className=\"text-sm text-muted-foreground\">{data.description}</p>\n          )}\n        </div>\n      )}\n\n      <div className=\"grid grid-cols-2 gap-2\">\n        {data.blocks.map((block) => {\n          const isActive = pathname === block.slug;\n\n          return (\n            <button\n              key={block.id}\n              onClick={() => config?.navigate(block.slug)}\n              className={clsx(\n                \"flex flex-col items-start gap-2 rounded-lg border p-3 text-left text-sm transition-all hover:bg-accent\",\n                isActive && \"bg-muted border border-gray-600\"\n              )}\n            >\n              <div className=\"flex w-full flex-col gap-1\">\n                <div className=\"flex items-center w-full\">\n                  <div className=\"overflow-hidden rounded-md aspect-square\">\n                    {block.icon}\n                  </div>\n                  <div className=\"ml-auto text-xs text-muted-foreground\">{block.header ?? \"\"}</div>\n                </div>\n                <div className=\"text-sm mt-4\">\n                  <h3 className=\"font-medium leading-none whitespace-nowrap\">\n                    {block.title}\n                  </h3>\n                </div>\n              </div>\n            </button>\n          );\n        })}\n      </div>\n    </div>\n  );\n};"
                                        },
                                        {
                                            "id": "ffvsw",
                                            "name": "footer.jsx",
                                            "type": "file",
                                            "content": "export const NavigatorFooter = ({ children }) => children;"
                                        },
                                        {
                                            "id": "1jj2s",
                                            "name": "header.jsx",
                                            "type": "file",
                                            "content": "import { useExplorer } from \"../context/explorer-context\";\n\nexport const NavigatorHeader = ({ children }) => children;\n\nexport const NavigatorLeft = ({ children }) => (\n  <div className=\"flex flex-1 items-center gap-2\">{children}</div>\n);\n\nexport const NavigatorRight = ({ children }) => (\n  <div className=\"flex items-center gap-2\">{children}</div>\n);\n\nexport const NavigatorMobileOnly = ({ children }) => {\n  const { isMobileView } = useExplorer();\n  return isMobileView ? children : null;\n};\n\nexport const NavigatorDesktopOnly = ({ children }) => {\n  const { isMobileView } = useExplorer();\n  return !isMobileView ? children : null;\n};"
                                        },
                                        {
                                            "id": "854gt",
                                            "name": "index.jsx",
                                            "type": "file",
                                            "content": "export { Navigator } from './navigator';\nexport { \n  NavigatorHeader,\n  NavigatorLeft,\n  NavigatorRight,\n  NavigatorMobileOnly,\n  NavigatorDesktopOnly\n} from './header';\nexport { NavigatorBody } from './body';\nexport { NavigatorFooter } from './footer';"
                                        },
                                        {
                                            "id": "eu3nd",
                                            "name": "navigator.jsx",
                                            "type": "file",
                                            "content": "export const Navigator = ({ children }) => (\n    <div className=\"flex flex-col h-full\">{children}</div>\n  );"
                                        }
                                    ]
                                },
                                {
                                    "id": "dj748",
                                    "name": "utils",
                                    "type": "folder",
                                    "children": [
                                        {
                                            "id": "ya249",
                                            "name": "responsive.jsx",
                                            "type": "file",
                                            "content": "export const getResponsiveWidthClass = (width) => {\n    if (width >= 2296) return \"w-[25%]\";\n    if (width >= 1706) return \"w-[30%]\";\n    if (width >= 1133) return \"w-[33%]\";\n    if (width >= 950) return \"w-[50%]\";\n    if (width >= 800) return \"w-[38%]\";\n    return \"w-full\";\n  };"
                                        }
                                    ]
                                },
                                {
                                    "id": "gv6sk",
                                    "name": "viewer",
                                    "type": "folder",
                                    "children": [
                                        {
                                            "id": "i3xwg",
                                            "name": "content.jsx",
                                            "type": "file",
                                            "content": "import React from \"react\";\nimport { ScrollArea } from \"@/components/ui/scroll-area\";\nimport { useExplorer } from \"../context/explorer-context\";\n\nexport const ViewerContent = ({ children }) => {\n  const { master, config, isMobileView, fullScreen, setFullScreen } = useExplorer();\n  const pathname = config?.getPathname();\n\n  const selectedBlock = React.useMemo(() => {\n    const allBlocks = master.flatMap((section) =>\n      section.type === \"block\" ? section.blocks : []\n    );\n    return allBlocks.find((b) => b.slug === pathname);\n  }, [pathname, master]);\n\n  if (!selectedBlock && pathname !== config?.baseSlug) {\n    return (\n      <div className=\"flex-1 flex items-center justify-center text-muted-foreground\">\n        No block found for this route.\n      </div>\n    );\n  }\n\n  return (\n    <ScrollArea type=\"always\" className=\"h-[91vh]\">\n      {React.Children.map(children, (child) =>\n        React.isValidElement(child)\n          ? React.cloneElement(child, {\n            meta: selectedBlock, isMobileView, fullScreen, setFullScreen,\n          })\n          : child\n      )}\n    </ScrollArea>\n  );\n};"
                                        },
                                        {
                                            "id": "7pjwp",
                                            "name": "header.jsx",
                                            "type": "file",
                                            "content": "import { Button } from \"@/components/ui/button\";\nimport { ArrowLeft, ArrowRight, X } from \"lucide-react\";\nimport clsx from \"clsx\";\nimport { useExplorer } from \"../context/explorer-context\";\n\nexport const ViewerLeft = ({ children }) => children;\n\nexport const ViewerLeftNav = () => {\n  const { master, config } = useExplorer();\n\n  const allBlocks = master\n    .filter((item) => item.type === \"block\")\n    .flatMap((item) => item.blocks ?? []);\n\n  const currentIndex = allBlocks.findIndex((b) => b.slug === config?.getPathname());\n\n  const isPrevDisabled = currentIndex <= 0;\n  const isNextDisabled = currentIndex >= allBlocks.length - 1;\n\n  return (\n    <>\n      <Button variant=\"ghost\" size=\"icon\" onClick={() => config?.navigate(config?.baseSlug)}>\n        <X className=\"h-4 w-4\" />\n      </Button>\n      <Button\n        variant=\"ghost\"\n        size=\"icon\"\n        disabled={isPrevDisabled}\n        onClick={() => !isPrevDisabled && config?.navigate(allBlocks[currentIndex - 1].slug)}\n      >\n        <ArrowLeft className=\"h-4 w-4\" />\n      </Button>\n      <Button\n        variant=\"ghost\"\n        size=\"icon\"\n        disabled={isNextDisabled}\n        onClick={() => !isNextDisabled && config?.navigate(allBlocks[currentIndex + 1].slug)}\n      >\n        <ArrowRight className=\"h-4 w-4\" />\n      </Button>\n    </>\n  );\n};\n\nexport const ViewerRight = ({ children }) => (\n  <div className=\"ml-auto\">{children}</div>\n);\n\nexport const ViewerRightMobileOnly = ({ children }) => {\n  const { isMobileView } = useExplorer();\n  return isMobileView ? <div className=\"ml-auto\">{children}</div> : null;\n};\n\nexport const ViewerRightDesktopOnly = ({ children }) => {\n  const { isMobileView } = useExplorer();\n  return !isMobileView ? <div className=\"ml-auto\">{children}</div> : null;\n};\n\nexport const ViewerHeader = ({ className }) => {\n  const { selectedBlock, fullScreen } = useExplorer();\n\n  if (fullScreen) return null;\n\n  return (selectedBlock?.title || selectedBlock?.description) && (\n    <>\n      <div className={clsx(\"grid gap-1 min-w-0\", className)}>\n        <p className=\"text-sm font-semibold\">{selectedBlock?.title}</p>\n        <div className=\"line-clamp-3 text-xs\">\n          <p className=\"text-sm text-muted-foreground\">{selectedBlock?.description}</p>\n        </div>\n      </div>\n      <div className=\"border-t\" />\n    </>\n  );\n};"
                                        },
                                        {
                                            "id": "np2km",
                                            "name": "index.jsx",
                                            "type": "file",
                                            "content": "export { Viewer } from './viewer';\nexport { \n  ViewerLeft,\n  ViewerRight,\n  ViewerLeftNav,\n  ViewerRightMobileOnly,\n  ViewerRightDesktopOnly\n} from './header';\nexport { ViewerHeader } from './header';\nexport { ViewerContent } from './content';"
                                        },
                                        {
                                            "id": "p83op",
                                            "name": "viewer.jsx",
                                            "type": "file",
                                            "content": "export const Viewer = ({ children }) => (\n    <div className=\"flex h-full w-full flex-col\">{children}</div>\n  );"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "id": "a8zec",
                    "name": "hooks",
                    "type": "folder",
                    "children": [
                        {
                            "id": "rtgts",
                            "name": "use-window-size.jsx",
                            "type": "file",
                            "content": "import { useState, useEffect } from \"react\";\n\nexport function useWindowSize() {\n  const [size, setSize] = useState({\n    width: undefined,\n    height: undefined,\n  });\n\n  useEffect(() => {\n    function handleResize() {\n      setSize({\n        width: window.innerWidth,\n        height: window.innerHeight,\n      });\n    }\n    handleResize();\n\n    window.addEventListener(\"resize\", handleResize);\n    return () => window.removeEventListener(\"resize\", handleResize);\n  }, []);\n\n  return size;\n}\n"
                        }
                    ]
                }
            ]
        }
    ],
    usage: [
        {
            "id": "1wvvu",
            "name": "src",
            "type": "folder",
            "children": [
                {
                    "id": "imvbe",
                    "name": "routes",
                    "type": "folder",
                    "children": [
                        {
                            "id": "7wcei",
                            "name": "private-route.jsx",
                            "type": "file",
                            "content": "import React from 'react'\n\nconst PrivateRoute = ({ children }) => {\n    const isAllowed = true\n\n    return isAllowed ? children : <div>You are not allowed to access this route</div>\n}\n\nexport default PrivateRoute"
                        },
                        {
                            "id": "md3xx",
                            "name": "route-config.jsx",
                            "type": "file",
                            "content": "import DashboardLayout from \"@/pages/dashboard/layout\";\nimport PrivateRoute from \"@/routes/private-route\";\n\n\nimport Activity from \"@/pages/dashboard/activity/page\";\nimport Engagement from \"@/pages/dashboard/analytics/engagement/page\";\nimport DataExplorer from \"@/pages/dashboard/analytics/explorer/page\";\nimport Reports from \"@/pages/dashboard/analytics/reports/page\";\nimport Tone from \"@/pages/dashboard/assistant/tone/page\";\nimport Translation from \"@/pages/dashboard/assistant/translation/page\";\nimport Writing from \"@/pages/dashboard/assistant/writing/page\";\nimport Editor from \"@/pages/dashboard/documents/editor/page\";\nimport Library from \"@/pages/dashboard/documents/library/page\";\nimport Templates from \"@/pages/dashboard/documents/templates/page\";\nimport Messages from \"@/pages/dashboard/messages/page\";\nimport Dashboard from \"@/pages/dashboard/page\";\nimport AllProjects from \"@/pages/dashboard/projects/all/page\";\nimport CreateProject from \"@/pages/dashboard/projects/create/page\";\nimport MyProjects from \"@/pages/dashboard/projects/page\";\nimport Account from \"@/pages/dashboard/settings/account/page\";\nimport Notifications from \"@/pages/dashboard/settings/notifications/page\";\nimport Profile from \"@/pages/dashboard/settings/profile/page\";\nimport ContactSupport from \"@/pages/dashboard/support/contact/page\";\nimport HelpCenter from \"@/pages/dashboard/support/help-center/page\";\nimport SystemStatus from \"@/pages/dashboard/support/status/page\";\nimport Team from \"@/pages/dashboard/team/page\";\nimport Permissions from \"@/pages/dashboard/team/permissions/page\";\n\nimport RootLayout from \"@/pages/home/layout\";\nimport Home from \"@/pages/home/page\";\nimport Layouts from \"@/pages/home/layouts/[id]/page\";\n\n\nconst RouteConfig = [\n    {\n        path: \"/\",\n        element: <Home />,\n        wrappers: [<RootLayout />]\n    },\n    {\n        path: \"/layouts/:id\",\n        element: <Layouts />,\n        wrappers: [<RootLayout />]\n    },\n    {\n        path: \"/demo/dashboard\",\n        element: <Dashboard />,\n        wrappers: [<PrivateRoute />, <DashboardLayout />]\n    },\n    {\n        path: \"/demo/dashboard/activity\",\n        element: <Activity />,\n        wrappers: [<PrivateRoute />, <DashboardLayout />]\n    },\n    {\n        path: \"/demo/dashboard/projects\",\n        element: <MyProjects />,\n        wrappers: [<PrivateRoute />, <DashboardLayout />]\n    },\n    {\n        path: \"/demo/dashboard/projects/all\",\n        element: <AllProjects />,\n        wrappers: [<PrivateRoute />, <DashboardLayout />]\n    },\n    {\n        path: \"/demo/dashboard/projects/create\",\n        element: <CreateProject />,\n        wrappers: [<PrivateRoute />, <DashboardLayout />]\n    },\n    {\n        path: \"/demo/dashboard/analytics/reports\",\n        element: <Reports />,\n        wrappers: [<PrivateRoute />, <DashboardLayout />]\n    },\n    {\n        path: \"/demo/dashboard/analytics/engagement\",\n        element: <Engagement />,\n        wrappers: [<PrivateRoute />, <DashboardLayout />]\n    },\n    {\n        path: \"/demo/dashboard/analytics/explorer\",\n        element: <DataExplorer />,\n        wrappers: [<PrivateRoute />, <DashboardLayout />]\n    },\n    {\n        path: \"/demo/dashboard/documents/library\",\n        element: <Library />,\n        wrappers: [<PrivateRoute />, <DashboardLayout />]\n    },\n    {\n        path: \"/demo/dashboard/documents/editor\",\n        element: <Editor />,\n        wrappers: [<PrivateRoute />, <DashboardLayout />]\n    },\n    {\n        path: \"/demo/dashboard/documents/templates\",\n        element: <Templates />,\n        wrappers: [<PrivateRoute />, <DashboardLayout />]\n    },\n    {\n        path: \"/demo/dashboard/team\",\n        element: <Team />,\n        wrappers: [<PrivateRoute />, <DashboardLayout />]\n    },\n    {\n        path: \"/demo/dashboard/team/permissions\",\n        element: <Permissions />,\n        wrappers: [<PrivateRoute />, <DashboardLayout />]\n    },\n    {\n        path: \"/demo/dashboard/messages\",\n        element: <Messages />,\n        wrappers: [<PrivateRoute />, <DashboardLayout />]\n    },\n    {\n        path: \"/demo/dashboard/assistant/writing\",\n        element: <Writing />,\n        wrappers: [<PrivateRoute />, <DashboardLayout />]\n    },\n    {\n        path: \"/demo/dashboard/assistant/translation\",\n        element: <Translation />,\n        wrappers: [<PrivateRoute />, <DashboardLayout />]\n    },\n    {\n        path: \"/demo/dashboard/assistant/tone\",\n        element: <Tone />,\n        wrappers: [<PrivateRoute />, <DashboardLayout />]\n    },\n    {\n        path: \"/demo/dashboard/settings/profile\",\n        element: <Profile />,\n        wrappers: [<PrivateRoute />, <DashboardLayout />]\n    },\n    {\n        path: \"/demo/dashboard/settings/notifications\",\n        element: <Notifications />,\n        wrappers: [<PrivateRoute />, <DashboardLayout />]\n    },\n    {\n        path: \"/demo/dashboard/settings/account\",\n        element: <Account />,\n        wrappers: [<PrivateRoute />, <DashboardLayout />]\n    },\n    {\n        path: \"/demo/dashboard/support/help-center\",\n        element: <HelpCenter />,\n        wrappers: [<PrivateRoute />, <DashboardLayout />]\n    },\n    {\n        path: \"/demo/dashboard/support/contact\",\n        element: <ContactSupport />,\n        wrappers: [<PrivateRoute />, <DashboardLayout />]\n    },\n    {\n        path: \"/demo/dashboard/support/status\",\n        element: <SystemStatus />,\n        wrappers: [<PrivateRoute />, <DashboardLayout />]\n    }\n];\n\nexport default RouteConfig;\n"
                        },
                        {
                            "id": "8b4x7",
                            "name": "route.jsx",
                            "type": "file",
                            "content": "import React from 'react';\nimport { Routes, Route } from 'react-router-dom';\nimport RouteConfig from '@/routes/route-config'\n\nconst wrapWith = (element, wrappers = []) =>\n    wrappers.reduceRight((acc, Wrapper) => React.cloneElement(Wrapper, {}, acc), element);\n\n\nconst AppRoutes = () => {\n    return (\n        <Routes>\n            {RouteConfig.map(({ path, element, wrappers }) => {\n                const wrappedElement = wrapWith(element, wrappers);\n                return <Route key={path} path={path} element={wrappedElement} />;\n            })}\n        </Routes>\n    );\n\n}\n\nexport default AppRoutes"
                        }
                    ]
                },
                {
                    "id": "y6ku5",
                    "name": "pages",
                    "type": "folder",
                    "children": [
                        {
                            "id": "rmne0",
                            "name": "dashboard",
                            "type": "folder",
                            "children": [
                                {
                                    "id": "3mtmw",
                                    "name": "activity",
                                    "type": "folder",
                                    "children": [
                                        {
                                            "id": "enx4o",
                                            "name": "page.jsx",
                                            "type": "file",
                                            "content": "import React from 'react';\n\nconst Activity = () => {\n\n  return (\n    <div>Activity</div>\n  )\n  return (\n    <div className=\"p-6\">\n      <div className=\"bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden\">\n        <iframe\n          src=\"https://9000-firebase-fractus-ui-1750908709332.cluster-zkm2jrwbnbd4awuedc2alqxrpk.cloudworkstations.dev/dashboard\"\n          title=\"Embedded Activity\"\n          className=\"w-full h-[600px] border-none\"\n        />\n      </div>\n    </div>\n  );\n};\n\nexport default Activity;\n"
                                        }
                                    ]
                                },
                                {
                                    "id": "ipoyu",
                                    "name": "analytics",
                                    "type": "folder",
                                    "children": [
                                        {
                                            "id": "cuflt",
                                            "name": "engagement",
                                            "type": "folder",
                                            "children": [
                                                {
                                                    "id": "zojzs",
                                                    "name": "page.jsx",
                                                    "type": "file",
                                                    "content": "import React from 'react'\n\nconst Engagement = () => {\n    return (\n        <div>Engagement</div>\n    )\n}\n\nexport default Engagement"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "x3ncd",
                                            "name": "explorer",
                                            "type": "folder",
                                            "children": [
                                                {
                                                    "id": "zyfac",
                                                    "name": "page.jsx",
                                                    "type": "file",
                                                    "content": "import React from 'react'\n\nconst Explorer = () => {\n    return (\n        <div>Explorer</div>\n    )\n}\n\nexport default Explorer"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "ti311",
                                            "name": "reports",
                                            "type": "folder",
                                            "children": [
                                                {
                                                    "id": "anz6j",
                                                    "name": "page.jsx",
                                                    "type": "file",
                                                    "content": "import React from 'react'\n\nconst Reports = () => {\n    return (\n        <div>Reports</div>\n    )\n}\n\nexport default Reports"
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "id": "ekcap",
                                    "name": "assistant",
                                    "type": "folder",
                                    "children": [
                                        {
                                            "id": "yzgwe",
                                            "name": "tone",
                                            "type": "folder",
                                            "children": [
                                                {
                                                    "id": "zorsm",
                                                    "name": "page.jsx",
                                                    "type": "file",
                                                    "content": "import React from 'react'\n\nconst Tone = () => {\n    return (\n        <div>Tone</div>\n    )\n}\n\nexport default Tone"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "dclq2",
                                            "name": "translation",
                                            "type": "folder",
                                            "children": [
                                                {
                                                    "id": "fe540",
                                                    "name": "page.jsx",
                                                    "type": "file",
                                                    "content": "import React from 'react'\n\nconst Translation = () => {\n    return (\n        <div>Translation</div>\n    )\n}\n\nexport default Translation"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "vl9mm",
                                            "name": "writing",
                                            "type": "folder",
                                            "children": [
                                                {
                                                    "id": "e4c36",
                                                    "name": "page.jsx",
                                                    "type": "file",
                                                    "content": "import React from 'react'\n\nconst Writing = () => {\n    return (\n        <div>Writing</div>\n    )\n}\n\nexport default Writing"
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "id": "qvhcc",
                                    "name": "documents",
                                    "type": "folder",
                                    "children": [
                                        {
                                            "id": "vbphw",
                                            "name": "editor",
                                            "type": "folder",
                                            "children": [
                                                {
                                                    "id": "kvhh4",
                                                    "name": "page.jsx",
                                                    "type": "file",
                                                    "content": "import React from 'react'\n\nconst Editor = () => {\n    return (\n        <div>Editor</div>\n    )\n}\n\nexport default Editor"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "ofhst",
                                            "name": "library",
                                            "type": "folder",
                                            "children": [
                                                {
                                                    "id": "xvmdi",
                                                    "name": "page.jsx",
                                                    "type": "file",
                                                    "content": "import React from 'react'\n\nconst Library = () => {\n    return (\n        <div>Library</div>\n    )\n}\n\nexport default Library"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "78z2a",
                                            "name": "templates",
                                            "type": "folder",
                                            "children": [
                                                {
                                                    "id": "ny28b",
                                                    "name": "page.jsx",
                                                    "type": "file",
                                                    "content": "import React from 'react'\n\nconst Templates = () => {\n    return (\n        <div>Templates</div>\n    )\n}\n\nexport default Templates"
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "id": "mydw6",
                                    "name": "layout.jsx",
                                    "type": "file",
                                    "content": `import Explorer from "@/components/explorer"
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

export default DashboardLayout`
                                },
                                {
                                    "id": "72uh8",
                                    "name": "messages",
                                    "type": "folder",
                                    "children": [
                                        {
                                            "id": "1vrmt",
                                            "name": "page.jsx",
                                            "type": "file",
                                            "content": "import React from 'react'\n\nconst Messages = () => {\n    return (\n        <div>Messages</div>\n    )\n}\n\nexport default Messages"
                                        }
                                    ]
                                },
                                {
                                    "id": "44of3",
                                    "name": "page.jsx",
                                    "type": "file",
                                    "content": "import React from 'react'\n\nconst Dashboard = () => {\n  return (\n    <div>Dashboard</div>\n  )\n}\n\nexport default Dashboard"
                                },
                                {
                                    "id": "24ijr",
                                    "name": "projects",
                                    "type": "folder",
                                    "children": [
                                        {
                                            "id": "5xbtp",
                                            "name": "all",
                                            "type": "folder",
                                            "children": [
                                                {
                                                    "id": "0ibfp",
                                                    "name": "page.jsx",
                                                    "type": "file",
                                                    "content": "import React from 'react'\n\nconst All = () => {\n    return (\n        <div>All</div>\n    )\n}\n\nexport default All"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "ecw56",
                                            "name": "create",
                                            "type": "folder",
                                            "children": [
                                                {
                                                    "id": "a1de7",
                                                    "name": "page.jsx",
                                                    "type": "file",
                                                    "content": "import React from 'react'\n\nconst Create = () => {\n    return (\n        <div>Create</div>\n    )\n}\n\nexport default Create"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "jqge7",
                                            "name": "page.jsx",
                                            "type": "file",
                                            "content": "import React from 'react'\n\nconst Projects = () => {\n    return (\n        <div>Projects</div>\n    )\n}\n\nexport default Projects"
                                        }
                                    ]
                                },
                                {
                                    "id": "vpzo3",
                                    "name": "settings",
                                    "type": "folder",
                                    "children": [
                                        {
                                            "id": "emes9",
                                            "name": "account",
                                            "type": "folder",
                                            "children": [
                                                {
                                                    "id": "kfpbq",
                                                    "name": "page.jsx",
                                                    "type": "file",
                                                    "content": "import React from 'react'\n\nconst Account = () => {\n    return (\n        <div>Account</div>\n    )\n}\n\nexport default Account"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "ocqm9",
                                            "name": "notifications",
                                            "type": "folder",
                                            "children": [
                                                {
                                                    "id": "xkugw",
                                                    "name": "page.jsx",
                                                    "type": "file",
                                                    "content": "import React from 'react'\n\nconst Notifications = () => {\n    return (\n        <div>Notifications</div>\n    )\n}\n\nexport default Notifications"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "z1ko8",
                                            "name": "profile",
                                            "type": "folder",
                                            "children": [
                                                {
                                                    "id": "skasn",
                                                    "name": "page.jsx",
                                                    "type": "file",
                                                    "content": "import React from 'react'\n\nconst Profile = () => {\n    return (\n        <div>Profile</div>\n    )\n}\n\nexport default Profile"
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "id": "ny5yw",
                                    "name": "support",
                                    "type": "folder",
                                    "children": [
                                        {
                                            "id": "0gshr",
                                            "name": "contact",
                                            "type": "folder",
                                            "children": [
                                                {
                                                    "id": "hbmhg",
                                                    "name": "page.jsx",
                                                    "type": "file",
                                                    "content": "import React from 'react'\n\nconst Contact = () => {\n    return (\n        <div>Contact</div>\n    )\n}\n\nexport default Contact"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "zxbxg",
                                            "name": "help-center",
                                            "type": "folder",
                                            "children": [
                                                {
                                                    "id": "szcuj",
                                                    "name": "page.jsx",
                                                    "type": "file",
                                                    "content": "import React from 'react'\n\nconst HelpCenter = () => {\n    return (\n        <div>HelpCenter</div>\n    )\n}\n\nexport default HelpCenter"
                                                }
                                            ]
                                        },
                                        {
                                            "id": "ci5m6",
                                            "name": "status",
                                            "type": "folder",
                                            "children": [
                                                {
                                                    "id": "yofgw",
                                                    "name": "page.jsx",
                                                    "type": "file",
                                                    "content": "import React from 'react'\n\nconst Status = () => {\n    return (\n        <div>Status</div>\n    )\n}\n\nexport default Status"
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "id": "epoqy",
                                    "name": "team",
                                    "type": "folder",
                                    "children": [
                                        {
                                            "id": "826nd",
                                            "name": "page.jsx",
                                            "type": "file",
                                            "content": "import React from 'react'\n\nconst Team = () => {\n    return (\n        <div>Team</div>\n    )\n}\n\nexport default Team"
                                        },
                                        {
                                            "id": "m2pir",
                                            "name": "permissions",
                                            "type": "folder",
                                            "children": [
                                                {
                                                    "id": "8ahey",
                                                    "name": "page.jsx",
                                                    "type": "file",
                                                    "content": "import React from 'react'\n\nconst Permissions = () => {\n    return (\n        <div>Permissions</div>\n    )\n}\n\nexport default Permissions"
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        {
            id: "ss6sd6",
            name: "App.jsx",
            type: "file",
            content: `import AppRoutes from "@/routes/route"
import { BrowserRouter as Router } from 'react-router-dom';

function App() {

  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

export default App
`
        },
        {
            id: "wew451",
            name: "main.jsx",
            type: "file",
            content: `import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from '@/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   
      <App />
  </StrictMode>,
)

`
        }
    ]
}

const steps = {
    manual: [
        {
            title: "Install Dependencies",
            description: "Use the following npm command to install the required dependencies.",
            code: ["npx shadcn@latest add button toggle scroll-area"]
        },
        {
            title: "Setup Configuration",
            description: "Copy and Paste all the codes in your project",
            codeViewer: () => {
                return <CodeViewer className="h-[60vh] w-full rounded-lg border border-border" files={files?.setup}>
                    <CodeViewer.FileExplorer>
                        <CodeViewer.Header>
                            <CodeViewer.HeaderLeft className="px-4">
                                <h1 className="text-sm font-bold cursor-pointer">EXPLORER</h1>
                            </CodeViewer.HeaderLeft>

                            <CodeViewer.HeaderRight>
                                <div className="flex border border-border divide-x divide-border">
                                    <div className="p-2 cursor-pointer hover:bg-muted flex items-center justify-center">
                                        <Ellipsis className="h-5 w-5" />
                                    </div>
                                </div>
                            </CodeViewer.HeaderRight>



                        </CodeViewer.Header>

                        <div className="border-t" />

                        <CodeViewer.FileExplorerBody />

                    </CodeViewer.FileExplorer>



                    <CodeViewer.FileViewer>
                        <CodeViewer.FileViewerHeader />

                        <div className="border-t" />

                        <CodeViewer.FileViewerBreadcrumb />


                        <div className="border-t" />

                        <CodeViewer.FileViewerBody className="p-4" />

                    </CodeViewer.FileViewer>
                </CodeViewer>
            }
        },
        {
            title: "Update imports",
            description: "Update the import paths to match your project setup.",
        },
    ],
    cli: [
        {
            title: "Install",
            description: "Use the following npm command to install the component.",
            code: ["npx shadcn@latest add https://fractus-ui.pages.dev/r/explorer.json"]
        },
    ]
}

const usage = {
    fn: () => (
        <CodeViewer className="h-[60vh] w-full rounded-lg border border-border" files={files?.usage}>
            <CodeViewer.FileExplorer>
                <CodeViewer.Header>
                    <CodeViewer.HeaderLeft className="px-4">
                        <h1 className="text-sm font-bold cursor-pointer">EXPLORER</h1>
                    </CodeViewer.HeaderLeft>

                    <CodeViewer.HeaderRight>
                        <div className="flex border border-border divide-x divide-border">
                            <div className="p-2 cursor-pointer hover:bg-muted flex items-center justify-center">
                                <Ellipsis className="h-5 w-5" />
                            </div>
                        </div>
                    </CodeViewer.HeaderRight>



                </CodeViewer.Header>

                <div className="border-t" />

                <CodeViewer.FileExplorerBody />

            </CodeViewer.FileExplorer>



            <CodeViewer.FileViewer>
                <CodeViewer.FileViewerHeader />

                <div className="border-t" />

                <CodeViewer.FileViewerBreadcrumb />


                <div className="border-t" />

                <CodeViewer.FileViewerBody className="p-4" />

            </CodeViewer.FileViewer>
        </CodeViewer>
    ),
    title: "Usage",
    description: "The following is the complete code which includes how to setup pages with react router dom. You can have pages setup any way you like, but just follow the code for routes inside the routes folder. This will also make your existing react code more scalable"
}

const info = "This layout is only supported in React. It is not compatible with other React-based frameworks like Next.js."

export { files, info, steps, usage };
