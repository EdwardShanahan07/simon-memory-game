/**
 * @jest-environment jsdom
 */

const { game } = require("../game");

beforeAll(() => {
  const fs = require("fs");
  const fileContents = fs.readFileSync("index.html", "utf-8");

  document.open();
  document.write(fileContents);
  document.close();
});

describe("game object contains correct keys", () => {
  test("score key exsists", () => {
    expect("score" in game).toBe(true);
  });

  test("current game key exists", () => {
    expect("currentGame" in game).toBe(true);
  });

  test("player moves key exists", () => {
    expect("playerMoves" in game).toBe(true);
  });

  test("choices key exists", () => {
    expect("choices" in game).toBe(true);
  });
});
