
var MoneyGenerator = function(control, options) {

    var display = createMoneyDisplay(),
    moneyTemp = [20, 50, 500, 100, 1000, 200, 500, 1000],
    index = 0,

    moneyPool = [],
    isRunning = false,

    turn = new Audio('media/coin.wav'),
    congrats = new Audio('media/cheers.wav'),
    interval;

    options = options || {};
    options.delay = options.delay || 100;

    // initialize
    createToggle();
    init();

    // private functions
    function createMoneyDisplay() {
        var img = document.createElement("img");
        img.src = "assets/php1000.jpg";

        // Append
        var container = control.getElementsByClassName("container")[0];
        container.appendChild(img);

        return img;
    }

    function createToggle() {
        control.addEventListener("click", function(event) {
            start();
            event.preventDefault();
        });

        // Create a keyboad shortcut
        const SPACEBAR = 32;
        window.addEventListener("keydown", function(event) {
            if (event.which == SPACEBAR || event.keyCode == SPACEBAR) {
                start();
            }
        });
    }

    function start() {
        if (!isRunning) {
            control.classList.remove("win");
            interval = setInterval(update, options.delay);
        } else {
            shuffle();
            clearInterval(interval);
            pick();
        }
        isRunning = !isRunning;
    }

    function init() {
        for (var i=0; i<1; i++)
            moneyPool.push(1000)

        for (var i=0; i<2; i++)
            moneyPool.push(500)

        for (var i=0; i<3; i++)
            moneyPool.push(200)

        for (var i=0; i<5; i++)
            moneyPool.push(100)

        for (var i=0; i<20; i++)
            moneyPool.push(50)

        for (var i=0; i<69; i++)
            moneyPool.push(20)
    }

    function update() {
        turn.play();
        index++;
        render(index % moneyTemp.length);
    }

    function render(idx) {
        switch (moneyTemp[idx]) {
            case 20:
                imgSrc = "assets/php20.jpg";
                break;
            case 50:
                imgSrc = "assets/php50.jpg";
                break;
            case 100:
                imgSrc = "assets/php100.jpg";
                break;
            case 200:
                imgSrc = "assets/php200.jpg";
                break;
            case 500:
                imgSrc = "assets/php500.jpg";
                break;
            case 1000:
                imgSrc = "assets/php1000.jpg";
                break;
            default:
                imgSrc = "assets/php1000.jpg";
        }
        display.src = imgSrc;
    }

    function pick() {
        switch (moneyPool[0]) {
            case 20:
                imgSrc = "assets/php20.jpg";
                break;
            case 50:
                imgSrc = "assets/php50.jpg";
                break;
            case 100:
                imgSrc = "assets/php100.jpg";
                break;
            case 200:
                imgSrc = "assets/php200.jpg";
                break;
            case 500:
                imgSrc = "assets/php500.jpg";
                break;
            case 1000:
                imgSrc = "assets/php1000.jpg";
                break;
            default:
                imgSrc = "assets/php20.jpg";
        }
        display.src = imgSrc;

        control.classList.toggle("win");
        congrats.play();
    }

    function shuffle() {
        var currentIndex = moneyPool.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            temporaryValue = moneyPool[currentIndex];
            moneyPool[currentIndex] = moneyPool[randomIndex];
            moneyPool[randomIndex] = temporaryValue;
        }
    }

    // public API
    this.start  = start;
};
