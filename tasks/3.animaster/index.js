addListeners();

function addListeners() {
    let heart;
    let hide;
    document.getElementById('fadeInPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeInBlock');
            animaster().fadeIn(block, 5000);
        });

    document.getElementById('fadeInReset')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeInBlock');
            animaster().fadeIn(block, 5000).reset();
        });

    document.getElementById('movePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveBlock');
            animaster().addMove(1000, {x: 100, y: 10}).play(block);
        });

    document.getElementById('moveReset')
        .addEventListener('click', function () {
            const block = document.getElementById('moveBlock');
            animaster().addMove(1000, {x: 100, y: 10}).play(block).reset();
        });

    document.getElementById('scalePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('scaleBlock');
            animaster().scale(block, 1000, 1.25);
        });

    document.getElementById('scaleReset')
        .addEventListener('click', function () {
            const block = document.getElementById('scaleBlock');
            animaster().scale(block, 1000, 1.25).reset();
        });

    document.getElementById('fadeOutPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeOutBlock');
            animaster().fadeOut(block, 5000);
        });

    document.getElementById('fadeOutReset')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeOutBlock');
            animaster().fadeOut(block, 5000).reset();
        });

    document.getElementById('moveAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveAndHideBlock');
            hide = animaster().moveAndHide(block, 5000);
        });

    document.getElementById('moveAndHideReset')
        .addEventListener('click', function () {
            hide.reset();

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
            //const block = document.getElementById('heartBeatingBlock');
            heart.stop();
        });
}

function animaster() {

    let _steps = [];

    function resetFadeIn(element) {
        element.classList.remove('show');
        element.classList.add('hide');
        element.style.transform = null;
    }

    function resetFadeOut(element) {
        element.classList.remove('hide');
        element.classList.add('show');
        element.style.transform = null;
    }

    function resetMoveAndScale(element) {
        element.style.transform = null;
    }

    return {

        // move: function (element, duration, translation) {
        //     element.style.transitionDuration = `${duration}ms`;
        //     element.style.transform = getTransform(translation, null);
        //     return {
        //         reset: function () {
        //             resetMoveAndScale(element);
        //         }
        //     }
        // },

        fadeIn: function fadeIn(element, duration) {
            element.style.transitionDuration = `${duration}ms`;
            element.classList.remove('hide');
            element.classList.add('show');
            return {
                reset: function () {
                    resetFadeIn(element);
                }
            }
        },

        scale: function scale(element, duration, ratio) {
            element.style.transitionDuration = `${duration}ms`;
            element.style.transform = getTransform(null, ratio);
            return {
                reset: function () {
                    resetMoveAndScale(element);
                }
            }
        },

        fadeOut: function (element, duration) {
            element.style.transitionDuration = `${duration}ms`;
            element.classList.remove('show');
            element.classList.add('hide');
            return {
                reset: function () {
                    resetFadeOut(element);
                }
            }
        },

        moveAndHide: function (element, duration) {
            let translation = {x: 100, y: 20};
            let moving = 2 * duration / 5;
            let hiding = 3 * duration / 5;
            element.style.transitionDuration = `${moving}ms`;
            element.style.transform = getTransform(translation, null);
            let timer = setTimeout(() => {
                element.style.transitionDuration = `${hiding}ms`;
                element.classList.remove('show');
                element.classList.add('hide');
            }, moving);
            return {
                reset: function () {
                    clearTimeout(timer);
                    resetMoveAndScale(element);
                    resetFadeOut(element);
                }
            }
        },

        showAndHide: function (element, duration) {
            let time = duration / 3;
            element.style.transitionDuration = `${time}ms`;
            element.classList.remove('hide');
            element.classList.add('show');
            setTimeout(() => {
                element.style.transitionDuration = `${time}ms`;
                element.classList.remove('show');
                element.classList.add('hide');
            }, time);
        },

        heartBeating: function (element) {
            let time = 500;
            let count = 0;
            let interval = setInterval(() => {
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
            return {
                stop: function () {
                    clearInterval(interval);
                }
            }
        },

        addMove: function (duration, {x, y}) {
            let step = {
                name: 'move',
                duration: duration,
                translation: {x: x, y: y}
            };
            this._steps.push(step);
            return this;
        },

        play: function (element) {
            element.style.transitionDuration = `${this._steps[this._steps.length-1].duration}ms`;
            element.style.transform = getTransform(this._steps[this._steps.length-1].translation, null);
            return {
                reset: function () {
                    resetMoveAndScale(element);
                }
            };
        },

        _steps: _steps,

    };
}

// /**
//  * Блок плавно появляется из прозрачного.
//  * @param element — HTMLElement, который надо анимировать
//  * @param duration — Продолжительность анимации в миллисекундах
//  */
// function fadeIn(element, duration) {
//     element.style.transitionDuration =  `${duration}ms`;
//     element.classList.remove('hide');
//     element.classList.add('show');
// }

// /**
//  * Функция, передвигающая элемент
//  * @param element — HTMLElement, который надо анимировать
//  * @param duration — Продолжительность анимации в миллисекундах
//  * @param translation — объект с полями x и y, обозначающими смещение блока
//  */
// function move(element, duration, translation) {
//     element.style.transitionDuration = `${duration}ms`;
//     element.style.transform = getTransform(translation, null);
// }
//
// /**
//  * Функция, увеличивающая/уменьшающая элемент
//  * @param element — HTMLElement, который надо анимировать
//  * @param duration — Продолжительность анимации в миллисекундах
//  * @param ratio — во сколько раз увеличить/уменьшить. Чтобы уменьшить, нужно передать значение меньше 1
//  */
// function scale(element, duration, ratio) {
//     element.style.transitionDuration = `${duration}ms`;
//     element.style.transform = getTransform(null, ratio);
// }

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
