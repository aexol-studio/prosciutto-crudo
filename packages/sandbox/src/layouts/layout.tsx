import React from 'react';
import { CustomHelmet } from '@/src/components';
import { FiGithub } from 'react-icons/fi';
import { Button, Link, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

export const siteTitle = 'Next.js Sample Website';

interface LayoutProps {
    home?: boolean;
    pageTitle?: string;
}

const BB = styled(Button)`
    position: absolute;
    right: 10px;
    top: 10px;
    background: #666;
    color: #fff;
    :hover {
        color: #666;
    }
`;

export const Layout: React.FC<LayoutProps> = ({ children, home, pageTitle }) => {
    return (
        <div>
            <Link href="https://github.com/aexol-studio/prosciutto-crudo">
                <BB variant="solid">
                    <Text mr="2">Github</Text>
                    <FiGithub />
                </BB>
            </Link>
            <CustomHelmet pageTitle={pageTitle ? pageTitle : undefined} />
            {children}
        </div>
    );
};
