export let init = () => {
    initDom();
    initCalc();
}

let initDom = () => {
    // * Design
    let video = document.createElement('video')
    video.src = "./public/video/matrix.mp4";
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.id = 'video';
    video.playbackRate = "5";
    // **********************
    let maindiv = document.createElement('div');
    maindiv.id = "calculette";
    let divRes = document.createElement('input')
    divRes.id = "resultat";
    let divTouches = document.createElement('div');
    divTouches.id = "touches";
    let touches = ["0", "1", "2", "+", "3", "4", "5", "-", "6", "7", "8", "*", "9", ".", "c", "/", "="]
    touches.forEach((element, i) => {
        let button;
        button = document.createElement('button');
        button.id = `boutton${i}`;
        button.innerHTML = element;
        button.className = "bouttons";
        divTouches.appendChild(button);
    })
    maindiv.appendChild(divRes);
    maindiv.appendChild(divTouches);
    document.body.appendChild(maindiv);
    // import Design
    document.body.appendChild(video);
}

let initCalc = () => {
    let touches = Array.from(document.querySelector('#calculette > #touches').children)
    let displayResult = document.querySelector('#resultat')
    let numberABF = ["", "", ""] // [chiffre1, chiffre2, operateur]
    let lastTouche;

    let calculer = (lastTouche) => {
        // ? touche "="
        if (lastTouche == "=" && numberABF[0] != "" && numberABF[1] != "" && numberABF[2] != "") {
            switch (numberABF[2]) {
                case "+":
                    numberABF[0] = +numberABF[0] + +numberABF[1]
                    break;

                case "-":
                    numberABF[0] = +numberABF[0] - +numberABF[1]
                    break;

                case "*":
                    numberABF[0] = +numberABF[0] * +numberABF[1]
                    break;

                case "/":
                    numberABF[0] = +numberABF[0] / +numberABF[1]
                    break;
            }
            numberABF[0] = numberABF[0].toString()
            numberABF[1] = "";
            numberABF[2] = "";
            displayResult.value = numberABF[0]
        }
        // ? touche "c"
        if (lastTouche == 'c') {
            numberABF = ["", "", ""]
            displayResult.value = ""
        }


        // ? premier chiffre
        if (lastTouche != "+" &&
            lastTouche != "*" &&
            lastTouche != "/" &&
            lastTouche != "=" &&
            lastTouche != "c" &&
            numberABF[1] == "" &&
            numberABF[2] == "") {

            if (lastTouche == "-" && numberABF[0].length == 0) {
                numberABF[0] += lastTouche
                displayResult.value = numberABF[0]
            }

            if (lastTouche != "-") {

                if (lastTouche == "." && /./.test(numberABF[0]) == false) {
                    numberABF[0] += lastTouche
                    displayResult.value = numberABF[0]
                }

                if (lastTouche != ".") {
                    numberABF[0] += lastTouche
                    displayResult.value = numberABF[0]
                }
            }
        }

        // ? Deuxieme chiffre
        if (numberABF[0] != "" &&
            numberABF[2] != "" &&
            lastTouche != "+" &&
            lastTouche != "*" &&
            lastTouche != "/" &&
            lastTouche != "=" &&
            lastTouche != "c") {

            if (lastTouche == "-" && numberABF[1].length == 0) {
                numberABF[1] += lastTouche
                displayResult.value = numberABF[1]
            }

            if (lastTouche != "-") {

                if (lastTouche == "." && /./.test(numberABF[1]) == false) {
                    numberABF[1] += lastTouche
                    displayResult.value = numberABF[1]
                }

                if (lastTouche != ".") {
                    numberABF[1] += lastTouche
                    displayResult.value = numberABF[1]
                }
            }
        }

        // ? operateur
        if (numberABF[0] != "" && /[0-9]/.test(numberABF[0]) == true && (lastTouche == "+" || lastTouche == "-" || lastTouche == "*" || lastTouche == "/")) {
            switch (lastTouche) {
                case "+":
                    numberABF[2] = "+"
                    break;

                case "-":
                    numberABF[2] = "-"
                    break;

                case "*":
                    numberABF[2] = "*"
                    break;

                case "/":
                    numberABF[2] = "/"
                    break;
            }
            displayResult.value = ""
        }

    }

    touches.forEach(el => {
        el.addEventListener("click", eventMouse => {
            lastTouche = eventMouse.target.innerHTML;
            calculer(lastTouche);
            console.log(`arrType: 0: ${typeof numberABF[0]}, 1: ${typeof numberABF[1]}, 2: ${typeof numberABF[2]}`);
            console.log(`arrValue: ${numberABF[0]}, ${numberABF[1]}, ${numberABF[2]}`);
        })
    })

    document.body.addEventListener('keydown', eventKey => {
        lastTouche = eventKey.key;
        calculer(lastTouche);
        console.log(`arrType: 0: ${typeof numberABF[0]}, 1: ${typeof numberABF[1]}, 2: ${typeof numberABF[2]}`);
        console.log(`arrValue: ${numberABF[0]}, ${numberABF[1]}, ${numberABF[2]}`);
    })

}