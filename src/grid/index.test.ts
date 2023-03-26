import { gridIterator } from '.';

describe('when iterating', () => {
	test('we can set some data', () => {
		const data = [[{ n: 1 }, { n: 2 }, { n: 3 }]];

		for (const cell of gridIterator(data)) {
			cell.data.n++;
		}

		expect(data[0][0]).toEqual({ n: 2 });
		expect(data[0][1]).toEqual({ n: 3 });
		expect(data[0][2]).toEqual({ n: 4 });
	});
});
