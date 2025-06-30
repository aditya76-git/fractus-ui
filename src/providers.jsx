import { ThemeProvider } from "@/components/theme-provider"


const Providers = ({ children }) => {
    return <ThemeProvider>
        {children}
    </ThemeProvider>
}

export default Providers