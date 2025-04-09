let sub = document.querySelector("#submit");
let msg = document.querySelector(".msg");
let res = document.querySelector("#reset");

sub.addEventListener("click", () => {
  event.preventDefault();
  let weight = document.querySelector("#weight").value;
  let height = document.querySelector("#height").value;
  let bmi = weight / (height * height);
  showBmi(bmi);
});

const showBmi = (bmi) => {
  msg.innerText = `Your BMI is ${bmi}`;
  msg.classList.remove("hide");
  disableInput();
};

res.addEventListener("click", () => {
  msg.classList.add("hide");
  enalbeInput();
});

const disableInput = () => {
  let age = document.querySelector("#age");
  let weight = document.querySelector("#weight");
  let height = document.querySelector("#height");
  age.disabled = true;
  weight.disabled = true;
  height.disabled = true;
};
const enalbeInput = () => {
  let age = document.querySelector("#age");
  let weight = document.querySelector("#weight");
  let height = document.querySelector("#height");
  age.disabled = false;
  weight.disabled = false;
  height.disabled = false;
};
