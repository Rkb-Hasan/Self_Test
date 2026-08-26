const button = document.querySelector("button");
const input = document.querySelector("input[name=debounce]");
function debounce(fn, delay) {
  let timeoutId;

  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}

button.addEventListener(
  "click",
  debounce(() => console.log("click"), 2000),
);

input.addEventListener(
  "input",
  debounce(function (event) {
    console.log(event.target.value);
  }, 1000),
);
