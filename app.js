let sub = document.querySelector("#submit");
let msg = document.querySelector(".msg");
let msgStatus = document.querySelector(".msg-status");
let res = document.querySelector("#reset");

sub.addEventListener("click", () => {
  event.preventDefault();
  let bmia;
  let Status;
  let weight = document.querySelector("#weight").value;
  let height = document.querySelector("#height").value;
  let metriceWeight = document.querySelector("#metrices-weight").value;
  let metriceHeight = document.querySelector("#metrices-height").value;
//   metrices functionality
  if(metriceWeight === "Kg") {
    if(metriceHeight === "CM") {
        height /= 100;
        bmia = weight / (height * height);
        console.log("1");
    } else if(metriceHeight === "M") {
        bmia = weight / (height * height);
        console.log("2");
    } else {
        height /= 3.28084;
        bmia = weight / (height * height);
        console.log("3");
    }
  } else {
    if(metriceHeight === "CM") {
        weight /= 1000;
        height /= 100;
        bmia = weight / (height * height);
    } else if(metriceHeight === "M") {
        weight /= 1000;
        bmia = weight / (height * height);
    } else {
        weight /= 1000;
        height /= 3.28084;
        bmia = weight / (height * height);
    }
  }
  let bmi = bmia.toFixed(3);
  // end 

  // to print status
  if(bmi < 18.5) {
    Status = "Underweight"
  } else if(bmi >= 18.5 && bmi <= 24.9) {
    Status = "Normal";
  } else if(bmi >= 25.0 && bmi <= 29.9) {
    Status = "Overweight";
  } else if(bmi >= 30.0 && bmi <= 34.9) {
    Status = "Obesity(1st Class)";
  } else if(bmi >= 35.0 && bmi <= 39.9) {
    Status = "Obesity(2nd Class)";
  } else {
    Status = "Extreme Obesity(3rd Class)";
  }
  showBmi(bmi,Status);
});

const showBmi = (bmi,Status) => {
  msg.innerHTML = `Your BMI is ${bmi}Kg/m${"2".sup()}`;
  msgStatus.innerText = `Your BMI Status is ${Status}`;
  msg.classList.remove("hide");
  msgStatus.classList.remove("hide");
  disableInput();
};

res.addEventListener("click", () => {
  msg.classList.add("hide");
  msgStatus.classList.add("hide");
  enalbeInput();
});

const disableInput = () => {
  let age = document.querySelector("#age");
  let weight = document.querySelector("#weight");
  let height = document.querySelector("#height");
  let metriceWeight = document.querySelector("#metrices-weight");
  let metriceHeight = document.querySelector("#metrices-height");
  age.disabled = true;
  weight.disabled = true;
  height.disabled = true;
  metriceWeight.disabled = true;
  metriceHeight.disabled = true;
};
const enalbeInput = () => {
  let age = document.querySelector("#age");
  let weight = document.querySelector("#weight");
  let height = document.querySelector("#height");
  let metriceWeight = document.querySelector("#metrices-weight");
  let metriceHeight = document.querySelector("#metrices-height");
  age.disabled = false;
  weight.disabled = false;
  height.disabled = false;
  metriceWeight.disabled = false;
  metriceHeight.disabled = false;
};
