const requestURL = "https://www.cbr-xml-daily.ru/daily.xml";
const xhr = new XMLHttpRequest();
const currency1 = document.querySelector("#first-currency");
const currency2 = document.querySelector("#second-currency");
const button = document.querySelector("input");
const currencyRubles1 = document.querySelector(".currency1-rubles");
const currencyRubles2 = document.querySelector(".currency2-rubles");
const resultOutput = document.querySelector(".result-output");

xhr.open("GET", requestURL);

function getValue(array, nameСurrency) {
  let findCurrency = array.find(
    (string) => string.indexOf(nameСurrency) !== -1
  );
  let valueString = findCurrency.match(/\d\d,\d\d\d\d/)[0];
  console.log(valueString);
  let nominalString = findCurrency.match(/>(10*)</)[1];
  console.log(nominalString);
  let value = valueString.replace(",", ".");
  return (value / nominalString).toFixed(4);
}

xhr.onload = () => {
  let bstring = xhr.response;
  console.log(bstring);
  let arrayStrings = bstring.split("</NumCode>");
  console.log(arrayStrings);
  currency1.addEventListener("change", function () {
    if (currency1.value !== "") {
      currency2.disabled = false;
      currencyRubles1.innerHTML = getValue(arrayStrings, currency1.value);
    } else {
      currency2.disabled = "true";
      currency2.value = "";
      button.disabled = true;
      currencyRubles1.innerHTML = "";
      currencyRubles2.innerHTML = "";
      resultOutput.innerHTML = "";
    }
  });
  currency2.addEventListener("change", function () {
    if (currency1.value !== "" && currency2.value !== "") {
      button.disabled = false;
      currencyRubles2.innerHTML = getValue(arrayStrings, currency2.value);
    } else {
      button.disabled = true;
      currencyRubles2.innerHTML = "";
      resultOutput.innerHTML = "";
    }
  });
  button.addEventListener("click", function () {
    let value1 = getValue(arrayStrings, currency1.value);
    let value2 = getValue(arrayStrings, currency2.value);
    console.log(value1);
    console.log(value2);
    resultOutput.innerHTML =
      "Одна единица первой валюты составляет " +
      (value1 / value2).toFixed(4) +
      " второй валюты.";
  });
};

xhr.send();
