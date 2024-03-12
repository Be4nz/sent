import { Button, CssBaseline, Grid, useTheme } from "@mui/material";
import { useThemeContext } from "../../context/ThemeContext";

interface Props {
	children?: React.ReactNode;
}

const BaseLayout: React.FC<Props> = ({ children }) => {
    const Theme = useTheme();
    const { update } = useThemeContext();

    return (
        <Grid container direction="column" style={{ minHeight: '100vh', backgroundColor: Theme.palette.background.default }}>
            {/* Apply CSS baseline to reset default browser styles */}
            <CssBaseline />

            {/* Header component */}
            {/* <Header /> */}

            {/* Main content */}
            <Grid item xs={12} style={{ flex: 1 }}>
                {children}
            </Grid>

            {/* Footer component */}
            {/* <Footer /> */}
            <Button onClick={() => {update()}}>Change color mode</Button>
        </Grid>
    );
};

export default BaseLayout;