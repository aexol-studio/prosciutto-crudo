import { AppProps } from 'next/app';
import { extendTheme, Theme, ChakraProvider } from '@chakra-ui/react';

const checkerImage = (color1: string, color2: string) =>
    `${color1} url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect x="200" width="200" height="200" fill="${color2}" /><rect y="200" width="200" height="200" fill="${color2}" /></svg>')`;
const checkerSize = (size: number) => {
    return {
        backgroundSize: `${size}px ${size}px`,
    };
};

const theme = extendTheme({
    styles: {
        global: {
            'html, body': {
                background: checkerImage('var(--chakra-colors-red-50)', 'white'),
                ...checkerSize(80),
            },
        },
    },
} as Pick<Theme, 'styles'>);
const App = ({ Component, pageProps }: AppProps) => {
    return (
        <ChakraProvider theme={theme}>
            <Component {...pageProps} />
        </ChakraProvider>
    );
};

export default App;
