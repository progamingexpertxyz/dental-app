import { useEffect, useState } from "react";

export default function HomePage() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstall, setShowInstall] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstall(true); // Show button
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;
    console.log("Install result:", result);
    if (result.outcome === "accepted") {
      console.log("App installed");
    }
    setDeferredPrompt(null);
    setShowInstall(false);
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-10">
      <h1 className="text-3xl font-bold">Welcome to Dental App</h1>
      {showInstall && (
        <button
          onClick={handleInstall}
          className="mt-5 px-6 py-2 bg-blue-600 text-white rounded-md"
        >
          Install App
        </button>
      )}
    </main>
  );
}
