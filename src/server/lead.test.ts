import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { handleLeadRequest } from "./lead";

// ---------------------------------------------------------------------------
// Handler-level tests against the real request/validation/GHL-body pipeline,
// with only the outbound GoHighLevel fetch stubbed. Each request uses a fresh
// source IP so the per-IP rate limiter never bleeds between unrelated tests.
// ---------------------------------------------------------------------------

type CapturedCall = { url: string; init: RequestInit; body: any } | null;
let ghlCall: CapturedCall = null;
let ghlStatus = 200;
let ipCounter = 0;

function quickLead(overrides: Record<string, unknown> = {}) {
  return {
    formType: "quick",
    fullName: "Jane Smith",
    businessName: "Acme Roofing",
    email: "jane@example.com",
    phone: "0412 345 678",
    industry: "Roofing",
    notes: "Currently on spreadsheets.",
    hpRefCode: "",
    ...overrides,
  };
}

function strategyLead(overrides: Record<string, unknown> = {}) {
  return {
    fullName: "Jane Smith",
    businessName: "Acme Roofing",
    email: "jane@example.com",
    phone: "0412 345 678",
    revenue: "Under $30,000",
    enquiries: "Under 20",
    blockers: ["Too many missed calls"],
    goals: "More qualified enquiries",
    notes: "",
    selectedPackage: "ai-receptionist",
    hpRefCode: "",
    ...overrides,
  };
}

async function post(body: unknown): Promise<{ status: number; json: any }> {
  ipCounter += 1;
  const res = await handleLeadRequest(
    new Request("https://montarro.com/api/lead", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-forwarded-for": `203.0.113.${(ipCounter % 200) + 1}`,
      },
      body: JSON.stringify(body),
    }),
  );
  return { status: res.status, json: await res.json() };
}

beforeEach(() => {
  process.env.GHL_PIT = "test-pit-token";
  ghlCall = null;
  ghlStatus = 200;
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string, init: RequestInit) => {
      ghlCall = { url: String(url), init, body: JSON.parse(String(init.body)) };
      return new Response("{}", { status: ghlStatus, headers: { "content-type": "application/json" } });
    }),
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("phone normalisation through the lead route (Fix 1)", () => {
  it.each([
    ["0412 345 678", "+61412345678"],
    ["0412345678", "+61412345678"],
    ["04 1234 5678", "+61412345678"],
    ["+61 412 345 678", "+61412345678"],
    ["+61412345678", "+61412345678"],
    ["61412345678", "+61412345678"],
    ["412345678", "+61412345678"],
    ["(03) 9123 4567", "+61391234567"],
    ["03 9123 4567", "+61391234567"],
  ])("sends %j to GHL as %s", async (input, expected) => {
    const { status } = await post(quickLead({ phone: input }));
    expect(status).toBe(200);
    expect(ghlCall!.body.phone).toBe(expected);
  });

  it("returns a per-field validation error (not a server error) for an unresolvable number", async () => {
    const { status, json } = await post(quickLead({ phone: "12345" }));
    expect(status).toBe(400);
    expect(json).toMatchObject({ ok: false, error: "validation" });
    expect(json.fields.phone).toBe("Enter a valid Australian phone number.");
    expect(ghlCall).toBeNull(); // nothing sent upstream
  });
});

describe("required fields on the quick form (Fix 3)", () => {
  it("rejects a missing full name", async () => {
    const { status, json } = await post(quickLead({ fullName: "" }));
    expect(status).toBe(400);
    expect(json.fields.fullName).toBe("Enter your full name.");
  });

  it("rejects a 1-character name but allows a single-word name", async () => {
    const short = await post(quickLead({ fullName: "J" }));
    expect(short.status).toBe(400);
    expect(short.json.fields.fullName).toBe("Name must be at least 2 characters.");

    const single = await post(quickLead({ fullName: "Cher" }));
    expect(single.status).toBe(200);
    expect(ghlCall!.body.firstName).toBe("Cher");
    expect(ghlCall!.body.lastName).toBe("");
  });

  it("rejects a missing email", async () => {
    const { status, json } = await post(quickLead({ email: "" }));
    expect(status).toBe(400);
    expect(json.fields.email).toBe("Enter your email.");
  });

  it("rejects a malformed email", async () => {
    const { status, json } = await post(quickLead({ email: "not-an-email" }));
    expect(status).toBe(400);
    expect(json.fields.email).toBe("Enter a valid email address.");
  });

  it("rejects a missing phone", async () => {
    const { status, json } = await post(quickLead({ phone: "" }));
    expect(status).toBe(400);
    expect(json.fields.phone).toBe("Enter your phone number.");
  });

  it("accepts the quick form without business name, industry or notes", async () => {
    const { status } = await post(quickLead({ businessName: "", industry: "", notes: "" }));
    expect(status).toBe(200);
    expect(ghlCall!.body).not.toHaveProperty("companyName");
  });
});

describe("quick-form GHL mapping", () => {
  it("upserts contact fields and folds industry into the notes custom field", async () => {
    const { status } = await post(quickLead());
    expect(status).toBe(200);
    expect(ghlCall!.url).toBe("https://services.leadconnectorhq.com/contacts/upsert");
    expect((ghlCall!.init.headers as Record<string, string>).Authorization).toBe("Bearer test-pit-token");
    expect(ghlCall!.body.firstName).toBe("Jane");
    expect(ghlCall!.body.lastName).toBe("Smith");
    expect(ghlCall!.body.companyName).toBe("Acme Roofing");
    const byId = Object.fromEntries(ghlCall!.body.customFields.map((f: any) => [f.id, f.field_value]));
    expect(byId.NWM64LTzEagaGujaRUbU).toBe("Industry: Roofing\n\nCurrently on spreadsheets.");
    expect(byId.WTz8uuCzzwg4zFDBPJ1p).toBe("general-enquiry"); // no selectedPackage sent → defaults
    // quick form never sends the qualification enums
    expect(byId).not.toHaveProperty("IBCKtDKdboF7uIdgRR54");
  });
});

describe("strategy form unchanged (regression)", () => {
  it("still requires business name and the four qualification enums", async () => {
    const { status, json } = await post(strategyLead({ businessName: "", revenue: "bogus" }));
    expect(status).toBe(400);
    expect(json.fields.businessName).toBe("Enter your business name.");
    expect(json.fields.revenue).toBe("Please choose an option.");
    expect(ghlCall).toBeNull();
  });

  it("still maps all six custom fields on a valid submission", async () => {
    const { status } = await post(strategyLead());
    expect(status).toBe(200);
    const byId = Object.fromEntries(ghlCall!.body.customFields.map((f: any) => [f.id, f.field_value]));
    expect(byId.IBCKtDKdboF7uIdgRR54).toBe("Under $30,000");
    expect(byId.i6Ilam65d2PFa90E2A6j).toEqual(["Too many missed calls"]);
    expect(byId.WTz8uuCzzwg4zFDBPJ1p).toBe("ai-receptionist");
    expect(ghlCall!.body.phone).toBe("+61412345678");
  });
});

describe("failure behaviour (Fix 2)", () => {
  it("a GHL upstream error is a genuine failure — never ok:true, never a validation shape", async () => {
    ghlStatus = 401;
    const { status, json } = await post(quickLead());
    expect(status).toBe(502);
    expect(json.ok).toBe(false);
    expect(json.error).not.toBe("validation");
  });

  it("a filled honeypot is dropped silently without any GHL write", async () => {
    const { status, json } = await post(quickLead({ hpRefCode: "bot-was-here" }));
    expect(status).toBe(200);
    expect(json.ok).toBe(true);
    expect(ghlCall).toBeNull();
  });

  it("a missing GHL_PIT fails loudly instead of faking success", async () => {
    delete process.env.GHL_PIT;
    const { status, json } = await post(quickLead());
    expect(status).toBe(502);
    expect(json.ok).toBe(false);
  });
});
