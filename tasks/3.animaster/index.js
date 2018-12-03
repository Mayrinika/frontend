addListeners();

function addListeners() {
    let heart;
    document.getElementById('fadeInPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeInBlock');
            animaster().fadeIn(block, 5000);
        });

    document.getElementById('fadeInStop')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeInBlock');
            animaster().fadeIn(block, 5000).stop();
        });

    document.getElementById('movePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveBlock');
            animaster().move(block, 1000, {x: 100, y: 10});
        });

    document.getElementById('moveStop')
        .addEventListener('click', function () {
            const block = document.getElementById('moveBlock');
            animaster().move(block, 1000, {x: 100, y: 10}).stop();
        });

    document.getElementById('scalePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('scaleBlock');
            animaster().scale(block, 1000, 1.25);
        });

    document.getElementById('scalePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('scaleBlock');
            animaster().scale(block, 1000, 1.25).stop();
        });

    document.getElementById('fadeOutPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeOutBlock');
            animaster().fadeOut(block, 5000);
        });

    document.getElementById('fadeOutPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeOutBlock');
            animaster().fadeOut(block, 5000).stop();
        });

    document.getElementById('moveAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveAndHideBlock');
            animaster().moveAndHide(block, 5000);
        });
    document.getElementById('showAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('showAndHideBlock');
            animaster().showAndHide(block, 5000);
        });
    document.getElementById('heartBeatingPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('heartBeatingBlock');
            heart = animaster().heartBeating(block);
        });
    document.getElementById('heartBeatingStop')
        .addEventListener('click', function () {
            const block = document.getElementById('heartBeatingBlock');
            heart.stop();
        });
}

function animaster() {
    /**
     * Блок плавно появляется из прозрачного.
     * @param element — HTMLElement, который надо анимировать
     * @param duration — Продолжительность анимации в миллисекундах
     */
    function resetFadeIn(element) {
        element.classList.remove('show');
        element.classList.add('hide');
    }

    function resetFadeOut(element) {
        element.classList.remove('hide');
        element.classList.add('show');
    }

    function resetMoveAndScale(element) {
        element.style.transform = null;
    }

    return {
        fadeIn: function (element, duration) {
            element.style.transitionDuration = `${duration}ms`;
            element.classList.remove('hide');
            element.classList.add('show');
            return {
                stop: function () {
                    resetFadeIn(element);
                }
            }
        },

        fadeOut: function(element, duration) {
            element.style.transitionDuration = `${duration}ms`;
            element.classList.remove('show');
            element.classList.add('hide');
            return {
                stop: function () {
                    resetFadeOut(element);
                }
            }
        },

        /**
         * Функция, передвигающая элемент
         * @param element — HTMLElement, который надо анимировать
         * @param duration — Продолжительность анимации в миллисекундах
         * @param translation — объект с полями x и y, обозначающими смещение блока
         */
        move: function(element, duration, translation)
        {
            element.style.transitionDuration = `${duration}ms`;
            element.style.transform = getTransform(translation, null);
            return {
                stop: function () {
                    resetMoveAndScale(element);
                }
            }
        },

    /**
     * Функция, увеличивающая/уменьшающая элемент
     * @param element — HTMLElement, который надо анимировать
     * @param duration — Продолжительность анимации в миллисекундах
     * @param ratio — во сколько раз увеличить/уменьшить. Чтобы уменьшить, нужно передать значение меньше 1
     */
        scale: function(element, duration, ratio) {
            element.style.transitionDuration = `${duration}ms`;
            element.style.transform = getTransform(null, ratio);
            return {
                stop: function () {
                  resetMoveAndScale(element);
                }
            }
        },

        moveAndHide: function (element, duration) {
            let translation = {x: 100, y: 20};
            let moving=2*duration/5;
            let hiding=3*duration/5;
            element.style.transitionDuration = `${moving}ms`;
            element.style.transform = getTransform(translation, null);
            setTimeout(() => {
                element.style.transitionDuration = `${hiding}ms`;
                element.classList.remove('show');
                element.classList.add('hide');
            }, moving);
        },

        showAndHide:function (element,duration) {
            let time=duration/3;
            element.style.transitionDuration = `${time}ms`;
            element.classList.remove('hide');
            element.classList.add('show');
            setTimeout(()=>{
                element.style.transitionDuration = `${time}ms`;
                element.classList.remove('show');
                element.classList.add('hide');
            },time);
        },

        heartBeating: function (element) {
            let time = 500;
            let count = 0;
            let interval=setInterval(()=> {
                if (count % 2 === 0) {
                    element.style.transitionDuration = `${time}ms`;
                    element.style.transform = getTransform(null, 1.4);
                    count++;
                } else {
                    element.style.transitionDuration = `${time}ms`;
                    element.style.transform = getTransform(null, 1);
                    count++;
                }
            }, time);
            return{
                stop:function(){
                    clearInterval(interval);
                }
            }
        }

    }
}

function getTransform(translation, ratio) {
    const result = [];
    if (translation) {
        result.push(`translate(${translation.x}px,${translation.y}px)`);
    }
    if (ratio) {
        result.push(`scale(${ratio})`);
    }
    return result.join(' ');
}
