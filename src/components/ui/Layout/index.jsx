import React from "react";
import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
    return <>
            <Header />
            <main className="bg-background text-white min-h-screen min-w-screen">
                {children}
            </main>
            <Footer />
            </>
}

export default Layout;