import type { LinkProtocolOptions } from '@tiptap/extension-link';

type TipTapContext = {
  defaultValidate: (url: string) => boolean;
  protocols: Array<LinkProtocolOptions | string>;
  defaultProtocol: string;
};

export default function validateUrl(url: string, ctx: TipTapContext) {
  try {
    // construct URL
    const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`);
    if (!ctx.defaultValidate(parsedUrl.href)) {
      return false;
    }
    const disallowedProtocols = ['file'];
    const protocol = parsedUrl.protocol.replace(':', '');
    if (disallowedProtocols.includes(protocol)) {
      return false;
    }
    const allowedProtocols = ctx.protocols.map(p => (typeof p === 'string' ? p : p.scheme));

    if (!allowedProtocols.includes(protocol)) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}
