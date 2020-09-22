function openModel(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    console.log(modalTimerId);

    if (modalTimerId) {
        clearInterval(modalTimerId);
    }
}

function closeModel(modalSelector) {
    const  modal = document.querySelector(modalSelector);
    modal.style.display = 'none';
    document.body.style.overflow = '';
}

function modal (triggerSelector, modalSelector, modalTimerId){
    const btns = document.querySelectorAll(triggerSelector);
    const modal = document.querySelector(modalSelector);

    btns.forEach (btn => {
        btn.addEventListener('click', () => {
            openModel(modalSelector);
        });
    });


    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close')=='') {
            closeModel(modalSelector);
        }
    });

    document.addEventListener ('keydown', (e) => {
        if (e.code === 'Escape' && modal.style.display == "block") {
            closeModel(modalSelector, modalTimerId);
        }
    });

    function showModalByScroll () {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModel(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
     
    window.addEventListener('scroll', showModalByScroll);

}

export default modal;
export {closeModel};
export {openModel};