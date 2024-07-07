const player1 = {
    NAME: "Mario",
    SPEED: 4,
    MANEUVERABILITY: 3,
    POWER: 3,
    POINTS: 0,
};

const player2 = {
    NAME: "luigi",
    SPEED: 3,
    MANEUVERABILITY: 4,
    POWER: 4,
    POINTS: 0,
};

async function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock(){
    let random = Math.random()
    let result

    switch (true) {
        case random < 0.33:
            result = "Straight"
            break;
        case random < 0.66:
            result = "Curve"
            break;
        default:
            result = "Challenge"
        break
    }

    return result;
}

async function logRollResult(characterName, block, diceResult, attribute){
    console.log(`${characterName} rolled a ${block} dice -> ${diceResult} + ${attribute} = ${diceResult + attribute}`)
}

async function playRaceEngine(character1, character2){
    for (let round = 1; round <= 5; round++) {
        console.log(`Round ${round}`);
        let block = await getRandomBlock();
        console.log(`Block: ${block}`)

        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        let totalTestSkill1 = 0;
        let totalTestSkill2 = 0;

        if (block === "Straight") {
            totalTestSkill1 = diceResult1 + character1.SPEED;
            totalTestSkill2 = diceResult2 + character2.SPEED;

            await logRollResult(character1.NAME, block, diceResult1, character2.SPEED);
            await logRollResult(character2.NAME, block, diceResult2, character2.SPEED);
        }

        if (block === "Curve") {
            totalTestSkill1 = diceResult1 + character1.MANEUVERABILITY;
            totalTestSkill2 = diceResult2 + character2.MANEUVERABILITY;

            await logRollResult(character1.NAME, block, diceResult1, character1.MANEUVERABILITY);
            await logRollResult(character2.NAME, block, diceResult2, character2.MANEUVERABILITY);
        }

        if (block === "Challenge") {
            let powerResult1 = diceResult1 + character1.POWER;
            let powerResult2 = diceResult2 + character2.POWER;

            console.log(`${character1.NAME} challenged ${character2.NAME}!`)
            await logRollResult(character1.NAME, block, diceResult1, character1.POWER);
            await logRollResult(character2.NAME, block, diceResult2, character2.POWER);

            character2.POINTS -= powerResult1 > powerResult2 && character2.POINTS > 0 ? 1 : 0;
            character1.POINTS -= powerResult2 > powerResult1 && character1.POINTS > 0 ? 1 : 0;

            if (powerResult1 > powerResult2) {
                console.log(`${character1.NAME} won the race! ${character2.NAME} lose 1 point}`);
            } else if (powerResult1 > powerResult2) {
                console.log(`${character2.NAME} won the race! ${character1.NAME} lose 1 point}`);
            } else {
                console.log(powerResult1 === powerResult2 ? "Tied race! No one scores." : "");
            }
        }

        //Identify the Winner
        if (totalTestSkill1 > totalTestSkill2) {
            character1.POINTS++;
            console.log(`${character1.NAME } scored 1 point!`);
        } else if (totalTestSkill1 < totalTestSkill2) {
            character2.POINTS++;
            console.log(`${character2.NAME } scored 1 point!`);
        }
        console.log("----------------------")
    }
}

async function declareWinner(character1, character2) {
    console.log("Final Result");
    console.log(`${character1.NAME}: ${character1.POINTS} points`);
    console.log(`${character2.NAME}: ${character2.POINTS} points`);

    if (character1.POINTS > character2.POINTS) {
        console.log(`\n ${character1.NAME} won the chalenge!!!}`)
    } else if (character1.POINTS < character2.POINTS) {
        console.log(`\n ${character2.NAME} won the chalenge!!!}`)
    } else {
        console.log("Tied Race!");
    }
}

(async function main() {
    console.log(
        `Race between ${player1.NAME} and ${player2.NAME} starting...\n`
    );

    await playRaceEngine(player1, player2)

    await declareWinner(player1, player2);

})()

