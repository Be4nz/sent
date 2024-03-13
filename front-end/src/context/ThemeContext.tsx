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
                ? // If colorMode is `dark`    
                {
                    primary: {
                        main: "#4f12ff",
                    },
                    text: {
                        primary: "#ffffff",
                    },
                    background: {
                        default: "#060606",
                    },
                }
                : // If colorMode is `light`    
                {
                    primary: {
                        main: "#4f12ff",
                    },
                    text: {
                        primary: "#060606",
                    },
                    background: {
                        default: "#ffffff",
                    },
                }
            ),
        },
        components: {
            MuiAvatar: {
                styleOverrides: {
                    root: {
                        minWidth: '32px',
                        minHeight: '32px',
                        maxWidth: '64px',
                        maxHeight: '64px',
                        '@media (min-width: 0px)': { // xs
                            width: '8.5vw',
                            height: '8.5vw',
                        },
                        '@media (min-width: 600px)': { // sm
                            width: '8.5vw',
                            height: '8.5vw',
                        },
                    },
                },
            },
            MuiTypography: {
                styleOverrides: {
                    root: {
                        fontFamily: 'Poppins',
                        textAlign: 'justify',
                        '@media (min-width: 0px)': { // xs
                            fontSize: '0.6rem',
                        },
                        '@media (min-width: 600px)': { // sm
                            fontSize: '1rem',
                        },
                    },
                },
            },
            MuiSvgIcon: {
                styleOverrides: {
                    root: {
                        '@media (min-width: 0px)': { // xs
                            fontSize: '0.6rem',
                        },
                        '@media (min-width: 600px)': { // sm
                            fontSize: '1em',
                        },
                    },
                },
            },
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
