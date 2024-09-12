import React from 'react';

export function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <div>
            aku mw
            {children}
        </div>
    );
}
;

export default Layout;