// hooks/usePWAInstall.js
import { useEffect, useState } from "react";

export default function usePWAInstall() {
    const [deferredPrompt, setDeferredPrompt] = useState(null);

    useEffect(() => {
        const handler = (e) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };
        window.addEventListener("beforeinstallprompt", handler);

        return () => window.removeEventListener("beforeinstallprompt", handler);
    }, []);

    const promptInstall = async() => {
        if (!deferredPrompt) return false;
        deferredPrompt.prompt();
        const result = await deferredPrompt.userChoice;
        setDeferredPrompt(null);
        return result.outcome === "accepted";
    };

    return { deferredPrompt, promptInstall };
}