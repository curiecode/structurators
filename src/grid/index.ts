import { get, set } from 'lodash';

interface Iterator<T> {
	data: T;
	next?: T;
	neighbors: Generator<Iterator<T> | undefined>;
	x: number;
	y: number;
	nw?: Generator<Iterator<T> | undefined>;
	north?: Generator<Iterator<T> | undefined>;
	ne?: Generator<Iterator<T> | undefined>;
	west?: Generator<Iterator<T> | undefined>;
	east?: Generator<Iterator<T> | undefined>;
	sw?: Generator<Iterator<T> | undefined>;
	south?: Generator<Iterator<T> | undefined>;
	se?: Generator<Iterator<T> | undefined>;
	setProperty: (property: string, data: any) => void;
}

function gridIteratorFrom<T>(grid: T[][], i: number, j: number) {
	return gridIterator<T>(grid, {
		startAt: { x: j, y: i },
	});
}

function wrapDataForIteration<T>(grid: T[][], i: number, j: number) {
	return {
		data: grid?.[i]?.[j]!,
		next: grid?.[i]?.[j],
		neighbors: gridIterator<T>(grid, {
			startAt: { x: j - 1, y: i - 1 },
			extendTo: { x: j + 1, y: i + 1 },
			skip: { x: j, y: i },
		}),
		x: j,
		y: i,
		nw: gridIteratorFrom(grid, i - 1, j - 1),
		north: gridIteratorFrom(grid, i - 1, j),
		ne: gridIteratorFrom(grid, i - 1, j + 1),
		west: gridIteratorFrom(grid, i, j - 1),
		east: gridIteratorFrom(grid, i, j + 1),
		sw: gridIteratorFrom(grid, i + 1, j - 1),
		south: gridIteratorFrom(grid, i + 1, j),
		se: gridIteratorFrom(grid, i + 1, j + 1),
		setProperty: (prop: string, data: T) => {
			set(grid, `[${i}][${j}]${prop}`, {
				...get(grid[i][j], prop),
				...data,
			});
		},
	};
}

export function* gridIterator<T>(
	grid: T[][],
	options?: {
		startAt?: { x: number; y: number };
		extendTo?: { x: number; y: number };
		skip?: { x: number; y: number };
	}
): Generator<Iterator<T>> {
	const { startAt, extendTo, skip } = options ?? {};
	const { x, y } = startAt ?? { x: 0, y: 0 };
	for (let i = y; i < grid.length; i++) {
		if (extendTo != null && i > extendTo.y) {
			break;
		}
		for (let j = x; j < (grid?.[i]?.length ?? 0); j++) {
			if (extendTo != null && j > extendTo.x) {
				break;
			}
			if (skip != null && skip.x === j && skip.y === i) {
				continue;
			}
			yield wrapDataForIteration(grid, i, j);
		}
	}
}
