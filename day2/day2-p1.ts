import { readFileSync } from "fs";

let res: number = 0;

const data = readFileSync('input', 'utf8');

// each game is a line
let games = data.split('\n');

for (let game of games) {

  // isolate id
  let id = Number(game.split(":")[0].split("Game ")[1])

  // sets separated by ';'
  let sets = game.split('; ')
  sets[0] = sets[0].split(": ")[1] // before sets, 'Game [ID]: ' is present, discard
  let invalid = false; // set to true if game is invalid

  setsLoop: for (let set of sets){
    // newline at the end, set is empty, skip
    if (!set) {
      invalid = true;
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

      // invalidation criteria
      if ((clr == "red" && num > 12) ||
          (clr == "green" && num > 13) ||
          (clr == "blue" && num > 14)) {
        invalid = true;
        break setsLoop;
      }
    }
  }

  // only add id if not invalid
  if (!invalid) {
    res = res + id
  }

}

console.error(res)
