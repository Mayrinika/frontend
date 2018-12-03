import Card from './Card.js';
import Game from './Game.js';
import {setSpeedRate as setGameSpeedRate} from './SpeedRate.js';

// Отвечает является ли карта уткой.
function isDuck(card) {
    return card && card.quacks && card.swims;
}

// Отвечает является ли карта собакой.
function isDog(card) {
    return card instanceof Dog;
}

// Дает описание существа по схожести с утками и собаками
function getCreatureDescription(card) {
    if (isDuck(card) && isDog(card)) {
        return 'Утка-Собака';
    }
    if (isDuck(card)) {
        return 'Утка';
    }
    if (isDog(card)) {
        return 'Собака';
    }
    return 'Существо';
}

class Creature extends Card{
    constructor(name, maxPower, image){
        super(name, maxPower, image);
    }

    getDescriptions(){
        let descriptions = super.getDescriptions();
        let str2 = getCreatureDescription(this);
        return [str2, ...descriptions];
    };

}
class Duck extends Creature {
    constructor() {
        super('Мирная утка',1);
        this.quacks = function() { console.log('quack') };
        this.swims = function() { console.log('float: both;') };
    }
}

class Dog extends Creature {
    constructor() {
        super('Пес-бандит', 3);
        this.swims = function () {
            console.log('float: none;')
        };
    }
}

class Lad extends Dog {
    constructor() {
        super('Браток', 2);
        this.name = 'Браток';
        this.maxPower = 2;
        Lad.getInGameCount();
    }
    static getInGameCount() { return this.inGameCount || 0; }
    static setInGameCount(value) { this.inGameCount = value; }

    doAfterComingIntoPlay(gameContext, continuation) {
        const count = Lad.getInGameCount();
        Lad.setInGameCount(count + 1);
        continuation();
    }
    doBeforeRemoving (continuation) {
        const count = Lad.getInGameCount();
        Lad.setInGameCount(count - 1);
        continuation();
    };

    static getBonus() {
        return this.getInGameCount() * (this.getInGameCount() + 1) /2;
    }
    modifyDealedDamageToCreature(value, toCard, gameContext, continuation) {
        continuation(Lad.getBonus());
    };
    modifyTakenDamage (value, fromCard, gameContext, continuation) {
        continuation(Lad.getBonus());
    };
}

// Колода Шерифа, нижнего игрока.
// const seriffStartDeck = [
//     new Card('Мирный житель', 2),
//     new Card('Мирный житель', 2),
//     new Card('Мирный житель', 2),
// ];
//
// // Колода Бандита, верхнего игрока.
// const banditStartDeck = [
//     new Card('Бандит', 3),
// ];
const seriffStartDeck = [
    new Duck(),
    new Duck(),
    new Duck(),
];
const banditStartDeck = [
    new Lad(),
    new Lad(),
    new Lad(),
    new Lad(),
];

// Создание игры.
const game = new Game(seriffStartDeck, banditStartDeck);

// Глобальный объект, позволяющий управлять скоростью всех анимаций.
setGameSpeedRate(1);

// Запуск игры.
game.play(false, (winner) => {
    alert('Победил ' + winner.name);
});
