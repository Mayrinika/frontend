// Отвечает является ли объект уткой.
isDuck = function (obj) {
    return obj && obj.quacks && obj.swims;
};

// Отвечает является ли объект собакой.
isDog = function (obj) {
    return obj instanceof Dog;
};

Card.prototype.getCustomDescriptions = function () {
    if (isDuck(this) && !isDog(this))
        return ['Утка'];
    else if (isDog(this) && !isDuck(this))
        return ['Собака'];
    else if (isDuck(this) && isDog(this))
        return ['Утка-Собака'];
    else
        return ['Существо'];
};

// Основа для утки.
function Duck() {
    Card.apply(this, ['Мирная утка', 2]);
    this.quacks = () => {
        console.log('quack')
    };
    this.swims = () => {
        console.log('float: both;')
    };
}

Duck.prototype = Object.create(Card.prototype);
Duck.prototype.constructor = Duck;

// Основа для собаки.
function Dog() {
    Card.apply(this, ['Пес-бандит', 3]);
    this.swims = () => {
        console.log('float: none;')
    };
}

Dog.prototype = Object.create(Card.prototype);
Dog.prototype.constructor = Dog;

// Громила
function Trasher() {
    Card.apply(this, ['Громила', 5]);
}

Trasher.prototype = Object.create(Dog.prototype);
Trasher.prototype.constructor = Trasher;
Trasher.prototype.modifyTakenDamage = function (value, fromCard, gameContext, continuation) {
    this.view.signalAbility(() => continuation(value - 1));
};
Trasher.prototype.getCustomDescriptions = function () {
    return Card.prototype.getCustomDescriptions().concat(['Получает урона на 1 меньше']);
};

function Gatling() {
    Card.apply(this, ['Гатлинг', 6]);
}

Gatling.prototype = Object.create(Card.prototype);
Gatling.prototype.constructor = Gatling;
Gatling.prototype.attack = function (gameContext, continuation) {
    const taskQueue = new TaskQueue();
    const {currentPlayer, oppositePlayer, position, updateView} = gameContext;

    for(let position = 0; position < oppositePlayer.table.length; position++) {
        taskQueue.push(onDone => this.view.showAttack(onDone));
        taskQueue.push(onDone => {
            const oppositeCard = oppositePlayer.table[position];

            if (oppositeCard) {
                this.dealDamageToCreature(2, oppositeCard, gameContext, onDone);
            } else {
                this.dealDamageToPlayer(0, gameContext, onDone);
            }
        });
    }
    taskQueue.continueWith(continuation);
};

/*
// Колода Шерифа, нижнего игрока.
const seriffStartDeck = [
    new Duck(),
    new Duck(),
    new Duck(),
];

// Колода Бандита, верхнего игрока.
const banditStartDeck = [
    new Dog(),
];
*/

const seriffStartDeck = [
    new Duck(),
    new Duck(),
    new Duck(),
    new Gatling(),
];
const banditStartDeck = [
    new Trasher(),
    new Dog(),
    new Dog(),
];

// Создание игры.
const game = new Game(seriffStartDeck, banditStartDeck);

// Глобальная функция, позволяющая управлять скоростью всех анимаций.
function getSpeedRate() {
    return 2;
}

// Запуск игры.
game.play(false, (winner) => {
    alert('Победил ' + winner.name);
});
