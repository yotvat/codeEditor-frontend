import { storageService } from './async-storage.service'
import { utilService } from './util.service'

const BLOCK_KEY = 'blockDB'

export const blockService = {
  query,
  getById,
  remove,
  save,
}

_createBlocks()

async function query() {
  try {
    const blocks = await storageService.query(BLOCK_KEY)
    return blocks
  } catch (err) {
    console.log('Query -> Had issues querying blocks', err)
    throw new Error(err)
  }
}

async function getById(blockId) {
  const block = await storageService.get(BLOCK_KEY, blockId)
  return block
}

function remove(blockId) {
  return storageService.remove(BLOCK_KEY, blockId)
}

function save(block) {
  if (block._id) {
    return storageService.put(BLOCK_KEY, block)
  } else {
    return storageService.post(BLOCK_KEY, block)
  }
}

function _createBlocks(){
  let blocks = utilService.loadFromStorage(BLOCK_KEY)
  if(!blocks||!blocks.length){
    blocks = [
      {
        title: "Simple Addition",
        code: `
    function add(a, b) {
      return a + b;
    }
    console.log(add(2, 3));
        `,
        _id: "60d0fe4"
      },
      {
        title: "Hello World",
        code: `
    function sayHello() {
      console.log('Hello, World!');
    }
    sayHello();
        `,
        _id: "60d0fe5"
      },
      {
        title: "Factorial",
        code: `
    function factorial(n) {
      if (n === 0) {
        return 1;
      }
      return n * factorial(n - 1);
    }
    console.log(factorial(5));
        `,
        _id: "60d0fe6"
      },
      {
        title: "Fibonacci",
        code: `
    function fibonacci(n) {
      if (n <= 1) {
        return n;
      }
      return fibonacci(n - 1) + fibonacci(n - 2);
    }
    console.log(fibonacci(6));
        `,
        _id: "60d0fe7"
      },
      {
        title: "Prime Check",
        code: `
    function isPrime(num) {
      if (num <= 1) return false;
      for (let i = 2; i < num; i++) {
        if (num % i === 0) return false;
      }
      return true;
    }
    console.log(isPrime(7));
        `,
        _id: "60d0fe8"
      },
      {
        title: "Array Sum",
        code: `
    function sumArray(arr) {
      return arr.reduce((sum, value) => sum + value, 0);
    }
    console.log(sumArray([1, 2, 3, 4, 5]));
        `,
        _id: "60d0fe9"
      },
      {
        title: "String Reverse",
        code: `
    function reverseString(str) {
      return str.split('').reverse().join('');
    }
    console.log(reverseString('hello'));
        `,
        _id: "60d0fea"
      },
      {
        title: "Palindrome Check",
        code: `
    function isPalindrome(str) {
      const reversed = str.split('').reverse().join('');
      return str === reversed;
    }
    console.log(isPalindrome('racecar'));
        `,
        _id: "60d0feb"
      },
      {
        title: "Find Maximum",
        code: `
    function findMax(arr) {
      return Math.max(...arr);
    }
    console.log(findMax([1, 2, 3, 4, 5]));
        `,
        _id: "60d0fec"
      },
      {
        title: "Square Numbers",
        code: `
    function squareNumbers(arr) {
      return arr.map(num => num * num);
    }
    console.log(squareNumbers([1, 2, 3, 4, 5]));
        `,
        _id: "60d0fed"
      }
    ]

  }
  utilService.saveToStorage(BLOCK_KEY, blocks)
}
