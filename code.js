"use strict";
document.addEventListener("DOMContentLoaded", () => {
    const
        game = document.querySelector('.game'),
        score = game.querySelector('.game__score'),
        start = game.querySelector('.game__start'),
        area = game.querySelector('.game__area'),
        car = document.createElement('div');

    car.classList.add('car');
    car.classList.add('car__player');

    start.addEventListener('click', startGame);
    document.addEventListener('keydown', startRun);
    document.addEventListener('keyup', stopRun);

    const
        keys = {
            ArrowUp: false,
            ArrowDown: false,
            ArrowRight: false,
            ArrowLeft: false,
        },
        controlKeys = [
            'F5',
            'F12',
        ],
        ruler = {
            carWidth: 0,
            carHeight: 0,
            areaWidth: 0,
            areaHeight: 0,
        },
        setting = {
            start: false,
            score: 0,
            speed: 3,
            trafic: 3,
        };

    let lines;

    function startGame() {
        start.classList.add('hide');
        area.appendChild(car);
        setting.start = true;
        setting.x = car.offsetLeft;
        setting.y = car.offsetTop;
        ruler.carWidth = car.offsetWidth;
        ruler.carHeight = car.offsetHeight;
        ruler.areaWidth = area.offsetWidth;
        ruler.areaHeight = area.offsetHeight;

        for (let i = 0; i < getQuantityElements(100); i++) {
            const line = document.createElement('div');
            line.classList.add('line');
            line.style.top = (i * 100) + 'px';
            line.y = i * 100;
            area.appendChild(line);
        }

        for (let i = 1; i < getQuantityElements(100 * setting.trafic); i++) {
            const enemy = document.createElement('div');
            enemy.classList.add('car');
            randomCar(enemy);
            enemy.y = -100 * setting.trafic * (i + 1);
            enemy.style.left = (Math.floor(Math.random() * (ruler.areaWidth - ruler.carWidth)) + ruler.carWidth / 2) + 'px';
            enemy.style.top = enemy.y + 'px';
            area.appendChild(enemy);
        }

        lines = document.querySelectorAll('.line');
        requestAnimationFrame(playGame);
    }

    function playGame() {


        if (setting.start) {
            moveRoad();
            moveEnemy();

            // console.log(keys);
            if (keys.ArrowLeft) {
                setting.x -= setting.speed;
                if (setting.x - ruler.carWidth / 2 < 0) {
                    setting.x = ruler.carWidth / 2;
                }
            }

            if (keys.ArrowRight) {
                setting.x += setting.speed;
                if (setting.x + ruler.carWidth / 2 > ruler.areaWidth) {
                    setting.x = ruler.areaWidth - ruler.carWidth / 2;
                }
            }

            if (keys.ArrowUp) {
                setting.y -= setting.speed;
                if (setting.y < 0) {
                    setting.y = 0;
                }

            }

            if (keys.ArrowDown) {
                setting.y += setting.speed;
                if (setting.y + ruler.carHeight > ruler.areaHeight) {
                    setting.y = ruler.areaHeight - ruler.carHeight;
                }
            }

            car.style.left = setting.x + 'px';
            car.style.top = setting.y + 'px';
            requestAnimationFrame(playGame);
        }
    }

    function moveRoad() {
        lines.forEach((line) => {
            line.y += setting.speed;
            // line.y ++;
            line.style.top = (line.y - 100) + 'px';

            if (line.y > document.documentElement.clientHeight + 100) {
                // line.style.top = line.start + 'px';
                line.y = 0;
            }
        })

    }

    function moveEnemy() {
        let enemys = area.querySelectorAll('.car__enemy');
        enemys.forEach(enemy=>{
            enemy.y += setting.speed / 2;
            enemy.style.top = enemy.y + 'px';

            if (enemy.y >= document.documentElement.clientHeight + 100) {
                enemy.y = -100;
                enemy.style.top = enemy.y + 'px';
                enemy.style.left = (Math.floor(Math.random() * (ruler.areaWidth - ruler.carWidth)) + ruler.carWidth / 2) + 'px';
                enemy.className = 'car';
                randomCar(enemy);


            }
        });
    }

    function getQuantityElements(heightElement) {
        return document.documentElement.clientHeight / heightElement + 1;
    }

    function startRun(event) {
        if (!controlKeys.includes(event.key)) {
            event.preventDefault();
            keys[event.key] = true;
        }

    }

    function stopRun(event) {
        event.preventDefault();
        keys[event.key] = false;

    }

    function randomCar(enemy) {
        enemy.className = 'car';
        enemy.classList.add('car__enemy');
        let n = Math.floor(Math.random() * 5);
        console.log(n);
        switch (Math.floor(Math.random() * 5)) {

            case 1:
                enemy.classList.add('car__enemy-one');
                break;

            case 2:
                enemy.classList.add('car__enemy-two');
                break;

            case 3:
                enemy.classList.add('car__enemy-three');
                break;

            case 4:
                enemy.classList.add('car__enemy-four');
                break;

            case 5:
                enemy.classList.add('car__enemy-five');
                break;

        }
    }
});