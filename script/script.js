const form = document.getElementById('form');
const input = document.getElementById('input');
const list = document.getElementById('list');
const sortBtn = document.getElementById('sort-btn');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let item = input.value.trim();

  if (item !== '' && !Array.from(list.children).some(li => li.textContent === item)) {
    addItem(item);
    input.value = '';
  }
});


//Adding Items in the local storage / in the Array.
function loadItems() {
  let items = JSON.parse(localStorage.getItem('items')) || [];
  items.forEach((item) => addItem(item));
}
window.addEventListener('load', loadItems);

//Function that add Item and delete, in the to-do.list
function addItem(item) {
  if (!Array.from(list.children).some(li => li.textContent === item)) {
    let li = document.createElement('li');
    li.innerHTML = `
      <span class="item">${item}</span>
      <button class="edit" onclick="edit(this)">Edit</button>
      <button class="delete">X</button>
    `;
    list.appendChild(li);

    let dltBtn = li.querySelector('.delete');
    dltBtn.addEventListener('click', () => {
      li.remove();
      saveItems();
    });

    saveItems();
  }
}


//Function that allow the user to edit what ever is in the to-do.list
function edit(e) {
  let update = prompt("Update task:");
  if (update !== null && update !== '') {
    e.previousElementSibling.textContent = update;
    saveItems();
  } else if (update === '') {
    alert("Please enter a valid task⚠️");
  }
}


//Function that save to local 
function saveItems() {
  let items = Array.from(list.children).map((li) => li.querySelector('.item').textContent);
  localStorage.setItem('items', JSON.stringify(items));
}


//Function that allow the user to sort Ascending or Decending order
function sortItems() {
  let items = Array.from(list.children).map((li) => li.querySelector('.item').textContent);
  let uniqueSortedItems = [...new Set(items)].sort((a, b) => a.localeCompare(b));
  list.innerHTML = '';
  uniqueSortedItems.forEach(item => addItem(item));
}

sortBtn.addEventListener('click', sortItems);
