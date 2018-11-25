
export function merge(left: number[], right: number[]): number[] {
	let result: number[] = [];
	while (left.length > 0 && right.length > 0) {
		if (left[0] < right[0]) {
			result.push(<number>left.shift());
		} else {
			result.push(<number>right.shift());
		}
	}

	return result.concat(left).concat(right);
};

export function mergeSort(arr: number[]): number[] {

	if (arr.length <= 1) {
		return arr;
	}

	let middle: number = Math.floor(arr.length / 2);
	let left: number[] = arr.slice(0, middle);
	let right: number[] = arr.slice(middle);

	return merge(mergeSort(left), mergeSort(right));
};

export function quickSort (arr: number[]): number[] {
	if (arr.length <= 1) {
		return arr;
	}
	let pivot: number = arr.splice(Math.floor(arr.length / 2), 1)[0];
	let left: number[] = [];
	let right: number[] = [];
	for (let i: number = 0; i < arr.length; i++) {
		if (arr[i] < pivot) {
			left.push(arr[i]);
		} else {
			right.push(arr[i]);
		}
	}

	return quickSort(left).concat([pivot], quickSort(right));
};

export function bubbleSort(arr: number[]): number[] {
	if (arr.length <= 1) {
		return arr;
	}
	for (let i: number = arr.length - 1; i > 0; i--) {
		for (let j: number = i - 1; j >= 0; j--) {
			if (arr[j] < arr[j - 1]) {
				var tmp = arr[j];
				arr[j] = arr[j - 1];
				arr[j - 1] = tmp;
			}
		}
	}

	return arr;
};

export function selectSort(arr: number[]): number[] {
	let min: number, tmp: number;
	for (let i: number = 0; i < arr.length; i++) {
		min = i;
		for (let j: number = i + 1; j < arr.length; j++) {
			if (arr[min] > arr[j]) {
				min = j;
			}
		}
		if (min != i) {
			tmp = arr[i];
			arr[i] = arr[min];
			arr[min] = tmp;
		}
	}

	return arr;
};

export function insertSort(arr: number[]): number[] {
	for (let i: number = 1; i < arr.length; i++) {
		let tmp: number = arr[i],
			j = i;
		while (arr[j - 1] > tmp) {
			arr[j] = arr[j - 1];
			--j;
		}
		arr[j] = tmp;
	}

	return arr;
};
