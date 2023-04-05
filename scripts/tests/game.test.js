/**
 * @jest-environment jsdom
 */

const {
  game,
  newGame,
  showScore,
  addTurn,
  lightsOn,
  showTurns,
} = require("../game");

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

  test("choices contain correct ids", () => {
    expect(game.choices).toEqual(["button1", "button2", "button3", "button4"]);
  });

  test("turnNumber keys exists", () => {
    expect("turnNumber" in game).toBe(true);
  });
});

describe("new game works correctly", () => {
  beforeAll(() => {
    game.score = 42;
    game.currentGame = ["button1", "button2"];
    game.playerMoves = ["button1", "button2"];

    document.getElementById("score").innerText = 42;
    newGame();
  });

  test("should set score to zero", () => {
    expect(game.score).toEqual(0);
  });

  test("should be one element in computers array", () => {
    expect(game.currentGame.length).toEqual(1);
  });

  test("player moves array should be empty", () => {
    expect(game.playerMoves.length).toEqual(0);
  });

  test("should display zero with the element of id of score", () => {
    expect(document.getElementById("score").innerText).toEqual(0);
  });
});

describe("game play works correctly", () => {
  beforeEach(() => {
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];

    addTurn();
  });

  afterEach(() => {
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
  });

  test("addTurn adds a new turn to the game", () => {
    addTurn();
    expect(game.currentGame.length).toBe(2);
  });

  test("should add correct class to light up buttons", () => {
    let button = document.getElementById(game.currentGame[0]);

    lightsOn(game.currentGame[0]);

    expect(button.classList).toContain("light");
  });

  test("showTurns should update game.turnNumber", () => {
    game.turnNumber = 42;
    showTurns();
    expect(game.turnNumber).toBe(0);
  });
});
