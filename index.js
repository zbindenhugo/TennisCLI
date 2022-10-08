#!/usr/bin/env node

import inquirer from "inquirer";
import chalk from 'chalk';
import { exit } from "process";

class Player {
    constructor(name, score, sets){
        this.name = name;
        this.score = score;
        this.sets = sets;
    }
}

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms))

let action = 'score';

let p1 = new Player('', 0, [0, 0, 0]);
let p2 = new Player('', 0, [0, 0, 0]); 

let setId = 0;

async function getFirstPlayersName(){
    const question = await inquirer.prompt({
        name: "name",
        type: "input",
        message: "Quel est le nom du premier Tennisman ? ",
        default(){
            return 'Toto';
        }
    })

    p1.name = question.name;
}

async function getSecondPlayerName(){
    const question = await inquirer.prompt({
        name: "name",
        type: "input",
        message: "Quel est le nom du deuxième Tennisman ? ",
        default(){
            return 'Tata';
        }
    })

    p2.name = question.name;
}

async function showScore(){
    console.log(
        `${p1.name} : [${p1.sets[0]}] | [${p1.sets[1]}] | [${p1.sets[2]}] -- ${p1.score}` + '\n' 
        + `${p2.name} : [${p2.sets[0]}] | [${p2.sets[1]}] | [${p2.sets[2]}] -- ${p2.score}`
    )
}

async function main(){
    while(action !== "quitter"){
        switch(action){
            case 'score':
                await showScore();
                await askUser();
                break;
            case 'p1' : 
                // TODO DECOUPER EN PLUSIEURS FONCTIONs
                await addPlayerOnePoint();
                await showScore();
                await checkVictory();
                await askUser();
                break;
            case 'p2' : 
                // TODO DECOUPER EN PLUSIEURS FONCTIONs
                await addPlayerTwoPoint();
                await showScore();
                await checkVictory();
                await askUser();
                break;
            case 'reset':
                p1 = new Player('', 0, [0, 0, 0]);
                p2 = new Player('', 0, [0, 0, 0]);
                await beginGame();
                action = 'score';
                break;
            default:
                break;
        }
    }
}

async function askUser(){
    const userChoice = await inquirer.prompt({
        type: 'list',
        name: 'choice',
        message: "Quelle est la future action ? ",
        choices: [
            'score',
            'p1',
            'p2',
            'reset',
            'quitter'
        ]
    })
    action = userChoice.choice
}

async function addPlayerOnePoint(){
    switch (p1.score){
        case 0:
            p1.score = 15;
            break;
        case 15 :
            p1.score = 30;
            break
        case 30 :
            p1.score = 40;
            break;
        case 40 :
            if(p2.score === 'Av'){
                p2.score = 40;
            } else if(p2.score === 40) {
                p1.score = 'Av';
            } else {
                await AddSetPlayerOnePoint();
            }
            break;
        case 'Av':
            await AddSetPlayerOnePoint();
            break;

    }
}

async function addPlayerTwoPoint(){
    switch (p2.score){
        case 0:
            p2.score = 15;
            break;
        case 15 :
            p2.score = 30;
            break
        case 30 :
            p2.score = 40;
            break;
        case 40 :
            if(p1.score === 'Av'){
                p1.score = 40;
            } else if(p1.score === 40) {
                p2.score = 'Av';
            } else {
                await AddSetPlayerTwoPoint();
            }
            break;
        case 'Av':
            await AddSetPlayerTwoPoint();
            break;

    }
}

async function AddSetPlayerOnePoint(){
    p1.sets[setId] += 1;
    if(p1.sets[setId] === 6){
        setId += 1;
    }

    p1.score = 0;
    p2.score = 0;
}

async function AddSetPlayerTwoPoint(){
    p2.sets[setId] += 1;
    if(p2.sets[setId] === 6){
        setId += 1;
    }

    p1.score = 0;
    p2.score = 0;
}

async function checkVictory(){
    if(setId === 2){
        if((p1.sets[0] === 6 && p1.sets[1] === 6) | (p1.sets[0] === 6 && p1.sets[2] === 6) | (p1.sets[1] === 6 && p1.sets[2] === 6)){
            console.log(chalk.bgGreen(`Le gagnant de cette partie est ${p1.name}`));
            process.exit();
        }

        if((p2.sets[0] === 6 && p2.sets[1] === 6) | (p2.sets[0] === 6 && p2.sets[2] === 6) | (p2.sets[1] === 6 && p2.sets[2] === 6)){
            console.log(chalk.bgGreen(`Le gagnant de cette partie est ${p2.name}`));
            process.exit();
        }
    }
}

async function beginGame(){
    await getFirstPlayersName();
    await getSecondPlayerName();
}

await beginGame();

await main();