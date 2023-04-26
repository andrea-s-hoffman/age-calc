const form = document.querySelector("form.dob");
const inputs = document.querySelector(".inputs");
const yearsSpan = document.querySelector(".years>.num");
const monthsSpan = document.querySelector(".months>.num");
const daysSpan = document.querySelector(".days>.num");
const dayErrorMsg = document.querySelector("err-day");
const moErrorMsg = document.querySelector("err-mo");
const yrErrorMsg = document.querySelector("err-yr");

inputs.addEventListener("change", (e) => {
  // adjust digits
  if (e.target.id === "year") {
    if (e.target.value < 10) {
      e.target.value = `000${e.target.value}`;
    } else if (e.target.value < 100) {
      e.target.value = `00${e.target.value}`;
    } else if (e.target.value < 1000) {
      e.target.value = `0${e.target.value}`;
    }
  } else if (e.target.value.toString().length < 2) {
    e.target.value = `0${e.target.value}`;
  }
});

const ageCalculator = (d, m, y) => {
  const today = new Date();
  const birthday = new Date(y, m - 1, d);
  // return array of 3 strings
  const rightNow = today.getTime();
  const bdayMS = birthday.getTime();
  const msSpanned = rightNow - bdayMS;
  // a day is 86,400,000 ms
  const oneDay = 86400000;
  const days = Math.ceil(msSpanned / oneDay);
  const years = Math.floor(days / 365);
  let daysLeftover = days % 365;
  const months = Math.floor(daysLeftover / 30);
  daysLeftover = daysLeftover % 30;
  return [years, months, daysLeftover];
};

const dateIsValid = (date) => {
  return date instanceof Date && !isNaN(date);
};

const formValidation = (d, m, y) => {
  const today = new Date();
  const birthday = new Date(y, m - 1, d);
  console.log(birthday);
  // return boolean
  // also update screen with errors
  const errors = ["", "", ""];
  const errorNodes = document.querySelectorAll(".error");
  let valid = true;
  if (birthday > today) {
    errors[2] = "Must be in the past";
    valid = false;
  }
  if (m > 12) {
    errors[1] = "Must be a valid month";
    valid = false;
  }
  if (!dateIsValid(new Date(`${y}-${m}-${d}`))) {
    errors[0] = "Must be a valid date";
    valid = false;
  }
  for (let i = 0; i < 3; i++) {
    errorNodes[i].textContent = errors[i];
    if (errors[i]) {
      errorNodes[i].previousElementSibling.classList.add("err");
      errorNodes[i].previousElementSibling.previousElementSibling.classList.add(
        "err"
      );
    }
  }
  if (valid) {
    errorNodes.forEach((span) => {
      span.previousElementSibling.classList.remove("err");
      span.previousElementSibling.previousElementSibling.classList.remove(
        "err"
      );
    });
  }
  return valid;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // get input values
  const day = +document.querySelector("#day").value;
  const month = +document.querySelector("#month").value;
  const year = +document.querySelector("#year").value;
  if (formValidation(day, month, year)) {
    // update paragraphs with results if valid
    const results = ageCalculator(day, month, year);
    yearsSpan.textContent = results[0];
    monthsSpan.textContent = results[1];
    daysSpan.textContent = results[2];
  }
});
