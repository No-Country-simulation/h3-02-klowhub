export default function shouldNotDisallowDomains(url: string) {
  try {
    // construct URL
    const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`);

    // only auto-link if the domain is not in the disallowed list
    const disallowedDomains: string[] = [];
    const domain = parsedUrl.hostname;

    return !disallowedDomains.includes(domain);
  } catch {
    return false;
  }
}
