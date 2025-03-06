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
 * 
 * https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/
 */
function maxProfit(prices: number[]): number {
  if (prices.length <= 1) return 0;
  
  let minPrice = prices[0];
  let maxProfit = 0;
  
  for (let i = 1; i < prices.length; i++) {
    // Update maxProfit if selling at current price would yield a higher profit
    const currentProfit = prices[i] - minPrice;
    maxProfit = Math.max(maxProfit, currentProfit);
    
    // Update minPrice if current price is lower
    minPrice = Math.min(minPrice, prices[i]);
  }
  
  return maxProfit;
};

/**
 * Alternative implementation of the Best Time to Buy and Sell Stock problem
 * with O(n) time complexity
 */
function maxProfit2(prices: number[]): number {
  if (prices.length <= 1) return 0;
  
  let minPrice = prices[0];
  let maxProfit = 0;
  
  for (let i = 1; i < prices.length; i++) {
    // Update maxProfit if selling at current price would yield a higher profit
    const currentProfit = prices[i] - minPrice;
    maxProfit = Math.max(maxProfit, currentProfit);
    
    // Update minPrice if current price is lower
    minPrice = Math.min(minPrice, prices[i]);
  }
  
  return maxProfit;
}

/**
 * LRU Cache
 *
 * https://leetcode.com/problems/lru-cache/description/
 */

class LRUCache {
  private cache: Map<number, number>;
  private order: number[];
  private capacity: number;

  constructor(capacity: number) {
    this.cache = new Map<number, number>();
    this.order = [];
    this.capacity = capacity;
  }
  
  get(key: number): number {
    if (this.cache.has(key)) {
      this.order.splice(this.order.indexOf(key), 1);
      this.order.push(key);
      return this.cache.get(key)!;
    }
    return -1;
  }

  put(key: number, value: number): void {
    if (this.cache.has(key)) {
      this.order.splice(this.order.indexOf(key), 1);
    } else if (this.cache.size === this.capacity) {
      this.cache.delete(this.order.shift()!);
    }
    this.cache.set(key, value);
    this.order.push(key);
  }
}

/**
 * LRU Cache implementation using function
 * 
 * @param capacity 
 * @returns 
 */
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

/**
 * Given two strings, write a function to check if they are anagrams of each other.
 * For example, "listen" and "silent" are anagrams of each other.
 * 
 * https://leetcode.com/problems/valid-anagram/description/
 */
function areAnagrams(str1: string, str2: string): boolean {
  // Clean both strings
  const cleaned1 = cleanString(str1);
  const cleaned2 = cleanString(str2);
  
  // Early return if lengths are different
  if (cleaned1.length !== cleaned2.length) {
    return false;
  }
  
  // Count character frequencies using a map
  const charCount = new Map<string, number>();
  
  // Count characters in first string
  for (const char of cleaned1) {
    charCount.set(char, (charCount.get(char) || 0) + 1);
  }
  
  // Check characters in second string
  for (const char of cleaned2) {
    const count = charCount.get(char);
    
    // If character doesn't exist or count is 0, not an anagram
    if (!count) {
      return false;
    }
    
    // Decrement count
    charCount.set(char, count - 1);
  }
  
  return true;
}

function areAnagrams2(str1: string, str2: string): boolean {
  const sortedStr1 = str1.split("").sort().join("");
  const sortedStr2 = str2.split("").sort().join("");
  return sortedStr1 === sortedStr2;
}

function cleanString(str: string): string {
  return str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
}
