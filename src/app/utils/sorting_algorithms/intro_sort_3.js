import { logBase2, partition } from "../common";
import insertionSort from "./insertion_sort";
import heapSort from "./heap_sort";

const SIZE_THRESHOLD = 16;

// "Top Down Insertion Last" IntroSort
function* introSort3(array, startIdx = 0, endIdx = array.length - 1) {
  const maxDepth = logBase2(endIdx - startIdx + 1) * 2;
  yield* introSortLoop3(array, startIdx, endIdx, maxDepth);
  yield* insertionSort(array, startIdx, endIdx);
}

function* introSortLoop3(array, startIdx, endIdx, maxDepth) {
  const curSize = endIdx - startIdx + 1;
  if (curSize < SIZE_THRESHOLD) return;
  if (maxDepth === 0) yield* heapSort(array, startIdx, endIdx);
  else {
    const pivotIdx = yield* partition(array, startIdx, endIdx);
    yield* introSortLoop3(array, pivotIdx, endIdx, maxDepth - 1);
    yield* introSortLoop3(array, startIdx, pivotIdx, maxDepth - 1);
  }
}

export default introSort3;
