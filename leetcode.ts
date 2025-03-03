/**
 * Two Sum
 *
 * https://leetcode.com/problems/two-sum/description/
 */

function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    map.set(nums[i], i);
  }
  return [];
}

/**
 * Add Two Numbers
 *
 * https://leetcode.com/problems/add-two-numbers/description/
 */
class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}
function addTwoNumbers(
  l1: ListNode | null,
  l2: ListNode | null
): ListNode | null {
  const dummyHead = new ListNode(0);
  let current = dummyHead;
  let carry = 0;

  while (l1 !== null || l2 !== null) {
    const x = l1 !== null ? l1.val : 0;
    const y = l2 !== null ? l2.val : 0;
    const sum = x + y + carry;
    carry = Math.floor(sum / 10);
    current.next = new ListNode(sum % 10);
    current = current.next;
  }
  if (carry > 0) {
    current.next = new ListNode(carry);
  }
  return dummyHead.next;
}

/**
 * Longest Substring Without Repeating Characters
 *
 * https://leetcode.com/problems/longest-substring-without-repeating-characters/description/
 */

function lengthOfLongestSubstring(s: string): number {
  const charMap = new Map<string, number>();
  let maxLength = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    const currentChar = s[right];

    if (charMap.has(currentChar) && charMap.get(currentChar)! >= left) {
      left = charMap.get(currentChar)! + 1;
    }

    charMap.set(currentChar, right);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}

console.log(lengthOfLongestSubstring("abcabcbb"));

/**
 * Median of Two Sorted Arrays
 *
 * https://leetcode.com/problems/median-of-two-sorted-arrays/description/
 */

function findMedianSortedArrays(nums1: number[], nums2: number[]): number {
  const arr = [...nums1, ...nums2].sort((n1, n2) => n1 - n2);
  const n = arr.length;
  if (n % 2 !== 0) return arr[Math.floor(n / 2)];

  return (arr[Math.floor(n / 2) - 1] + arr[Math.floor(n / 2)]) / 2.0;
}

/**
 * Give an array of revenue, get the max increase within this array. For example, an array [10,2,24,54,44]. The largest increase over any period of time would be 52.
 */
function maxIncrease(revenue: number[]): number {
  let maxIncrease = 0;
  for (let x = 0; (x += 1); x += 1) {
    for (let y = x + 1; (y += 1); y += 1) {
      const increase = revenue[y] - revenue[x];
      if (increase > maxIncrease) {
        maxIncrease = increase;
      }
    }
  }
  return maxIncrease;
}

function lruCache(capacity: number) {
  const cache = new Map<number, number>();
  const order: number[] = [];

  return {
    get(key: number): number {
      if (cache.has(key)) {
        order.splice(order.indexOf(key), 1);
        order.push(key);
        return cache.get(key)!;
      }

      return -1;
    },
    put(key: number, value: number): void {
      if (cache.has(key)) {
        order.splice(order.indexOf(key), 1);
      } else if (cache.size === capacity) {
        cache.delete(order.shift()!);
      }
      cache.set(key, value);
      order.push(key);
    },
  };
}
