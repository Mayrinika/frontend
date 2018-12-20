addListeners();

function addListeners() {
    let heart;
    let hide;
    document.getElementById('fadeInPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeInBlock');
            animaster().addFadeIn(5000).play(block);
        });

    document.getElementById('fadeInReset')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeInBlock');
            animaster().fadeIn(block, 5000).reset();
        });

    document.getElementById('movePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveBlock');
            animaster().addMove(1000, {x: 100, y: 10});
            animaster().addMove(1000, {x: 200, y: 200}).play(block);
            // const customAnimation = animaster()
            //     .addMove(200, {x: 40, y: 40})
            //     .addScale(800, 1.3)
            //     .addMove(200, {x: 80, y: 0})
            //     .addScale(800, 1)
            //     .addMove(200, {x: 40, y: -40})
            //     .addScale(800, 0.7)
            //     .addMove(200, {x: 0, y: 0})
            //     .addScale(800, 1);
            // customAnimation.play(block);
        });

    document.getElementById('moveReset')
        .addEventListener('click', function () {
            const block = document.getElementById('moveBlock');
            animaster().addMove(1000, {x: 100, y: 10}).play(block).reset();
        });

    document.getElementById('scalePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('scaleBlock');
            animaster().addScale(1000, 1.25).play(block);
        });

    document.getElementById('scaleReset')
        .addEventListener('click', function () {
            const block = document.getElementById('scaleBlock');
            // animaster().scale(block, 1000, 1.25).reset();
        });

    document.getElementById('fadeOutPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeOutBlock');
            animaster().addFadeOut(5000).play(block);
        });

    document.getElementById('fadeOutReset')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeOutBlock');
            animaster().fadeOut(block, 5000).reset();
        });

    document.getElementById('moveAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveAndHideBlock');
            //hide = animaster().moveAndHide(block, 5000);
            const duration = 5000;
            const moving = 2 * duration / 5;
            const hiding = 3 * duration / 5;
            hide = animaster().addMove(moving, {x: 100, y: 20}).play(block);
            let timer = setTimeout(() => {
                animaster().addFadeOut(hiding).play(block);
            }, moving);
        });

    document.getElementById('moveAndHideReset')
        .addEventListener('click', function () {
            hide.reset();

        });

    document.getElementById('showAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('showAndHideBlock');
            //animaster().showAndHide(block, 5000);
            const duration = 5000;
            const time = duration / 3;
            animaster().addFadeIn(time).play(block);
            animaster().addDelay(time).play(block);
            //animaster().addFadeOut(time).play(block);
            setTimeout(() => {
                animaster().addFadeOut(time).play(block);
            }, time);
        });

    document.getElementById('heartBeatingPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('heartBeatingBlock');
            // heart = animaster().heartBeating(block);
            let time = 500;
            let count = 0;
            let interval = setInterval(() => {
                if (count % 2 === 0) {
                    animaster().addScale(time, 1.4).play(block, true);
                    count++;
                } else {
                    animaster().addScale(time, 1).play(block, true);
                    count++;
                }
            }, time);
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
        _steps: _steps,

        // fadeIn: function fadeIn(element, duration) {
        //     element.style.transitionDuration = `${duration}ms`;
        //     element.classList.remove('hide');
        //     element.classList.add('show');
        //     return {
        //         reset: function () {
        //             resetFadeIn(element);
        //         }
        //     }
        // },

        // scale: function scale(element, duration, ratio) {
        //     element.style.transitionDuration = `${duration}ms`;
        //     element.style.transform = getTransform(null, ratio);
        //     return {
        //         reset: function () {
        //             resetMoveAndScale(element);
        //         }
        //     }
        // },

        // fadeOut: function (element, duration) {
        //     element.style.transitionDuration = `${duration}ms`;
        //     element.classList.remove('show');
        //     element.classList.add('hide');
        //     return {
        //         reset: function () {
        //             resetFadeOut(element);
        //         }
        //     }
        // },

        // moveAndHide: function (element, duration) {
        //     let translation = {x: 100, y: 20};
        //     let moving = 2 * duration / 5;
        //     let hiding = 3 * duration / 5;
        //     element.style.transitionDuration = `${moving}ms`;
        //     element.style.transform = getTransform(translation, null);
        //     let timer = setTimeout(() => {
        //         element.style.transitionDuration = `${hiding}ms`;
        //         element.classList.remove('show');
        //         element.classList.add('hide');
        //     }, moving);
        //     return {
        //         reset: function () {
        //             clearTimeout(timer);
        //             resetMoveAndScale(element);
        //             resetFadeOut(element);
        //         }
        //     }
        // },

        // showAndHide: function (element, duration) {
        //     let time = duration / 3;
        //     element.style.transitionDuration = `${time}ms`;
        //     element.classList.remove('hide');
        //     element.classList.add('show');
        //     setTimeout(() => {
        //         element.style.transitionDuration = `${time}ms`;
        //         element.classList.remove('show');
        //         element.classList.add('hide');
        //     }, time);
        // },

        // heartBeating: function (element) {
        //     let time = 500;
        //     let count = 0;
        //     let interval = setInterval(() => {
        //         if (count % 2 === 0) {
        //             element.style.transitionDuration = `${time}ms`;
        //             element.style.transform = getTransform(null, 1.4);
        //             count++;
        //         } else {
        //             element.style.transitionDuration = `${time}ms`;
        //             element.style.transform = getTransform(null, 1);
        //             count++;
        //         }
        //     }, time);
        //     return {
        //         stop: function () {
        //             clearInterval(interval);
        //         }
        //     }
        // },

        addFadeIn: function (duration) {
            let step = {
                name: 'fadeIn',
                duration: duration,
            };
            this._steps.push(step);
            return this;
        },

        addMove: function (duration, {x, y}) {
            let step = {
                name: 'move',
                duration: duration,
                offset: {x: x, y: y},
            };
            this._steps.push(step);
            return this;
        },

        addScale: function (duration, ratio) {
            let step = {
                name: 'scale',
                ratio: ratio
            };
            this._steps.push(step);
            return this;
        },

        addFadeOut: function (duration) {
            let step = {
                name: 'fadeOut',
                duration: duration,
            };
            this._steps.push(step);
            return this;
        },

        addDelay: function (duration) {
            let step = {
                name: 'delay',
                duration: duration,
            };
            this._steps.push(step);
            return this;
        },

        play: function (element, cycled = false) {
            for (let step of this._steps) {
                element.style.transitionDuration = `${step.duration}ms`;
                switch (step.name) {
                    case 'move':
                        element.style.transform = getTransform(step.offset, null);
                        break;
                    case 'scale':
                        element.style.transform = getTransform(null, step.ratio);
                        break;
                    case 'fadeIn':
                        element.classList.remove('hide');
                        element.classList.add('show');
                        break;
                    case 'fadeOut':
                        element.classList.remove('show');
                        element.classList.add('hide');
                        break;
                    case 'delay':
                        setTimeout(() => {
                        }, step.duration);
                }

            }

        },
    };
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

//MOVE
// return {
//     reset: function () {
//         resetMoveAndScale(element);
//     }
// };

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


