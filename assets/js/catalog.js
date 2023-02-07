let listArray = []   /* создание массива внутри которого содержатся объекты (для каждой задачи) */ 
var objectID; /* глобальная переменная - сохраняет значения найденного ID */

const list = document.getElementById('list');
const button = document.querySelector('#buttonID');
button.addEventListener('click', () => { /* событие при клике на кнопку "Добавить" */
    var itemName = document.querySelector('#inputName');
    var price = document.querySelector('#inputPrice');
    var fileImg = document.querySelector('#inputImg');

    if (itemName.value!="" && price.value!="" && fileImg.value!=="") /* проверка на заполненность полей ввода */
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
            listArray.push(objectItem = {name: itemName.value, price: price.value, url: fileImg.value, id: listArray.length}); /* пуш в массив нового элемента (объекта с параметрами: id, имя задачи, статус, срок) */
            clearItem(); /* вызов функции очистки экрана (списка) */
            reDrawing(listArray); /* вызов функции отрисовки массива (параметром передаем массив) */
            clearInput(itemName, price, fileImg); /* вызов функции очистки input */
        }
    }
    else {
        alert("Заполните название товара, его цену и добавьте картинку!");
    }
    
})

document.getElementById('list').addEventListener('click', event => { /* обработка событий нажатия кнопок через делегирование и всплытие. Событие вешается на родителя (список) */
    var elemList = event.target; /* отлавливаем элемент, на который был совершен клик */
    if (event.target.className ==='buttonDel') { /* для кнопок "Удалить" */
        if (confirm('Подтвердите удаление ячейки!')) {
            objectID = elemList.parentElement.parentElement.parentElement.id; /* Т.к. id находится у предков - у отловленного элемента обращаемся к родителям и находим id элемента списка */
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
        button.innerHTML = 'Сохранить' /* кнопка "добавить" меняется на "сохранить" + получает новый ID. При дальнейшем нажатии на "сохранить" запускается событие 6 строки. Сравнивается ID кнопки */
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
        newEl.innerHTML = `<div class = "list__item-pos"><img class="list__pic" src = "./assets/images/testItem.jpg"><div class= "list__item-text"><p>${listArray[index].name}</p><p>${String(listArray[index].price)}₽</p></div><div class= "list__item--btn"><button class="buttonEdit">Редактировать</button><button class="buttonDel">Удалить</button></div></div>`; /* помещаем текстовое значение для вывода - имя + дата + 2 кнопки*/
        list.append(newEl); /* добавление элемента в DOM дерево */
    }
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



