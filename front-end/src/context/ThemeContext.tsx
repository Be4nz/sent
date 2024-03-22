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
	const [mode, setMode] = useState<string>(localStorage.getItem('color-mode') || 'dark');

	const COLOR = {
		primary: '#4f12ff',
		white: '#ffffff',
		black: '#060606',
		gray: '#888888',
	};

	const update = () => {
		if (localStorage.getItem('color-mode') === 'light') {
			localStorage.setItem('color-mode', 'dark');
		} else {
			localStorage.setItem('color-mode', 'light');
		}
		setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
	};

	useEffect(() => {
		if (!localStorage.getItem('color-mode')) {
			const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)');
			const systemMode = isSystemDark.matches ? 'dark' : 'light';
			localStorage.setItem('color-mode', systemMode);
			setMode(systemMode);
		}
	}, []);

	const theme = useMemo(
		() =>
			createTheme({
				palette: {
					mode: mode as PaletteMode,
					...(mode === 'dark'
						? // If colorMode is `dark`
						  {
								primary: {
									main: COLOR.primary,
								},
								secondary: {
									main: COLOR.white,
								},
								text: {
									primary: COLOR.white,
									secondary: COLOR.gray,
								},
								background: {
									default: COLOR.black,
								},
						  }
						: // If colorMode is `light`
						  {
								primary: {
									main: COLOR.primary,
								},
								secondary: {
									main: COLOR.black,
								},
								text: {
									primary: COLOR.black,
									secondary: COLOR.gray,
								},
								background: {
									default: COLOR.white,
								},
						  }),
				},

				components: {
					MuiAvatar: {
						styleOverrides: {
							root: {
								minWidth: '32px',
								minHeight: '32px',
								maxWidth: '64px',
								maxHeight: '64px',
								'@media (min-width: 0px)': {
									// xs
									width: '8.5vw',
									height: '8.5vw',
								},
								'@media (min-width: 600px)': {
									// sm
									width: '8.5vw',
									height: '8.5vw',
								},

								'&.profile-avatar': {
									minWidth: '64px',
									minHeight: '64px',
									maxWidth: '144px',
									maxHeight: '144px',
									'@media (min-width: 0px)': {
										// xs
										width: '19.1vw',
										height: '19.1vw',
									},
								},
							},
						},
					},
					MuiTypography: {
						styleOverrides: {
							root: {
								fontFamily: 'Poppins',
								textAlign: 'justify',
								wordBreak: 'break-all',
								'@media (min-width: 0px)': {
									// xs
									fontSize: '0.6rem',
								},
								'@media (min-width: 600px)': {
									// sm
									fontSize: '1rem',
								},
								'&.profile-typography-name': {
									'@media (min-width: 0px)': {
										// xs
										fontSize: '1rem',
									},
									'@media (min-width: 600px)': {
										// sm
										fontSize: '1.7rem',
									},
								},
							},
						},
					},
					MuiSvgIcon: {
						styleOverrides: {
							root: {
								// '@media (min-width: 0px)': {
								// 	// xs
								// 	fontSize: '0.6rem',
								// },
								'@media (min-width: 600px)': {
									// sm
									fontSize: '1em',
								},
							},
						},
					},
					MuiAppBar: {
						styleOverrides: {
							colorPrimary: {
								background: mode === 'dark' ? 'rgba(6, 6, 6, 0.6)' : 'rgba(255, 255, 255, 0.2)',
								boxShadow: 'none',
								backdropFilter: 'blur(15px)',
								WebkitBackdropFilter: 'blur(15px)',
								border: 'none',
								padding: '5px',
								zIndex: 999,
							},
						},
					},
					MuiBottomNavigation: {
						styleOverrides: {
							root: {
								background: mode === 'dark' ? 'rgba(6, 6, 6, 0.6)' : 'rgba(255, 255, 255, 0.2)',
								boxShadow: 'none',
								backdropFilter: 'blur(15px)',
								WebkitBackdropFilter: 'blur(15px)',
								border: 'none',
								zIndex: 999,
								position: 'fixed',
								bottom: 0,
								width: '100%',
							},
						},
					},
					MuiDrawer: {
						styleOverrides: {
							paper: {
								background: 'none',
								boxShadow: 'none',
								border: 'none',
								margin: '2vw',
								fontFamily: 'Poppins',
								zIndex: 100,
							},
						},
					},
					MuiListItemButton: {
						styleOverrides: {
							root: {
								// '&:hover': {
								// 	textShadow: '1px 1px 20px rgba(79,18,255,1)',
								// },
								width: '100%',
								color: COLOR.gray,
								marginBottom: 20,
								borderRadius: 10,
							},
						},
					},
					MuiListItemIcon: {
						styleOverrides: {
							root: {
								fontSize: '2em',
								color: COLOR.gray,
							},
						},
					},
					MuiLinearProgress: {
						styleOverrides: {
							root: {
								borderRadius: '10px',
							},
						},
					},
					MuiButton: {
						styleOverrides: {
							root: {
								borderRadius: '60px',
								fontFamily: 'Poppins',
								textTransform: 'none',

								'@media (min-width: 0px)': {
									// xs
									fontSize: '0.4rem',
								},
								'@media (min-width: 600px)': {
									// sm
									fontSize: '1rem',
								},
							},
						},
					},
					MuiDivider: {
						styleOverrides: {
							root: {
								borderBottom: `1px solid ${COLOR.gray}`,
								borderRadius: '2px',
							},
						},
					},
					MuiMenu: {
						styleOverrides: {
							paper: {
								background: mode === 'dark' ? 'rgba(6, 6, 6, 1)' : 'rgba(255, 255, 255, 1)',
								boxShadow: 'none',
								border: '1px solid #888888',
								borderRadius: '15px',
								zIndex: 999,
								minWidth: '200px',
								fontFamily: 'Poppins',
								paddingRight: '8px',
								paddingLeft: '8px',
							},
						},
					},
					MuiMenuItem: {
						styleOverrides: {
							root: {
								fontFamily: 'Poppins',
								borderRadius: '10px',
							},
						},
					},
				},
			}),
		[mode]
	);

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
