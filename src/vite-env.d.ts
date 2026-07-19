/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** GoHighLevel calendar embed URL shown after the form is submitted. */
  readonly VITE_GHL_CALENDAR_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
