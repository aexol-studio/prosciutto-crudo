import { AppProps } from 'next/app';
import { ProsciuttoProvider } from 'prosciutto-crudo';

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <ProsciuttoProvider>
            <Component {...pageProps} />
        </ProsciuttoProvider>
    );
};

export default App;
