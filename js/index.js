"use strict"
const burger = document.getElementById('burger');
const burgerOpen = document.getElementById('burger-open');
burgerOpen.addEventListener("click", () => {
    burger.classList.add('burger-is-open');
    document.body.style.overflow = 'hidden';
});

const burgerClose = document.getElementById('burger-close');
burgerClose.addEventListener("click", () => {
    burger.classList.remove('burger-is-open');
    document.body.style.overflow = '';
});
//зверху js для роботи burger menu ( випадаюче меню на маленьких екранах )

const btn = document.getElementById('header-btn');
btn.addEventListener("click", () => {
    // тут вішаю обробник на кнопку, щоб при кліку на неї викликалося модальне вікно
    const modal = new ModalWindow("title", "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad, atque cupiditate deserunt dolor et facere ipsum odio placeat quo voluptatum.", 'photo1.png', 'quantityModalOpen');
    modal.show();
});

class ModalWindow {
    constructor(title, text, img, quantityModalOpen) {
        this._title = title;
        this._text = text;
        this._img = img;
        this._quantityModalOpen = quantityModalOpen;
        //quantityModalOpen назва поля в якому ( в localStorage ) будемо записувати кількість відкриттів модального вікна
        window.onbeforeunload = function(){
            //вішаємо обробник на закриття або перезавантаження вкладки, щоб віднімати кількість вікон
            if(+localStorage.getItem(quantityModalOpen) - +sessionStorage.getItem(quantityModalOpen) >= 0){
                localStorage.setItem(quantityModalOpen, `${+localStorage.getItem(quantityModalOpen) - +sessionStorage.getItem(quantityModalOpen)}`);
            }
            sessionStorage.clear();
        }
    }
    create() {
        const modalContainer = document.createElement('div');
        modalContainer.id = 'modal';
        modalContainer.style.cssText=`display: none;
                                      position: fixed;
                                      z-index: 1;
                                      overflow-x: hidden;
                                      overflow-y: auto;
                                      top: 0;
                                      bottom: 0;
                                      left: 0;
                                      right: 0;
                                      background: rgba(0, 59, 189, 0.44);`;
        const modal = document.createElement('div');
        modal.innerHTML = `<h2>${this._title}</h2>
                           <img src="img/${this._img}" alt="img"/>
                           <p>${this._text}</p>`;
        modal.style.cssText = `max-width: 400px;
                               margin: 40px auto;
                               background: white;
                               text-align: center;
                               position: relative;
                               border: 1px solid #000C2D;
                               padding: 20px;`;
        const close = document.createElement('div');
        close.innerHTML = 'x';
        close.style.cssText = `padding: 15px;
                               background: #000C2D;
                               color: white;
                               cursor: pointer;
                               position: absolute;
                               right: 0;
                               top: 0;`;
        close.addEventListener('click', () => {
            this.hidden();
        })
        modal.append(close);
        modalContainer.append(modal);
        document.body.append(modalContainer);
        sessionStorage.setItem(this._quantityModalOpen, `${+sessionStorage.getItem(this._quantityModalOpen) + 1}`);
        localStorage.setItem(this._quantityModalOpen, `${+localStorage.getItem(this._quantityModalOpen) + 1}`);
    }
    show(delay = 0) {
        //передавши delay можемо реалізувати відкриття з затримкою
        setTimeout(() => {
            this.create();
            document.getElementById('modal').style.display = 'block';
            document.body.style.overflow = 'hidden';
            }, delay);
    }
    hidden () {
        document.getElementById('modal').style.display = 'none';
        document.body.style.overflow = '';
        this.remove();
    }
    remove () {
        document.getElementById('modal').remove();
    }
}



/*setTimeout(() => {
    console.log('sessionStorage:',sessionStorage.getItem('quantityModalOpen'));
    console.log('localStorage:',localStorage.getItem('quantityModalOpen'));
}, 5000)*/




