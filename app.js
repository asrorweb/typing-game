// html
let outgoing_word_toHtml = document.querySelector(".random_word"),
    input_word_fromHtml = document.querySelector(".input_text"),
    score_user = document.querySelector(".score"),
    minut = document.querySelector(".minut"),
    second = document.querySelector(".second"),
    game_over_div = document.querySelector(".game_over"),
    restart_game = document.querySelector(".restart_game"),
    body_img = document.querySelector(".body-bg"),
    select = document.querySelector(".select-uroven"),
    start_game = document.querySelector(".start_game");

let newGame = false;
let randomWordGlobals;
let word_array = [];
let level_of_difficulty;

input_word_fromHtml.disabled = true;

level_of_difficulty = localStorage.getItem("select_logalStorage")
    ? localStorage.getItem("select_logalStorage")
    : 5;

select.value = level_of_difficulty;

select.addEventListener("change", () => {
    localStorage.setItem("select_logalStorage", select.value);
    level_of_difficulty = Number(localStorage.getItem("select_logalStorage"));
});
let time = 10;
start_game.addEventListener("click", () => {
    newGame = true;
    input_word_fromHtml.disabled = false;
    start_game.disabled = true;

    if (newGame) {
        update_words();

        time = 10;

        let minuttime = 0;
        let new_word = "";

        input_word_fromHtml.addEventListener("input", (e) => {
            if (e.data == null) {
                if (new_word.length > input_word_fromHtml.value.length) {
                    new_word = new_word.substring(0, new_word.length - 1);
                }
            } else {
                if (new_word.length < word_array.length) {
                    new_word =
                        new_word +
                        word_array[input_word_fromHtml.value.length - 1];
                }
            }

            wordColorChange(new_word);

            // qachonki kiritilgan malumot to'g'ri bo'lsa ishlaydi
            if (input_word_fromHtml.value == randomWordGlobals) {
                new_word = "";
                input_word_fromHtml.value = "";

                update_words();

                time += Number(level_of_difficulty);
                console.log("time", time);

                score_user.textContent = `${
                    Number(score_user.textContent) + 1
                }`;

                if (time >= 60) {
                    time = time - 60;
                    minuttime++;
                    minut.textContent =
                        minuttime >= 10 ? minuttime : `0${minuttime}`;
                }
            }
        });

        const interval = setInterval(() => {
            time--;
            if (time == 0 && Number(minut.textContent) != 0) {
                time = 59;
                minuttime--;
                minut.textContent =
                    minuttime >= 10 ? minuttime : `0${minuttime}`;
            } else if (time == 0 && minuttime == 0) {
                clearInterval(interval);
                newGame = false;
                game_over_div.style.display = "block";
            }
            second.textContent = time >= 10 ? time : `0${time}`;
        }, 1000);
    }
});

restart_game.addEventListener("click", restartGame);

// function
function wordColorChange(word) {
    if (input_word_fromHtml.value == word) {
        input_word_fromHtml.style.color = "green";
    } else {
        input_word_fromHtml.style.color = "red";
    }
}

// ubdate words
function update_words() {
    let random_number = Math.floor(Math.random() * words.length);
    outgoing_word_toHtml.textContent = words[random_number];
    randomWordGlobals = words[random_number];
    word_array = randomWordGlobals.split("");
}

function restartGame() {
    game_over_div.style.display = "none";
    start_game.disabled = false;
    input_word_fromHtml.disabled = true;
    newGame = false;
    outgoing_word_toHtml.textContent = "write this word";
    score_user.textContent = "0";
    input_word_fromHtml.value = "";
    second.textContent = "10";
    time = 10;
}
