const firstCard = document.querySelector(".card:first-child");
const cards = document.querySelectorAll(".card");
console.log(firstCard);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.isIntersecting
        ? console.log(`${entry.target.innerText} is visible`)
        : console.log(`${entry.target.innerText} is left`);

      entry.target.classList.toggle("active", entry.isIntersecting);
    });
  },
  {
    threshold: 1,
  },
);

cards.forEach((card) => {
  observer.observe(card);
});
