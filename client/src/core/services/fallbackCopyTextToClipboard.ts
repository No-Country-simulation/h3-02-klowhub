export function fallbackCopyTextToClipboard(text: string) {
  const textArea = document.createElement('textarea');
  let copied = false;
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    copied = successful;
  } catch {
    copied = false;
  }

  document.body.removeChild(textArea);
  return copied ? Promise.resolve() : Promise.reject();
}
