import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { forwardLeadToGhl } from "../ghl.server";

// Server-side handler invoked from the client:
//   await submitLead({ data: { ...form } })
// The .handler body runs server-only, so ghl.server.ts (and any GoHighLevel
// endpoint URL / location id read from process.env) is tree-shaken out of the
// client bundle — nothing sensitive ships to the browser.

const leadSchema = z.object({
  fullName: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: z.string().trim().min(1),
  company: z.string().trim().min(1),
  industry: z.string().trim().default(""),
  stage: z.string().trim().default(""),
  goal: z.string().trim().default(""),
  budget: z.string().trim().default(""),
  notes: z.string().trim().default(""),
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator(leadSchema)
  .handler(async ({ data }) => {
    // Returns the diagnostic GhlForwardResult (ok + exact endpoint/status/body
    // on failure) so the caller can surface the real GHL response.
    return await forwardLeadToGhl(data);
  });
