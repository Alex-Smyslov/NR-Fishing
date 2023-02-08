function faqToggle(event) {
    const elemRemove = document.querySelector('.active');
    const elem = event.target;

    if (elemRemove && elemRemove!=elem.parentElement.parentElement)
    {
        removeToggle(elemRemove);
    }
    
    elem.parentElement.parentElement.classList.toggle('active');
}

function removeToggle(elem) {
    elem.classList.remove('active');
}

function toggle_width(wrapp) { // для адаптива, ховер не работает на телефонах
    var e = document.getElementById(wrapp);
    var grid = document.querySelector('.content__grid');
    var title = document.querySelector('.content__title');
    if(window.screen.width<500 && e.style.width === "520px") {
        e.setAttribute("style","width:240px");
        title.style.left = '50%';
        grid.style.display = "none";
    }

    else if(window.screen.width<500) {
        e.setAttribute("style","width:520px");
        grid.style.display = "grid";
        title.style.left = '20%';
    }
 }