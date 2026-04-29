import Navbar from "@/components/public/Navbar";
import { ReactNode } from "react";
import { ConvexClientProvider } from "../../components/public/ConvexClientProvider";

export default function SharedLayout({children} : {children : ReactNode}) {
    return (
        <>
            
            <ConvexClientProvider>
                <Navbar />
                {children}
            </ConvexClientProvider>
        </>
    )
}