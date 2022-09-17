const inputs = document.getElementsByClassName("input");
const print = document.getElementById("print");
const pvc = document.getElementById("pvc");

window.addEventListener("keyup", e => {
    var key = parseInt(e.key);
    inputs[key - 1].click();
});

// 0 = 0
// 1 = x
var flag = 1;
var isPVC = false;
var user1 = "X", user2 = "O";
print.innerText = "Player " + (flag === 0 ? 'O' : "X") + " Turn"

pvc.addEventListener("click", e => {
    if (isPVC === true) {
        pvc.innerText = "Play With Computer"
        isPVC = false;
    } else {
        pvc.innerText = "Play Manually"
        isPVC = true;
    }
    store();
})

window.addEventListener("load", e => {
    flag = parseInt(localStorage.getItem("flag"));
    isPVC = (localStorage.getItem("isPVC") === 'true');

    if (isPVC === false) {
        pvc.innerText = "Play With Computer"
    } else {
        pvc.innerText = "Playing With Computer"
    }

    const order = JSON.parse(localStorage.getItem("order"));

    for (i = 0; i < inputs.length; i++) {
        inputs[i].value = order[i];
    }

    isNotStarted = order.every(elem => {
        if (elem === "") {
            return true;
        }
    })
    if (!isNotStarted) {
        pvc.disabled = true;
    }

    var matched = check();

    if (!matched) {
        print.innerText = "Player " + (flag === 0 ? 'O' : "X") + " Turn"
    } else {
        print.innerText = "Player " + (flag === 1 ? 'O' : "X") + " has won"

        for (i = 0; i < inputs.length; i++) {
            inputs[i].style.pointerEvents = "none"
        }
    }

})

function getOrder() {
    const order = [];
    for (i = 0; i < inputs.length; i++) {
        order.push(inputs[i].value)
    }
    return order;
}

for (i = 0; i < inputs.length; i++) {

    inputs[i].addEventListener("click", e => {
        e.preventDefault();
        e.target.style.pointerEvents = "none"
        pvc.disabled = true;

        if (e.target.value) {
            return;
        } else {
            if (flag === 0) {
                e.target.value = user2;
                flag = 1
            } else {
                e.target.value = user1;
                flag = 0
            }
        }

        var matched = check();

        const order = getOrder();
        isFilled = order.every(elem => {
            if (elem !== "") {
                return true;
            }
        })

        if (!matched) {
            if (isFilled) {
                print.innerText = "The Match tie"
            } else {
                print.innerText = "Player " + (flag === 0 ? 'O' : "X") + " Turn"

                console.log(isPVC && flag === 0);
                if (isPVC && flag === 0) {
                    var emptySlots = []
                    for (i = 0; i < inputs.length; i++) {
                        if (inputs[i].value === "") emptySlots.push(inputs[i]);
                    }
                    const random = Math.floor(Math.random() * emptySlots.length); // 0 - 9
                    emptySlots[random].click();
                }
            }

        } else {
            print.innerText = "Player " + (flag === 1 ? 'O' : "X") + " has won"

            for (i = 0; i < inputs.length; i++) {
                inputs[i].style.pointerEvents = "none"
            }
        }
        store()
    });

}

win = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],

    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],

    [1, 5, 9],
    [3, 5, 7]
];

function check() {
    for (let i = 0; i < win.length; i++) {
        let pos = win[i];
        var a = inputs[pos[0] - 1].value;
        var b = inputs[pos[1] - 1].value;
        var c = inputs[pos[2] - 1].value;

        if (a === b && a === c && a !== '') {
            return true;
        }
    };
}

document.getElementById("reset").addEventListener("click", e => {
    for (i = 0; i < inputs.length; i++) {
        inputs[i].value = "";
        inputs[i].style.pointerEvents = "inherit"
    }
    flag = 1;
    isPVC = false;
    pvc.disabled = false;
    print.innerText = "Player " + (flag === 0 ? 'O' : "X") + " Turn"
    store()
})

function store() {
    localStorage.setItem("flag", flag.toString());
    localStorage.setItem("isPVC", isPVC.toString());

    const order = [];
    for (i = 0; i < inputs.length; i++) {
        order.push(inputs[i].value)
    }
    localStorage.setItem("order", JSON.stringify(order));
}


