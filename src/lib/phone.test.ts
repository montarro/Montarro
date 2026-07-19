import { describe, expect, it } from "vitest";
import { normalizeAuPhone } from "./phone";

const MOBILE = "+61412345678";
const LANDLINE = "+61391234567";

describe("normalizeAuPhone", () => {
  it.each([
    "0412 345 678",
    "0412345678",
    "04 1234 5678",
    "+61 412 345 678",
    "+61412345678",
    "61412345678",
    "412345678",
    "0412-345-678",
    "0412.345.678",
  ])("normalises mobile %j to +61412345678", (input) => {
    expect(normalizeAuPhone(input)).toBe(MOBILE);
  });

  it.each(["(03) 9123 4567", "03 9123 4567", "0391234567", "+61 3 9123 4567"])(
    "normalises landline %j to +61391234567",
    (input) => {
      expect(normalizeAuPhone(input)).toBe(LANDLINE);
    },
  );

  it.each([
    "",
    "   ",
    "12345",
    "0412 345 67", // one digit short
    "0412 345 6789", // one digit long
    "hello",
    "+1 415 555 2671", // valid US number — not AU
    "+64 21 123 456", // valid NZ number — not AU
  ])("rejects %j", (input) => {
    expect(normalizeAuPhone(input)).toBeNull();
  });

  it("rejects garbage that merely starts like an AU number", () => {
    expect(normalizeAuPhone("+61123")).toBeNull();
    expect(normalizeAuPhone("61")).toBeNull();
    expect(normalizeAuPhone("04")).toBeNull();
  });
});
