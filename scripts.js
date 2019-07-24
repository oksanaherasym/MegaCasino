'use strict';

class User {

  constructor(name, moneyAmount) {
    this.name = name;
    this.moneyAmount = moneyAmount;
  }

  play(betAmount, gamemachine){
  	if(this.moneyAmount < betAmount){
  		alert("You do NOT have " + betAmount + "$ anymore.");
  		return;
  	}
  	
  	this.moneyAmount = this.moneyAmount - betAmount;
  	
    var win = gamemachine.playRound(betAmount); 
    this.moneyAmount = this.moneyAmount + win;
  }
    
}

class GameMachine{
    constructor(moneyAmount){
        this.moneyAmount= moneyAmount;
    }
    
    getMoney(){
        return this.moneyAmount;
    }
    
    takeMoney(takeMoneyAmount){
        if(this.moneyAmount < takeAmount){
			alert("GameMachine does NOT have " + takeAmount + "$.");
			return;
		}

		this.moneyAmount = this.moneyAmount - takeAmount;
	}
    
    giveMoney(giveAmount){
        this.moneyAmount = this.moneyAmount + giveAmount;    
    }
    
    playRound(betAmount){
		var randomNumber = Math.floor(Math.random() * (1000 - 100)) + 100;
		var randomNumberStr = randomNumber.toString();

		if(randomNumberStr[0] == randomNumberStr[1] || randomNumberStr[0] == randomNumberStr[2] ||randomNumberStr[1] == randomNumberStr[2])
		{

			var doubleBetAmount = betAmount*2;

			if(this.moneyAmount < doubleBetAmount){
				alert("GameMachine does NOT have " + doubleBetAmount + "$.");
			}

			this.moneyAmount = this.moneyAmount - doubleBetAmount;
			return doubleBetAmount;
		}

		if(randomNumberStr[0] == randomNumberStr[1] && randomNumberStr[1] == randomNumberStr[2])
		{

			var tripleBetAmount = betAmount*3;

			if(this.moneyAmount < tripleBetAmount)
			{
				alert("GameMachine does NOT have " + tripleBetAmount + "$.");
			}

			this.moneyAmount = this.moneyAmount - tripleBetAmount;
			return tripleBetAmount;
		}

		return 0;
	}
}    

class Casino{
    constructor(name){
        this.name = name;
        this.gameMachines = [];
    }
    
    addGameMachine(gameMachine){
		this.gameMachines.push(gameMachine);
	}
    
    getCasinoMoney(){
        if(this.gameMachines.length === 0)
			return 0;

		var sum = 0;

		for (var i = 0; i < this.gameMachines.length; i++) {
			var machineAmount = this.gameMachines[i].getMoney();
			sum = sum + machineAmount;
		}

		return sum;
	}

	getMachineCount(){
		return this.gameMachines.length;
	}
}

class SuperAdmin extends User{
	constructor(name, moneyAmount){
		super(name,moneyAmount);
		this.myCasino = null;
	}

	createCasino(casinoName){
		this.myCasino = new Casino(casinoName);
	}

	createGameMachine(){
		if(this.myCasino != "undefined"){
            var amountForGameMachine = this.moneyAmount/10;
			var gm = new GameMachine(amountForGameMachine);
			this.myCasino.addGameMachine(gm);
            
            this.moneyAmount = this.moneyAmount - amountForGameMachine;
		}
	}

	takeMoneyFromCasino(moneyAmount){
        if(this.myCasino != null && this.myCasino.gameMachines.length > 0){
            this.myCasino.gameMachines.sort(function (a, b) {
                return a.getMoney() - b.getMoney();
            });
        }
	}

	putMoneyToCasino(moneyAmount){
		// put money amount to some of the game machines
        if(this.myCasino != null && this.myCasino.gameMachines.length > 0){
            this.myCasino.gameMachines[0].giveMoney(moneyAmount);
        }
	}

	deleteGameMachine(index){
        if(this.myCasino.gameMachines.length >= index + 1 || index < 0){
            var machineMoney = this.myCasino.gameMachines[index].getMoney();

            var count = this.myCasino.gameMachines.length - 1;

            var moneyForEachMachine = machineMoney/count;

            this.myCasino.gameMachines.splice(index,1);

            for(var i = 0; i < this.myCasino.gameMachines.length; i++){
                this.myCasino.gameMachines[i].giveMoney(moneyForEachMachine);
            }
        }
        else{
            alert("Machine with this index does not exist.");
        }
	}
}

var superMan = new SuperAdmin('SuperMan', 10000);
superMan.createCasino('SuperCasino');
superMan.createGameMachine();
superMan.createGameMachine();
superMan.createGameMachine();
console.log(superMan);

superMan.putMoneyToCasino(1000);
superMan.deleteGameMachine(0);
console.log(superMan);