import { readFileSync } from "fs";

let res: number = 0;

const data = readFileSync('input', 'utf8');

// each game is a line
let games = data.split('\n');

for (let game of games) {
  let maxes: number[] = [0, 0, 0];
  // sets separated by ';'
  let sets = game.split('; ')
  sets[0] = sets[0].split(": ")[1] // before sets, 'Game [ID]: ' is present, discard

  for (let set of sets){
    // newline at the end, set is empty, skip
    if (!set) {
      break;
    }

    // some just have one colour, account for that
    let numClrs: string[];
    if (set.includes(', ')) {
      numClrs = set.split(', ')
    }
    else {
      numClrs = [set]
    }

    // loop through each colour grabbed
    for (let numClr of numClrs) {
      let numClr_split = numClr.split(' ');
      let num = Number(numClr_split[0]);
      let clr = numClr_split[1];
      let i: number;

      // each colour has its own index in maxes array
      if (clr == 'red') {
        i = 0
      }
      else if (clr == 'green') {
        i = 1
      }
      else {
        i = 2
      }

      // set to max number of colour grabbed
      maxes[i] = Math.max(maxes[i], num);
    }
  }
  // add power of max set for game
  res = res + (maxes[0] * maxes[1] * maxes[2]);

}

console.error(res)
