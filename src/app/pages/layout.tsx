"use client";

import React from "react";

export default function Layout({
                                   children,
                               }: {
    children: React.ReactNode
}) {
    return (
        <div className="flex-1 flex flex-col justify-center items-center p-8 pt-6">
            {children}
        </div>
    );
}