let listArray = [
    {
        name: "Лодка надувная",
        price: 12000,
        id: 0,
        url: "assets/images/сatalog/item0.jpg"
    },

    {
        name: "Рыболовная сеть",
        price: 2000,
        id: 1,
        url: "assets/images/сatalog/item1.jpg"
    },

    {
        name: "Блесна Kuusamo Latka 70/14 C",
        price: 500,
        id: 2,
        url: "assets/images/сatalog/item2.jpg"
    },

    {
        name: "Рыболовный сачок",
        price: 1499,
        id: 3,
        url: "assets/images/сatalog/item3.jpg"
    },

    {
        name: "Панама vintage boonieк, цвет - хаки",
        price: 2199,
        id: 4,
        url: "assets/images/сatalog/item4.jpg"
    },
]   /* создание массива внутри которого содержатся объекты (для каждой ячейки) */ 
var objectID; /* глобальная переменная - сохраняет значения найденного ID */

const list = document.getElementById('list');
const button = document.querySelector('#buttonID');
reDrawing(listArray);
button.addEventListener('click', () => { /* событие при клике на кнопку "Добавить" */
    var itemName = document.querySelector('#inputName');
    var price = document.querySelector('#inputPrice');
    var fileImg = document.querySelector('#inputImg');

    if (itemName.value!="" && price.value!="") /* проверка на заполненность полей ввода */
    {
        if (button.id === 'buttonSave') { /* исполняется, если была ранее нажата кнопка "Редактировать", сменился ID, что вызывает выполнение этого блока кода */
            editObject(itemName.value, price.value, objectID); /* вызов функции для редактирования объекта */
            clearItem(); /* вызов функции очистки экрана (списка) */
            reDrawing(listArray); /* вызов функции отрисовки массива (параметром передаем массив) */
            clearInput(itemName, price, fileImg); /* вызов функции очистки input */
            button.innerHTML = 'Добавить'; /* после исполнения блока возвращает button имя и прежний id. Это позволяет добавлять новые элементы, т.к данный фрагмент кода пропускается и исполняется следующий */
            button.id = 'buttonID';
        }
        else {
            if (fileImg.value!=="") {
                listArray.push(objectItem = {name: itemName.value, price: price.value, url: "assets/images/сatalog/testItem.jpg", id: listArray.length}); /* пуш в массив нового элемента (объекта с параметрами: id, имя товара, цена, ссылка на картинку) */
                clearItem(); /* вызов функции очистки экрана */
                reDrawing(listArray); /* вызов функции отрисовки массива (параметром передаем массив) */
                clearInput(itemName, price, fileImg); /* вызов функции очистки input */
            }
            else {
                alert("Добавьте фотографию товара!");
            }
        }
    }
    else {
        alert("Заполните название товара и его цену!");
    }
    
})

document.getElementById('list').addEventListener('click', event => { /* обработка событий нажатия кнопок через делегирование и всплытие. Событие вешается на родителя (list) */
    var elemList = event.target; /* отлавливаем элемент, на который был совершен клик */
    if (event.target.className ==='buttonDel') { /* для кнопок "Удалить" */
        if (confirm('Подтвердите удаление ячейки!')) {
            objectID = elemList.parentElement.parentElement.parentElement.id; /* Т.к. id находится у предков - у отловленного элемента обращаемся к родителям и находим id элемента  */
            listArray.splice(objectID, 1); /* удаление элемента массива по найденному id */
            funcID(listArray); /* нумерация смещается, поэтому вызываем функцию для перенумерации */
            clearItem(); /* вызов функции очистки экрана (списка) */  
            reDrawing(listArray); /* вызов функции отрисовки массива (параметром передаем массив) */
        }
    }

    else if (event.target.className === 'buttonEdit') { /* для кнопок "Редактировать". при нажатии кнопки "Редактировать" ищет элемент, к которому вносят изменения. */
        buttonDisabled();
        objectID = elemList.parentElement.parentElement.parentElement.id;
        document.querySelector('#inputName').value = listArray[objectID].name;
        document.querySelector('#inputPrice').value = listArray[objectID].price;
        button.innerHTML = 'Сохранить' /* кнопка "добавить" меняется на "сохранить" + получает новый ID. При дальнейшем нажатии на "сохранить" запускается событие 42 строки. Сравнивается ID кнопки */
        button.id = 'buttonSave'
    }
})


                                                                                            /* КОМПОНЕНТЫ */                             

function funcID(listArray) { /* функция для переприсваивания ID для элементов массива для поддержания правильной нумерации */
    for (let index = 0; index < listArray.length; index++) {
        listArray[index].id = index; 
    }
}

function clearItem() { /* функция для очистки содержимого экрана */
    var liItem = document.querySelectorAll('.list__item') /* поиск всех элементов списка */
    liItem.forEach(element => { /* удаление каждого найденного элемента через forEach */
        element.remove();
    });
   
}

function reDrawing(listArray) { /* функция для отрисовки массива */
    for (let index = 0; index < listArray.length; index++) {
        let newEl = document.createElement('div') /* создание нового элемента списка */
        newEl.className = 'list__item'; /* присваиваем имя элементу */
        newEl.id = listArray[index].id; /* присваиваем id элементу */
        newEl.innerHTML = `<div class = "list__item-pos"><img class="list__pic" 
		  src = ${listArray[index].url}><div class= "list__item-text">
		  <p>${listArray[index].name}</p><p>${String(listArray[index].price)}₽</p>
		  </div><div class= "list__item--btn">
		  <button class="buttonEdit primary-btn primary-btn--green">Редактировать</button>
		  <button class="buttonDel primary-btn primary-btn--green">Удалить</button></div></div>`; /* помещаем текстовое значение для вывода - имя + дата + 2 кнопки*/
        list.append(newEl); /* добавление элемента в DOM дерево */
    }
    console.log(listArray); // контроль объекта для защиты работы, потом удалить
}

function editObject(name, price, objectID) { /* функция для переприсваивания значений объекта массива. Первые два параметра - значения инпутов (имя и дата), последний параметр - номер элемента массива, в который вносятся изменения */
    listArray[objectID].name = name;
    listArray[objectID].price = price; 
}

function clearInput(itemName, price, fileImg) { /* функция для очистки input (первый параметр - название задачи, второй параметр - дата) */
    itemName.value = '';
    price.value = '';
    fileImg.value = null;
}

function buttonDisabled() {
    let buttonDel = document.querySelectorAll('.buttonDel');
    for (let index = 0; index < buttonDel.length; index++) {
        buttonDel[index].setAttribute('disabled', true);
    }
}



