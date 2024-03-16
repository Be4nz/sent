import React from "react";
import { useTheme } from "@mui/material";

export const LogoTextSvg: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {

    const Theme = useTheme();

    return (
        <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width={props.width} height={props.height} viewBox="0 0 50 17" preserveAspectRatio="xMidYMid meet">
            <g fill={Theme.palette.text.primary}>
                <path d="M24.48 13.46 c-0.78 -0.08 -1.44 -0.32 -1.98 -0.73 -0.60 -0.45 -0.97 -1.08 -1.06 -1.79 -0.01 -0.11 -0.01 -0.12 0.01 -0.15 0.03 -0.03 0.03 -0.03 1.20 -0.03 1.18 0 1.18 0 1.18 0.05 0.02 0.11 0.05 0.22 0.08 0.28 0.12 0.25 0.36 0.44 0.69 0.53 0.10 0.03 0.13 0.03 0.37 0.03 0.24 0 0.28 -0 0.37 -0.03 0.22 -0.06 0.38 -0.17 0.45 -0.32 0.07 -0.14 0.06 -0.34 -0.02 -0.47 -0.12 -0.19 -0.47 -0.32 -1.51 -0.58 -1.08 -0.27 -1.52 -0.45 -1.91 -0.77 -0.39 -0.33 -0.59 -0.67 -0.67 -1.14 -0.02 -0.10 -0.02 -0.20 -0.02 -0.41 0 -0.25 0 -0.29 0.03 -0.44 0.09 -0.43 0.27 -0.78 0.57 -1.09 0.61 -0.63 1.61 -0.95 2.80 -0.89 1.10 0.05 1.88 0.41 2.44 1.12 0.30 0.38 0.50 0.86 0.57 1.40 0.03 0.19 0.17 0.17 -1.13 0.17 -1.12 0 -1.12 0 -1.12 -0.04 0 -0.05 -0.06 -0.25 -0.10 -0.32 -0.09 -0.17 -0.22 -0.29 -0.40 -0.38 -0.17 -0.09 -0.27 -0.11 -0.53 -0.11 -0.19 -0 -0.24 -0 -0.35 0.02 -0.23 0.05 -0.38 0.15 -0.46 0.30 -0.04 0.08 -0.04 0.09 -0.04 0.22 0 0.12 0 0.14 0.03 0.21 0.10 0.21 0.39 0.34 1.19 0.54 0.45 0.11 0.84 0.22 1.16 0.33 0.63 0.21 0.88 0.35 1.22 0.70 0.30 0.30 0.44 0.57 0.53 0.97 0.19 0.96 -0.19 1.82 -1.03 2.34 -0.40 0.25 -0.89 0.41 -1.45 0.49 -0.21 0.03 -0.92 0.03 -1.15 0.01z"/>
                <path d="M32.12 13.48 c-0.32 -0.03 -0.59 -0.08 -0.83 -0.15 -0.87 -0.24 -1.57 -0.75 -2.04 -1.46 -0.40 -0.61 -0.62 -1.31 -0.65 -2.13 -0.04 -1.03 0.17 -1.90 0.65 -2.62 0.58 -0.87 1.51 -1.43 2.65 -1.57 0.35 -0.04 0.88 -0.04 1.23 0 1.05 0.13 1.93 0.62 2.51 1.39 0.40 0.53 0.64 1.16 0.73 1.89 0.04 0.30 0.03 1.04 -0.02 1.26 -0.01 0.03 -0.01 0.03 -2.66 0.03 -2.66 0 -2.66 0 -2.65 0.08 0.08 0.71 0.54 1.20 1.20 1.29 0.16 0.02 0.41 0.01 0.56 -0.02 0.36 -0.08 0.64 -0.30 0.81 -0.64 0.03 -0.07 0.03 -0.07 1.30 -0.07 1.26 0 1.26 0 1.29 0.03 0.02 0.03 0.02 0.04 -0.01 0.15 -0.12 0.41 -0.35 0.86 -0.64 1.22 -0.51 0.63 -1.28 1.09 -2.12 1.26 -0.31 0.06 -0.42 0.07 -0.84 0.08 -0.22 0 -0.42 0 -0.45 -0z m1.75 -4.88 c-0.04 -0.54 -0.43 -0.96 -1.02 -1.09 -0.12 -0.03 -0.47 -0.04 -0.60 -0.02 -0.34 0.05 -0.68 0.22 -0.88 0.47 -0.14 0.16 -0.23 0.36 -0.30 0.60 -0.02 0.07 -0.03 0.13 -0.03 0.13 0 0 0.64 0.01 1.42 0.01 1.42 0 1.42 0 1.42 -0.11z"/>
                <path d="M37.10 13.36 c-0.03 -0.03 -0.03 -0.03 -0.03 -3.86 0 -3.83 0 -3.83 0.03 -3.86 0.03 -0.03 0.03 -0.03 1.19 -0.03 1.17 0 1.17 0 1.19 0.03 0.03 0.03 0.03 0.03 0.03 0.46 0 0.24 0 0.43 0.01 0.43 0 0 0.02 -0.02 0.04 -0.04 0.22 -0.27 0.58 -0.54 0.94 -0.69 0.25 -0.11 0.52 -0.19 0.80 -0.23 0.18 -0.03 0.78 -0.03 0.97 -0.01 1.29 0.18 2.18 1.04 2.44 2.36 0.08 0.42 0.08 0.26 0.08 2.96 0 2.45 0 2.45 -0.02 2.48 -0.03 0.03 -0.03 0.03 -1.19 0.03 -1.16 0 -1.16 0 -1.19 -0.03 -0.03 -0.03 -0.03 -0.03 -0.03 -2.27 -0 -2.23 -0 -2.25 -0.03 -2.36 -0.13 -0.59 -0.45 -0.95 -0.98 -1.09 -0.16 -0.04 -0.51 -0.05 -0.70 -0.02 -0.30 0.05 -0.54 0.17 -0.74 0.37 -0.19 0.19 -0.31 0.44 -0.37 0.76 -0.03 0.14 -0.03 0.14 -0.03 2.36 -0 2.22 -0 2.22 -0.03 2.25 -0.03 0.03 -0.03 0.03 -1.19 0.03 -1.17 0 -1.17 0 -1.19 -0.03z"/>
                <path d="M48.47 13.37 c-0.32 -0.02 -0.65 -0.08 -0.94 -0.17 -0.17 -0.06 -0.49 -0.22 -0.63 -0.32 -0.55 -0.40 -0.84 -0.99 -0.90 -1.89 -0.01 -0.10 -0.01 -0.84 -0.01 -1.76 0 -1.59 0 -1.59 -0.44 -1.59 -0.42 0 -0.45 -0 -0.47 -0.02 -0.02 -0.02 -0.02 -0.11 -0.02 -1 0 -0.93 0 -0.98 0.02 -1 0.02 -0.02 0.07 -0.02 0.47 -0.02 0.44 0 0.44 0 0.44 -0.91 0 -0.91 0 -0.91 0.03 -0.94 0.03 -0.03 0.03 -0.03 1.19 -0.03 1.17 0 1.17 0 1.19 0.03 0.03 0.03 0.03 0.03 0.03 0.94 0 0.91 0 0.91 0.75 0.91 0.71 0 0.75 0 0.77 0.02 0.02 0.02 0.02 0.11 0.02 1 0 0.93 -0 0.98 -0.02 1 -0.02 0.02 -0.09 0.02 -0.77 0.02 -0.75 0 -0.75 0 -0.74 1.61 0 1.42 0 1.62 0.02 1.67 0.06 0.20 0.16 0.29 0.38 0.34 0.07 0.01 0.20 0.02 0.60 0.03 0.32 0 0.52 0.01 0.53 0.02 0.01 0.01 0.01 0.23 0.01 1.02 0 0.96 -0 1.01 -0.02 1.03 -0.02 0.02 -0.08 0.02 -0.67 0.02 -0.36 -0 -0.73 -0.01 -0.82 -0.01z"/>
            </g>
            <g fill={Theme.palette.primary.main}>
                <path d="M11.03 17.03 c-0.55 -0.03 -1.09 -0.16 -1.75 -0.42 -1.81 -0.72 -4.27 -2.51 -7.22 -5.27 -0.65 -0.61 -1.73 -1.66 -1.95 -1.91 -0.10 -0.11 -0.10 -0.11 1.18 -1.33 1.28 -1.23 1.28 -1.23 1.66 -0.85 2.34 2.34 4.67 4.31 6.34 5.36 0.46 0.29 1.18 0.67 1.21 0.65 0.01 -0.01 -0.16 -0.27 -0.33 -0.51 -0.30 -0.43 -0.69 -0.90 -1.39 -1.70 -0.81 -0.93 -1.12 -1.30 -1.41 -1.66 -1 -1.25 -1.44 -2.15 -1.49 -3.07 -0.02 -0.32 0.01 -0.55 0.09 -0.86 0.15 -0.57 0.49 -1.07 1.01 -1.48 0.33 -0.27 0.66 -0.44 1.12 -0.60 0.14 -0.05 2.32 -0.82 4.85 -1.72 2.53 -0.90 4.60 -1.63 4.61 -1.63 0 0 -1.87 10.12 -1.88 10.16 -0.01 0.02 -0.11 -0.06 -0.85 -0.69 -0.89 -0.76 -0.93 -0.79 -1.45 -1.11 -1.01 -0.63 -1.97 -1.11 -2.77 -1.38 -0.30 -0.10 -0.72 -0.21 -0.74 -0.20 -0.01 0.01 0.37 0.49 0.69 0.88 0.10 0.11 0.38 0.44 0.63 0.73 0.97 1.12 1.28 1.48 1.70 2.05 0.41 0.54 0.69 0.99 0.92 1.47 0.21 0.42 0.32 0.71 0.40 1.06 0.17 0.69 0.16 1.31 -0.04 1.91 -0.27 0.81 -0.82 1.47 -1.56 1.83 -0.36 0.18 -0.79 0.29 -1.17 0.30 -0.08 0 -0.17 0.01 -0.20 0.01 -0.03 0 -0.13 0 -0.23 -0z"/>
            </g>
        </svg>
    );
};