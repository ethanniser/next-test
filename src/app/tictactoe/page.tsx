import { withParamValidation } from "next-typesafe-url/app";
import { $path, AppRouter, InferPagePropsType } from "next-typesafe-url";
import { Route, type RouteType } from "./routeType";
import Link from "next/link";
import { Suspense } from "react";

type PageProps = InferPagePropsType<RouteType>;

type Grid = AppRouter["/tictactoe"]["searchParams"]["tictactoe"];

async function Page({ searchParams: { tictactoe } }: PageProps) {
  const turn = userTurn(tictactoe);

  const newBoard = turn ? await simulateMove(tictactoe) : tictactoe;

  return (
    <>
      <div className="flex flex-col items-center">
        <h1 className=" text-5xl mt-10">{`YOU ARE "O", COMPUTER IS "X"`}</h1>
        <h2>{turn ? "your turn" : "computer turn"}</h2>
        <Suspense fallback={<TicTacToeBord tictactoe={tictactoe} />}>
          <TicTacToeBord tictactoe={newBoard} />
        </Suspense>
        <div>
          <Link
            href={$path({
              route: "/tictactoe",
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
          </Link>
        </div>
      </div>
    </>
  );
}
export default withParamValidation(Page, Route);

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
                  route: "/tictactoe",
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

function simulateMove(board: Grid): Promise<Grid> {
  return new Promise((resolve) => {
    const delay = Math.floor(Math.random() * 2000) + 1000;
    setTimeout(() => {
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
      resolve(newBoard);
    }, delay);
  });
}

function flipCell(array: Grid, row: number, column: number): Grid {
  const newArray = JSON.parse(JSON.stringify(array)) as Grid;
  newArray[row][column] = "O";
  return newArray;
}

function userTurn(array: Grid): boolean {
  let count = 0;
  array.forEach((row) => {
    row.forEach((cell) => {
      if (cell !== "_") count++;
    });
  });
  return count % 2 === 0;
}
