import type { AppStatus } from '../shared/status.js';

const statusElement = document.querySelector<HTMLElement>('#status');
async function loadStatus(): Promise<void> {
  try {
    const response = await fetch(new URL('api/status', document.baseURI));
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const status: AppStatus = await response.json();
    if (statusElement) statusElement.textContent = `Verbunden · Version ${status.version}`;
  } catch {
    if (statusElement) statusElement.textContent = 'Der Server ist gerade nicht erreichbar. Bitte lade die Seite erneut.';
  }
}
void loadStatus();
