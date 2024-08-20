import { getOppositeColour } from "./oppositeColour";

describe("oppositeColour", () => {
  it("Should return white if gets black", () => {
    const result = getOppositeColour("black");
    expect(result).toBe("white");
  });
  it("Should return black if gets white", () => {
    const result = getOppositeColour("white");
    expect(result).toBe("black");
  });
});
