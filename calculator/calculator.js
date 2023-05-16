const express = require("express");

const app = express();

app.use(express.json());

app.get("/mean", function (req, res) {
  try {
    let nums = req.query.nums;
    if (nums == null) {
      throw console.error();
    }
    nums = nums.split(",");
    let filteredNums = nums.filter((num) => {
      newNum = Number(num);
      if (isNaN(newNum)) {
        throw new TypeError(num);
      } else {
        return newNum;
      }
    });
    console.log(filteredNums);
    let sum = filteredNums.reduce((acc, cur) => Number(acc) + Number(cur));

    return res.json({
      response: {
        operation: "mean",
        value: sum / nums.length,
      },
    });
  } catch (error) {
    if (error instanceof TypeError) {
      console.log(error);
      return res.status(400).json(`${error.message} is not a number`);
    } else {
      return res.status(400).json("nums are required");
    }
  }
});

app.get("/median", function (req, res) {
  try {
    let nums = req.query.nums;
    if (nums == null) {
      throw console.error();
    }
    nums = nums.split(",");
    let filteredNums = nums.map((num) => {
      newNum = Number(num);
      if (isNaN(newNum)) {
        throw new TypeError(num);
      } else {
        console.log(typeof newNum);
        return newNum;
      }
    });

    console.log(filteredNums.sort());
    const middleIndex = Math.floor(filteredNums.length / 2);

    return res.json({
      response: {
        operation: "median",
        value: filteredNums[middleIndex],
      },
    });
  } catch (error) {
    if (error instanceof TypeError) {
      console.log(error);
      return res.status(400).json(`${error.message} is not a number`);
    } else {
      return res.status(400).json("nums are required");
    }
  }
});

app.get("/mode", function (req, res) {
  try {
    let nums = req.query.nums;
    if (nums == null) {
      throw console.error();
    }
    nums = nums.split(",");
    let filteredNums = nums.map((num) => {
      newNum = Number(num);
      if (isNaN(newNum)) {
        throw new TypeError(num);
      } else {
        return newNum;
      }
    });
    console.log(filteredNums);

    let frequency = {};

    filteredNums.forEach((num) => {
      frequency[num] = frequency[num] ? frequency[num] + 1 : 1;
    });

    let highestFrequency = 0;
    for (const num in frequency) {
      if (frequency[num] > highestFrequency) {
        highestFrequency = frequency[num];
      }
    }
    console.log(frequency);

    return res.json({
      response: {
        operation: "mean",
        value: highestFrequency,
      },
    });
  } catch (error) {
    if (error instanceof TypeError) {
      console.log(error);
      return res.status(400).json(`${error.message} is not a number`);
    } else {
      return res.status(400).json("nums are required");
    }
  }
});

app.listen(3000, function () {
  console.log("App on port 3000");
});
