let isEdit = false;
const form = document.querySelector('.info_form');
function editItem(data) {
    isEdit = true;
    const inputs = form.querySelectorAll("input");
    inputs.forEach((item) => (item.value = data[item.id]));
    form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        const items = JSON.parse(window.localStorage.getItem("items"));
        const obj = {};
        inputs.forEach((item) => (obj[item.id] = item.value));
        let indexOf = -1;
        items.forEach((item, index) => {
          if (+obj.id === item.id) {
            indexOf = index;
          }
        });
        items[indexOf] = obj; // change the value in LocalStorage
        window.localStorage.setItem("items", JSON.stringify(items));
        inputs.forEach((item) => (item.value = ""));
        const itemToChange = document.getElementById(data.id);
        itemToChange.querySelector('img').src = obj.img;
        itemToChange.querySelector('.card-title').textContent = obj.title;
        itemToChange.querySelector('.card-text').textContent = `Описание: ${obj.body}`;
        itemToChange.querySelector('.card-text-country').textContent = `Поставщик: ${obj.country}`;
        itemToChange.querySelector('.id').textContent = `Код товара: ${obj.id}`;
        isEdit = false;
    }, {once:true})
  }
  function deleteItem(id) {
    const item = document.getElementById(id);
    const itemsStorage = JSON.parse(window.localStorage.getItem("items"));
    const newItems = itemsStorage.filter((item) => item.id !== id);
    window.localStorage.setItem("items", JSON.stringify(newItems));
    item.remove();
  }
  const createButton = (isEdit, title, img, body, id, country) => {
    if(isEdit){
        const editBtn = document.createElement("button");
        editBtn.addEventListener("click", (e) => {
        e.preventDefault();
        editItem({ title, img, body, id, country });
        });
        editBtn.append(document.createTextNode("Редактировать"));
        editBtn.classList.add('btn');
        editBtn.classList.add('btn-primary');
        return editBtn;
    }
    else{
        const deleteBtn = document.createElement("button");
        deleteBtn.addEventListener("click", (e) => {
        e.preventDefault();
        deleteItem(id);
        });
        deleteBtn.append(document.createTextNode("Удалить"));
        deleteBtn.classList.add('btn');
        deleteBtn.classList.add('btn-danger');
        return deleteBtn;
    }
    
  }
function addCard({ title, img, body, id, country }) {
    const container = document.createElement("div");
    container.style.width = '15rem';
    container.classList.add("card");
    container.id = id;
    //id
    const idContainer = document.createElement("p");
    idContainer.classList.add("id");
    idContainer.append(document.createTextNode(`Код товара: ${id}`));
    //create IMG
    const imgElement = document.createElement('img');
    imgElement.classList.add('card-img-top');
    imgElement.src = img;
    imgElement.style.height = "100%";
    imgElement.style.width = "100%";
    //create body
    const info = document.createElement("div");
    info.classList.add("card-body");
    //title
    const titleContainer = document.createElement("h5");
    titleContainer.classList.add("card-title");
    titleContainer.append(document.createTextNode(title));
    //body text
    const bodyContainer = document.createElement("p");
    bodyContainer.classList.add("card-text");
    bodyContainer.append(document.createTextNode(`Описание: ${body}`));
    //delivere
    const providerContainer = document.createElement("p");
    providerContainer.classList.add("card-text-country");
    providerContainer.append(document.createTextNode(`Страна: ${country}`));

    const buttonContainer = document.createElement("div");
    const editBtn = createButton(true, title, img, body, id, country);
    const deleteBtn = createButton(false, title, img, body, id, country);
    
    info.append(idContainer);
    info.append(titleContainer);
    info.append(bodyContainer);
    info.append(providerContainer);
    buttonContainer.append(editBtn);
    buttonContainer.append(deleteBtn);
    container.append(imgElement);
    container.append(info);
    container.append(buttonContainer);
    return container;
  }
(function onLoad(){
  const items = JSON.parse(window.localStorage.getItem("items"));
  const itemsContainer = window.document.querySelector(".info_items");
  if (!items) {
    const items = [
        {
            title: "Греча",
            img: "https://images-eu.ssl-images-amazon.com/images/I/51ereK%2BAbdL._UL1000_.jpg",
            body: "Крупа гречневая",
            id: 1,
            country: "Россия",
          },
          {
            title: "Рис",
            img: "https://palladi.ru/upload/iblock/1b2/1b2e89e6b3921a63e7b48a4a0f3dff46.jpg",
            body: "Краснодарский рис",
            id: 2,
            country: "Россия",
          },
    ];
    items.map((item) => itemsContainer.append(addCard(item)));
    window.localStorage.setItem("items", JSON.stringify(items));
    
  } else {
    items.map((item) => itemsContainer.append(addCard(item)));
}
}());

const toDefault = document.getElementById('defaultClick');
toDefault.addEventListener('click', () => {
    window.localStorage.clear();
    window.location.reload();
});
form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    if (!isEdit) {
      const items = JSON.parse(window.localStorage.getItem("items"));
      const obj = {};
      const inputs = evt.target.querySelectorAll("input");
      console.log(inputs);
      inputs.forEach((item) => (obj[item.id] = item.value));
      items.push(obj);
      window.localStorage.setItem("items", JSON.stringify(items));
      const cardsContainer = window.document.querySelector(".info_items");
      cardsContainer.append(addCard(obj));
      inputs.forEach((item) => (item.value = ""));
    }
  });