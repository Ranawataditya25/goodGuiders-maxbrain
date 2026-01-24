let deferredPrompt = null;
let canInstall = false;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  canInstall = true;
});

export const installPWA = async () => {
  if (!deferredPrompt) return;

  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  canInstall = false;
};

export const isPWAInstallable = () => canInstall;