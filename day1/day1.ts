import { readFileSync } from "fs";

let res: number = 0;
try {
    const data = readFileSync('input', 'utf8');
    // loop through chars
    let firstD: string = '';
    let lastD: string = '';
    let begSlice: number = 0;

    let numMap: Map<string, string> = new Map();
    numMap.set('one', '1')
    numMap.set('two', '2')
    numMap.set('three', '3')
    numMap.set('four', '4')
    numMap.set('five', '5')
    numMap.set('six', '6')
    numMap.set('seven', '7')
    numMap.set('eight', '8')
    numMap.set('nine', '9')
    
    for (let i = 0; i < data.length; i++) {
        let c = data.charAt(i)

        if (/^\d$/.test(c)) {
            if (!firstD) {
                firstD = c
            }
            else {
                lastD = c
            }
            begSlice = i + 1
        }
        else if (c == '\n') {
            if (!lastD) {
                lastD = firstD
            }
            res = res + Number(firstD + lastD)
            console.error(firstD + lastD);
            firstD = ""
            lastD = ""
            begSlice = i+1
        }
        else {
            let slice = data.slice(begSlice, i + 1)
            for (let key of numMap.keys()) {
                if (slice.includes(key.toString())) {
                    slice = key.toString()
                }
            }
            if (numMap.has(slice)) {
                if (!firstD) {
                    firstD = numMap.get(slice) as string
                }
                else {
                    lastD = numMap.get(slice) as string
                }
                begSlice = i
            }
        }
    }
    console.error(firstD + lastD);
    console.error(res);
} catch (err) {
    console.error(err);
}

