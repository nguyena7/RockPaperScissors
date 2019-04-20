// CACHING THE DOM - storing these elements for use in the program
// instead of having to do function calls repeatedly.
var userScore = 0;
var compScore = 0;
var handler_r = null;
var handler_p = null;
var handler_r = null;
const max_score = 5;
const userScore_span = document.getElementById("user-score");
const compScore_span = document.getElementById("comp-score");
const scoreBoard_div = document.querySelector(".scoreboard");
const results_div = document.querySelector(".results > p");
const gameOver_p = document.getElementById("game-over");
const gameOver_a = document.getElementById("game-over-link");
const choice_div = document.querySelector(".choice");
const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");
const actionMessage_p = document.getElementById("action-message");
const instructions_div = document.querySelector(".instructions");
const restart_div = document.querySelector(".restart");

function getCompChoice(){
	const choices = ["r", "p", "s"];
	const rng = Math.floor(Math.random() * 3);

	return choices[rng];
}

function win(userChoice, compChoice){
	userScore++;
	userScore_span.innerHTML = userScore;
	compScore_span.innerHTML = compScore;
	results_div.innerHTML = `${convertChoice(userChoice)}  beats  ${convertChoice(compChoice)}. You Win!`;
}

function lose(userChoice, compChoice){
	compScore++;
	userScore_span.innerHTML = userScore;
	compScore_span.innerHTML = compScore;
	results_div.innerHTML = `${convertChoice(userChoice)} beats ${convertChoice(compChoice)}. You Lose!`;
}

function tie(userChoice, compChoice){
	results_div.innerHTML = `You both picked ${convertChoice(userChoice)}. Tie game.`;
}

function convertChoice(choice){
	switch(choice){
		case "r": return "Rock";
		case "p": return "Paper";
		case "s": return "Scissors";
	}	
}

function gameOver(userScore, compScore){
	if(userScore > compScore){
		gameOver_a.innerHTML = `You WON. CLICK HERE TO CLAIM YOUR PRIZE!!`;
	}else{
		gameOver_a.removeAttribute("href");
		gameOver_a.innerHTML = `You LOST. YOU SUCK`;
	}

	gameOver_p.style.display = "block";
	restart_div.style.display = "block";
	rock_div.style.display = "none";
	paper_div.style.display = "none";
	scissors_div.style.display = "none";
	actionMessage_p.style.display = "none";

	restart_div.addEventListener("click", function(){
		restart_game();
	})
}

function restart_game(){
	gameOver_p.style.display = "none";
	restart_div.style.display = "none";
	rock_div.style.display = "inline-block";
	paper_div.style.display = "inline-block";
	scissors_div.style.display = "inline-block";
	actionMessage_p.style.display = "block";
	gameOver_a.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
	results_div.innerHTML = "Click on one of the choices.";

	userScore = 0;
	compScore = 0;
	userScore_span.innerHTML = userScore;
	compScore_span.innerHTML = compScore;
}

function game(userChoice){
	const compChoice = getCompChoice();
	switch(userChoice + compChoice){
		case "rs":
		case "pr":
		case "sp":
			win(userChoice, compChoice);
			break;
		case "rp":
		case "ps":
		case "sr":
			lose(userChoice, compChoice);
			break;
		default:
			tie(userChoice, compChoice);
			break;
	}

	if(userScore == max_score || compScore == max_score){
		gameOver(userScore, compScore);
	}
}

function main(){
	instructions_div.innerHTML = `First to ${max_score} wins!`;

	var handler_r = function(){
		game("r");
	}

	var handler_p = function(){
		game("p");
	}

	var handler_s = function(){
		game("s");
	}

	rock_div.addEventListener('click', handler_r);

	paper_div.addEventListener('click', handler_p);

	scissors_div.addEventListener('click', handler_s);
}

main();