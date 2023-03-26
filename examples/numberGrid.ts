import { gridIterator } from '..';

const data = [
    [{ n: 1 }, { n: 2 }, { n: 3 }],
    [{ n: 4 }, { n: 5 }, { n: 6 }],
    [{ n: 7 }, { n: 8 }, { n: 9 }],
];

for (const cell of gridIterator(data)) {
    console.log(`N: ${cell.data.n}`);
}