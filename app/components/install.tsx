import usePWAInstall from "@/hooks/usePWAInstall";
import { useEffect } from "react";

export default function InstallButton() {
  const { deferredPrompt, promptInstall } = usePWAInstall();

  return (
    deferredPrompt && (
      <button
        className="fixed bottom-5 right-5 bg-blue-600 text-white px-4 py-2 rounded"
        onClick={promptInstall}
      >
        Install App
      </button>
    )
  );
}
