import { capitalize } from "./capitalize";

describe("capitalize", () => {
  it("Should capitalize single character", () => {
    const character = "c";
    const result = capitalize(character);

    expect(result).toBe("C");
  });

  it("Should capitalize word", () => {
    const word = "capitalized";
    const result = capitalize(word);

    expect(result).toBe("Capitalized");
  });

  it("Should capitalize text", () => {
    const text = "capitalized text";
    const result = capitalize(text);

    expect(result).toBe("Capitalized text");
  });

  it("Should return empty string if needed", () => {
    const result1 = capitalize("");
    expect(result1).toBe("");

    const result2 = capitalize();
    expect(result2).toBe("");
  });
});
