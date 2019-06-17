const search = document.getElementById("search");
const dataList = document.getElementById("data");
const btn = document.getElementById("btn");
const selected = document.getElementById("selected");
const deleted = document.getElementById("deleted");

search.addEventListener("input", searchWord);
btn.addEventListener("click", addValue);
deleted.addEventListener("click", deleteAll);

async function searchWord() {
  const data = await fetch(
    "https://cors-anywhere.herokuapp.com/https://api.datamuse.com/sug?s=" +
      this.value
  );
  const json = await data.json();
  const words = json.map(el => el.word);
  dataList.innerHTML = "";
  words.forEach(el => {
    const option = document.createElement("option");
    option.value = el;
    dataList.appendChild(option);
  });
}

function addValue() {
  const li = document.createElement("p");
  li.classList.add("item");
  const spanText = document.createElement("span");
  const spanDate = document.createElement("span");
  const dt = new Date();
  const utcDate = dt.toUTCString();
  spanText.innerHTML = search.value;
  spanDate.innerHTML = utcDate;
  spanDate.classList.add("timestamp");
  const button = document.createElement("button");
  button.innerHTML = "X";
  button.classList.add("button-remove");
  button.onclick = function() {
    selected.removeChild(li);
  };
  li.appendChild(spanText);
  li.appendChild(spanDate);
  li.appendChild(button);
  selected.appendChild(li);
  search.value = "";
}

function deleteAll() {
  selected.innerHTML = "";
}
