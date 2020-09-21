function modal (){
    const btns = document.querySelectorAll('[data-modal]');
    const modal = document.querySelector('.modal');
    

    function openModel() {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        //clearInterval(modalTimerId);
    }

    function closeModel() {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }

    btns.forEach (btn => {
        btn.addEventListener('click', () => {
            openModel();
        });
    });


    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close')=='') {
            closeModel();
        }
    });

    document.addEventListener ('keydown', (e) => {
        if (e.code === 'Escape' && modal.style.display == "block") {
            closeModel();
        }
    });

    //const modalTimerId = setTimeout (openModel, 2000);

    function showModalByScroll () {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModel();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
     
    window.addEventListener('scroll', showModalByScroll);

}

module.exports = modal;