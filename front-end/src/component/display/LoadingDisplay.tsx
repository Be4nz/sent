import { useTheme, Grid, LinearProgress } from "@mui/material";
import { LogoTextSvg } from "../svg/LogoTextSvg";

interface Props {
    minWidth?: string;
    maxWidth?: string;
    padding?: string;
    margin?: string
}

const LoadingDisplay: React.FC<Props> = (props) => {
    const Theme = useTheme();

    return (
        <Grid 
            container 
            direction="column" 
            rowSpacing={2} 
            minWidth={props.minWidth || "100px"} 
            maxWidth={props.maxWidth || "376px"} 
            padding={props.padding || "20px"} 
            mx={props.margin || "auto"}
            my={props.margin || "30vh"}
        >
            <Grid item>
                <LogoTextSvg width="100%"/>
            </Grid>
            <Grid item width="100%">
                <LinearProgress/>
            </Grid>
        </Grid>
    )
};

export default LoadingDisplay;