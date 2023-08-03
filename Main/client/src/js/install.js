const butInstall = document.getElementById('buttonInstall');

const onBeforeInstallPrompt = (event) => {
  window.deferredPrompt = event;
  butInstall.classList.remove('hidden');
};

const onClickInstall = async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return;
  }

  promptEvent.prompt();

  const userChoice = await promptEvent.userChoice;

  if (userChoice.outcome === 'accepted') {
    console.log('App installed successfully!');
  } else {
    console.log('App installation canceled by user.');
  }

  window.deferredPrompt = null;
  butInstall.classList.add('hidden');
};

const onAppInstalled = (event) => {
  window.deferredPrompt = null;
};

// Event listeners
window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt);
butInstall.addEventListener('click', onClickInstall);
window.addEventListener('appinstalled', onAppInstalled);
