import { withParamValidation } from "next-typesafe-url/app";
import { $path, AppRouter, InferPagePropsType } from "next-typesafe-url";
import { Route, type RouteType } from "./routeType";
import Link from "next/link";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

type PageProps = InferPagePropsType<RouteType>;

type Grid = NonNullable<
  NonNullable<AppRouter["/"]["searchParams"]>["tictactoe"]
>;

const blankBoard: Grid = [
  ["_", "_", "_"],
  ["_", "_", "_"],
  ["_", "_", "_"],
];

async function Page({ searchParams: { tictactoe } }: PageProps) {
  const board = tictactoe ?? blankBoard;

  const win = checkWin(board);
  const full = boardFull(board);
  const simulate = !win && !isUserTurn(board) && !boardFull(board);

  return (
    <>
      <Suspense fallback={<InnerSkeleton tictactoe={board} />}>
        {/* @ts-ignore */}
        <Inner tictactoe={board} simulate={simulate} />
      </Suspense>
    </>
  );
}
export default withParamValidation(Page, Route);

function InnerSkeleton({ tictactoe }: { tictactoe: Grid }) {
  return (
    <>
      <div className={`flex flex-col items-center min-h-screen`}>
        <h1 className="text-5xl mt-10">{`YOU ARE "O", COMPUTER IS "X"`}</h1>

        <h2 className="text-3xl font-bold mt-5">{"computer is thinking..."}</h2>
        <TicTacToeBord tictactoe={tictactoe} />
        <div>
          <a
            href={$path({
              route: "/",
              searchParams: {
                tictactoe: blankBoard,
              },
            })}
            className="text-5xl"
          >
            RESET
          </a>
        </div>
      </div>
    </>
  );
}

async function Inner({
  tictactoe,
  simulate,
}: {
  tictactoe: Grid;
  simulate: boolean;
}) {
  const turn = isUserTurn(tictactoe);

  const newBoard = simulate ? simulateMove(tictactoe) : tictactoe;
  const win = checkWin(newBoard);
  const full = boardFull(newBoard);

  if (simulate) {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
  return (
    <>
      <div
        className={`flex flex-col items-center min-h-screen ${
          win
            ? !simulate
              ? "bg-green-600"
              : "bg-red-500"
            : full
            ? "bg-yellow-500"
            : ""
        }`}
      >
        <h1 className="text-5xl mt-10">{`YOU ARE "O", COMPUTER IS "X"`}</h1>
        <h2 className="text-3xl font-bold mt-5">
          {win
            ? !simulate
              ? "YOU WON!"
              : "YOU LOST!"
            : full
            ? "TIE!"
            : "your turn"}
        </h2>
        <TicTacToeBord tictactoe={newBoard} />
        <div>
          <a
            href={$path({
              route: "/",
              searchParams: {
                tictactoe: [
                  ["_", "_", "_"],
                  ["_", "_", "_"],
                  ["_", "_", "_"],
                ],
              },
            })}
            className="text-5xl"
          >
            RESET
          </a>
        </div>
      </div>
    </>
  );
}

function TicTacToeBord({ tictactoe }: { tictactoe: Grid }) {
  return (
    <div className="flex flex-col items-center justify-center w-[600px] -mt-16">
      {tictactoe.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((cell, colIndex) => (
            <div
              key={colIndex}
              className="flex items-center justify-center font-mono"
            >
              <a
                className="m-[100px] text-5xl"
                href={$path({
                  route: "/",
                  searchParams: {
                    tictactoe: flipCell(tictactoe, rowIndex, colIndex),
                  },
                })}
              >
                {tictactoe[rowIndex][colIndex]}
              </a>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function simulateMove(board: Grid): Grid {
  const delay = Math.floor(Math.random() * 2000) + 1500;
  const newBoard: Grid = JSON.parse(JSON.stringify(board));
  const emptyCells: { row: number; col: number }[] = [];
  for (let row = 0; row < newBoard.length; row++) {
    for (let col = 0; col < newBoard[row].length; col++) {
      if (newBoard[row][col] === "_") {
        emptyCells.push({ row, col });
      }
    }
  }
  if (emptyCells.length > 0) {
    const { row, col } =
      emptyCells[Math.floor(Math.random() * emptyCells.length)];
    newBoard[row][col] = "X";
  }
  return newBoard;
}

function flipCell(array: Grid, row: number, column: number): Grid {
  const newArray = JSON.parse(JSON.stringify(array)) as Grid;
  newArray[row][column] = "O";
  return newArray;
}

function isUserTurn(array: Grid): boolean {
  let count = 0;
  array.forEach((row) => {
    row.forEach((cell) => {
      if (cell !== "_") count++;
    });
  });
  return count % 2 === 0;
}

function boardFull(array: Grid): boolean {
  let count = 0;
  array.forEach((row) => {
    row.forEach((cell) => {
      if (cell !== "_") count++;
    });
  });
  return count === 9;
}

function checkWin(board: Grid): boolean {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] !== "_" &&
      board[i][0] === board[i][1] &&
      board[i][0] === board[i][2]
    ) {
      return true;
    }
  }

  // Check columns
  for (let i = 0; i < 3; i++) {
    if (
      board[0][i] !== "_" &&
      board[0][i] === board[1][i] &&
      board[0][i] === board[2][i]
    ) {
      return true;
    }
  }

  // Check diagonals
  if (
    board[0][0] !== "_" &&
    board[0][0] === board[1][1] &&
    board[0][0] === board[2][2]
  ) {
    return true;
  }
  if (
    board[2][0] !== "_" &&
    board[2][0] === board[1][1] &&
    board[2][0] === board[0][2]
  ) {
    return true;
  }

  return false;
}
