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