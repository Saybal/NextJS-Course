import Navbar from "@/components/public/Navbar";
import { ReactNode } from "react";
import { ConvexClientProvider } from "../ConvexClientProvider";

export default function SharedLayout({children} : {children : ReactNode}) {
    return (
        <>
            <Navbar/>
            <ConvexClientProvider>{children}</ConvexClientProvider>
        </>
    )
}