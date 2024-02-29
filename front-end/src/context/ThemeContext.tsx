import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { PaletteMode, ThemeProvider, createTheme } from '@mui/material';

interface ThemeContextProps {
    mode: string;
    update: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
    mode: 'dark',
    update: () => {},
});

export const useThemeContext = () => useContext(ThemeContext);

interface Props {
	children?: React.ReactNode;
}

export const ThemeContextProvider: React.FC<Props> = ({ children }) => {
    const [mode, setMode] = useState<string>(
        localStorage.getItem('color-mode') || 'dark'
    );

    const update = () => {
        if (localStorage.getItem("color-mode") === "light") {
            localStorage.setItem("color-mode", "dark");
        } else {
            localStorage.setItem("color-mode", "light");
        }
        setMode((prev) => (prev === "light" ? "dark" : "light"));
    }

    useEffect(() => {
        if (!localStorage.getItem('color-mode')) {
            const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)');
            const systemMode = isSystemDark.matches ? 'dark' : 'light';
            localStorage.setItem('color-mode', systemMode);
            setMode(systemMode);
        }
    }, []);

    const theme = useMemo(() => createTheme({
        palette: {
            mode: mode as PaletteMode,
            ...(mode === 'dark'
                ? // If colorMode is `dark`     // just configured, need to change the styling
                {
                    primary: {
                        main: "#f06292",
                    },
                    text: {
                        primary: "#f06292",
                    },
                    background: {
                        default: "#1E1E1E",
                    },
                }
                : // If colorMode is `light`    // just configured, need to change the styling
                {
                    primary: {
                        main: "#1e88e5",
                    },
                    text: {
                        primary: "#1e88e5",
                    },
                    background: {
                        default: "#FFFFFF",
                    },
                }
            ),
        },
    }), [mode])

    const ThemeContextValue: ThemeContextProps = {
        mode,
        update,
    };

	return (
        <ThemeContext.Provider value={ThemeContextValue}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeContext.Provider>
    );
};
