/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** GoHighLevel calendar embed URL shown after the form is submitted. */
  readonly VITE_GHL_CALENDAR_URL?: string;
  /** Generic lead webhook (Make/Zapier/GHL) the contact form POSTs to. */
  readonly VITE_MONTARRO_LEAD_WEBHOOK_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
