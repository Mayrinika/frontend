addListeners();

const customAnimation = animaster()
    .addMove(200, {x: 40, y: 40})
    .addScale(800, 1.3)
    .addMove(200, {x: 80, y: 0})
    .addScale(800, 1)
    .addMove(200, {x: 40, y: -40})
    .addScale(800, 0.7)
    .addMove(200, {x: 0, y: 0})
    .addScale(800, 1);

function addListeners() {
    let blockAnimations =[];
    document.getElementById('customAnimationPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('customAnimationBlock');
            customAnimation.play(block);
        });

    document.getElementById('fadeInPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeInBlock');
            blockAnimations['fadeInBlock'] = animaster().addFadeIn(5000).play(block);
        });

    document.getElementById('fadeInReset')
        .addEventListener('click', function () {
            blockAnimations['fadeInBlock'].reset();
        });

    document.getElementById('movePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveBlock');
            blockAnimations['moveBlock']=animaster().addMove(1000, {x: 100, y: 10}).play(block);
        });

    document.getElementById('moveReset')
        .addEventListener('click', function () {
            blockAnimations['moveBlock'].reset();
        });

    document.getElementById('scalePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('scaleBlock');
            blockAnimations['scaleBlock']=animaster().addScale(1000, 1.25).play(block);
        });

    document.getElementById('scaleReset')
        .addEventListener('click', function () {
            blockAnimations['scaleBlock'].reset();
        });

    document.getElementById('fadeOutPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('fadeOutBlock');
            blockAnimations['fadeOutBlock']=animaster().addFadeOut(5000).play(block);
        });

    document.getElementById('fadeOutReset')
        .addEventListener('click', function () {
            blockAnimations['fadeOutBlock'].reset();
        });

    document.getElementById('moveAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('moveAndHideBlock');
            const duration = 5000;
            const moving = 2 * duration / 5;
            const hiding = 3 * duration / 5;
            blockAnimations['moveAndHideBlock'] = animaster()
                .addMove(moving, {x: 100, y: 20})
                .addFadeOut(hiding)
                .play(block);
        });

    document.getElementById('moveAndHideReset')
        .addEventListener('click', function () {
            blockAnimations['moveAndHideBlock'].reset();
        });

    document.getElementById('showAndHidePlay')
        .addEventListener('click', function () {
            const block = document.getElementById('showAndHideBlock');
            const duration = 5000;
            const time = duration / 3;
            animaster()
                .addFadeIn(time)
                .addDelay(time)
                .addFadeOut(time)
                .play(block);
        });

    document.getElementById('heartBeatingPlay')
        .addEventListener('click', function () {
            const block = document.getElementById('heartBeatingBlock');
            let time = 500;
            blockAnimations['heartBeatingBlock']=animaster()
                .addScale(time, 1.4)
                .addScale(time, 1)
                .play(block, true);
        });

    document.getElementById('heartBeatingStop')
        .addEventListener('click', function () {
            blockAnimations['heartBeatingBlock'].stop();
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
                duration: duration,
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
            let reverse = [];
            let totalDuration = 0;
            for (let step of _steps) {
                setTimeout(() => {
                        element.style.transitionDuration = `${step.duration}ms`;
                        switch (step.name) {
                            case 'move':
                                element.style.transform = getTransform(step.offset, null);
                                reverse.push(()=>resetMoveAndScale(element));
                                break;
                            case 'scale':
                                element.style.transform = getTransform(null, step.ratio);
                                reverse.push(()=>resetMoveAndScale(element));
                                break;
                            case 'fadeIn':
                                element.classList.remove('hide');
                                element.classList.add('show');
                                reverse.push(()=>resetFadeIn(element));
                                break;
                            case 'fadeOut':
                                element.classList.remove('show');
                                element.classList.add('hide');
                                reverse.push(()=>resetFadeOut(element));
                                break;
                            case 'delay':
                                break;
                        }
                    },
                    totalDuration
                );
                totalDuration += step.duration;
            }
            if (cycled)
                setTimeout(() => {
                    this.play(element, cycled);
                }, totalDuration);
            return {
                reset: function () {
                    for (let rev of reverse){
                        rev();
                    }
                },

            };

        }
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


