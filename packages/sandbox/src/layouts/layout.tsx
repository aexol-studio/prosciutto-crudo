import React from 'react';
import { CustomHelmet } from '@/src/components';

export const siteTitle = 'Next.js Sample Website';

interface LayoutProps {
    home?: boolean;
    pageTitle?: string;
}

export const Layout: React.FC<LayoutProps> = ({ children, home, pageTitle }) => {
    return (
        <div>
            <CustomHelmet pageTitle={pageTitle ? pageTitle : undefined} />
            {children}
        </div>
    );
};
