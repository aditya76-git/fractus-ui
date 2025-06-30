import DashboardLayout from "@/pages/dashboard/layout";
import PrivateRoute from "@/routes/private-route";


import Activity from "@/pages/dashboard/activity/page";
import Engagement from "@/pages/dashboard/analytics/engagement/page";
import DataExplorer from "@/pages/dashboard/analytics/explorer/page";
import Reports from "@/pages/dashboard/analytics/reports/page";
import Tone from "@/pages/dashboard/assistant/tone/page";
import Translation from "@/pages/dashboard/assistant/translation/page";
import Writing from "@/pages/dashboard/assistant/writing/page";
import Editor from "@/pages/dashboard/documents/editor/page";
import Library from "@/pages/dashboard/documents/library/page";
import Templates from "@/pages/dashboard/documents/templates/page";
import Messages from "@/pages/dashboard/messages/page";
import Dashboard from "@/pages/dashboard/page";
import AllProjects from "@/pages/dashboard/projects/all/page";
import CreateProject from "@/pages/dashboard/projects/create/page";
import MyProjects from "@/pages/dashboard/projects/page";
import Account from "@/pages/dashboard/settings/account/page";
import Notifications from "@/pages/dashboard/settings/notifications/page";
import Profile from "@/pages/dashboard/settings/profile/page";
import ContactSupport from "@/pages/dashboard/support/contact/page";
import HelpCenter from "@/pages/dashboard/support/help-center/page";
import SystemStatus from "@/pages/dashboard/support/status/page";
import Team from "@/pages/dashboard/team/page";
import Permissions from "@/pages/dashboard/team/permissions/page";

import RootLayout from "@/pages/home/layout";
import Home from "@/pages/home/page";
import Layouts from "@/pages/home/docs/layouts/[id]/page";
import Components from "@/pages/home/docs/components/[id]/page";


const RouteConfig = [
    {
        path: "/",
        element: <Home />,
        wrappers: [<RootLayout />]
    },
    {
        path: "/docs/layouts/:id",
        element: <Layouts />,
        wrappers: [<RootLayout />]
    },
    {
        path: "/docs/components/:id",
        element: <Components />,
        wrappers: [<RootLayout />]
    },
    {
        path: "/demo/dashboard",
        element: <Dashboard />,
        wrappers: [<PrivateRoute />, <DashboardLayout />]
    },
    {
        path: "/demo/dashboard/activity",
        element: <Activity />,
        wrappers: [<PrivateRoute />, <DashboardLayout />]
    },
    {
        path: "/demo/dashboard/projects",
        element: <MyProjects />,
        wrappers: [<PrivateRoute />, <DashboardLayout />]
    },
    {
        path: "/demo/dashboard/projects/all",
        element: <AllProjects />,
        wrappers: [<PrivateRoute />, <DashboardLayout />]
    },
    {
        path: "/demo/dashboard/projects/create",
        element: <CreateProject />,
        wrappers: [<PrivateRoute />, <DashboardLayout />]
    },
    {
        path: "/demo/dashboard/analytics/reports",
        element: <Reports />,
        wrappers: [<PrivateRoute />, <DashboardLayout />]
    },
    {
        path: "/demo/dashboard/analytics/engagement",
        element: <Engagement />,
        wrappers: [<PrivateRoute />, <DashboardLayout />]
    },
    {
        path: "/demo/dashboard/analytics/explorer",
        element: <DataExplorer />,
        wrappers: [<PrivateRoute />, <DashboardLayout />]
    },
    {
        path: "/demo/dashboard/documents/library",
        element: <Library />,
        wrappers: [<PrivateRoute />, <DashboardLayout />]
    },
    {
        path: "/demo/dashboard/documents/editor",
        element: <Editor />,
        wrappers: [<PrivateRoute />, <DashboardLayout />]
    },
    {
        path: "/demo/dashboard/documents/templates",
        element: <Templates />,
        wrappers: [<PrivateRoute />, <DashboardLayout />]
    },
    {
        path: "/demo/dashboard/team",
        element: <Team />,
        wrappers: [<PrivateRoute />, <DashboardLayout />]
    },
    {
        path: "/demo/dashboard/team/permissions",
        element: <Permissions />,
        wrappers: [<PrivateRoute />, <DashboardLayout />]
    },
    {
        path: "/demo/dashboard/messages",
        element: <Messages />,
        wrappers: [<PrivateRoute />, <DashboardLayout />]
    },
    {
        path: "/demo/dashboard/assistant/writing",
        element: <Writing />,
        wrappers: [<PrivateRoute />, <DashboardLayout />]
    },
    {
        path: "/demo/dashboard/assistant/translation",
        element: <Translation />,
        wrappers: [<PrivateRoute />, <DashboardLayout />]
    },
    {
        path: "/demo/dashboard/assistant/tone",
        element: <Tone />,
        wrappers: [<PrivateRoute />, <DashboardLayout />]
    },
    {
        path: "/demo/dashboard/settings/profile",
        element: <Profile />,
        wrappers: [<PrivateRoute />, <DashboardLayout />]
    },
    {
        path: "/demo/dashboard/settings/notifications",
        element: <Notifications />,
        wrappers: [<PrivateRoute />, <DashboardLayout />]
    },
    {
        path: "/demo/dashboard/settings/account",
        element: <Account />,
        wrappers: [<PrivateRoute />, <DashboardLayout />]
    },
    {
        path: "/demo/dashboard/support/help-center",
        element: <HelpCenter />,
        wrappers: [<PrivateRoute />, <DashboardLayout />]
    },
    {
        path: "/demo/dashboard/support/contact",
        element: <ContactSupport />,
        wrappers: [<PrivateRoute />, <DashboardLayout />]
    },
    {
        path: "/demo/dashboard/support/status",
        element: <SystemStatus />,
        wrappers: [<PrivateRoute />, <DashboardLayout />]
    }
];

export default RouteConfig;
