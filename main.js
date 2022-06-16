var lastUpdate = Date.now();
var TIER_NAMES = [ null, "first", "second", "third", "fourth", "fifth", "sixth"];
var div = 8;
var player = {
	gold: new Decimal(0),
	speed: new Decimal(0.1),
	maxSpeed: new Decimal(299792458),
	
	repair: new Decimal(0),
	repairCost: new Decimal(1),
	repairBought: new Decimal(0),
	imp14: new Decimal(1),
	
	fix: new Decimal(1),
	fixCost: new Decimal(10),
	fixBought: new Decimal(0),
	
	patch: new Decimal(0),
	patchCost: new Decimal(1000),
	patchBought: new Decimal(0),
	
	correct: new Decimal(1),
	correctCost: new Decimal(1e5),
	correctBought: new Decimal(0),
	
	recover: new Decimal(1),
	recoverCost: new Decimal(1e8),
	recoverBought: new Decimal(0),
	
	hasUnlockedBreak: false,
	hasUnlockedImprove: false,
	hasUnlockedImproveUpgrades: false,
	hasUnlockedAutobuyers: false,
	
	breakPoints: new Decimal(0),
	
	speedBoost: new Decimal(0),
	speedBoostEffect: new Decimal(1),
	
	firstSpeedGeneratorCost: new Decimal(1),
	firstSpeedGeneratorAmount: new Decimal(0),
	firstSpeedGeneratorBought: new Decimal(0),
	firstSpeedGeneratorMult: new Decimal(1),
	firstSpeedGeneratorMultFinal: new Decimal(1),
	
	secondSpeedGeneratorCost: new Decimal(10),
	secondSpeedGeneratorAmount: new Decimal(0),
	secondSpeedGeneratorBought: new Decimal(0),
	secondSpeedGeneratorMult: new Decimal(1),
	secondSpeedGeneratorMultFinal: new Decimal(1),
	
	thirdSpeedGeneratorCost: new Decimal(1000),
	thirdSpeedGeneratorAmount: new Decimal(0),
	thirdSpeedGeneratorBought: new Decimal(0),
	thirdSpeedGeneratorMult: new Decimal(1),
	thirdSpeedGeneratorMultFinal: new Decimal(1),
	
	fourthSpeedGeneratorCost: new Decimal(1e6),
	fourthSpeedGeneratorAmount: new Decimal(0),
	fourthSpeedGeneratorBought: new Decimal(0),
	fourthSpeedGeneratorMult: new Decimal(1),
	fourthSpeedGeneratorMultFinal: new Decimal(1),
	
	fifthSpeedGeneratorCost: new Decimal(1e10),
	fifthSpeedGeneratorAmount: new Decimal(0),
	fifthSpeedGeneratorBought: new Decimal(0),
	fifthSpeedGeneratorMult: new Decimal(1),
	fifthSpeedGeneratorMultFinal: new Decimal(1),
	
	sixthSpeedGeneratorCost: new Decimal(1e15),
	sixthSpeedGeneratorAmount: new Decimal(0),
	sixthSpeedGeneratorBought: new Decimal(0),
	sixthSpeedGeneratorMult: new Decimal(1),
	sixthSpeedGeneratorMultFinal: new Decimal(1),
	
	hasBoughtImp1: false,
	hasBoughtImp2: false,
	hasBoughtImp3: false,
	hasBoughtImp4: false,
	hasBoughtImp5: false,
	hasBoughtImp6: false,
	hasBoughtImp7: false,
	hasBoughtImp8: false,
	hasBoughtImp9: false,
	hasBoughtImp10: false,
	hasBoughtImp11: false,
	hasBoughtImp12: false,
	hasBoughtImp13: false,
	hasBoughtImp14: false,
	hasBoughtImp15: false,
	hasBoughtImp16: false,
	
	repairAutobuyerChecked: false,
	fixAutobuyerChecked: false,
	patchAutobuyerChecked: false,
	correctAutobuyerChecked: false,
	generatorAutobuyerChecked: false,
	recoverAutobuyerChecked: false
}

var tempPlayer = player;

load();

Object.assign(tempPlayer, player);

player = tempPlayer;

function save() {
    localStorage.lightSpeed = btoa(JSON.stringify(player));
}

function load() {
    if (!localStorage.lightSpeed) return;
    player = JSON.parse(atob(localStorage.lightSpeed));

    transformToDecimal(player)
}

function transformToDecimal(object) { 
    for (i in object) {
        if (typeof(object[i]) == "string" && !isNaN(new Decimal(object[i]).mag)) object[i] = new Decimal(object[i]); 
        if (typeof(object[i]) == "object") transformToDecimal(object[i]) 
    }
}

function format(amount, i){
	let power = Decimal.floor(Decimal.log10(amount));
	let mantissa = amount.div(Decimal.pow(10, power));
	
	let power2 = Decimal.floor(Decimal.log10(power));
	let mantissa2 = power.div(Decimal.pow(10, power2));
	
	let power3 = Decimal.floor(Decimal.log10(power2));
	let mantissa3 = power2.div(Decimal.pow(10, power3));
	
	if (amount == 0) return "0"
	if (power < 4) return amount.toFixed(i);
	if (power < 1000000) return mantissa.toFixed(2) + "e" + power;
	if (power2 < 1000000) return "e" + mantissa2.toFixed(3) + "e" + power2;
	return "ee" + mantissa3.toFixed(3) + "e" + power3;
}

function getLoop(){
	if ((player.speed.lt(player.maxSpeed)) || player.hasUnlockedImproveUpgrades == true){
			player.speed = (new Decimal(0.1).plus(player.repair.plus(player.patch))).times(player.fix).times(player.correct).times(player.recover).times(player.speedBoostEffect).times(player.imp14);
	}
	else {
		player.speed = player.maxSpeed;
	}
	
	if (player.hasBoughtImp14 == true){
		player.imp14 = Decimal.pow(1.5, player.repairBought);
	}
	
	if (player.hasBoughtImp7 == false){
		player.correct = (Decimal.log(player.gold, 50)).pow(player.correctBought);
	}
	else player.correct = (Decimal.log(player.gold, 30)).pow(player.correctBought);
	
	player.recover = ((Decimal.log(player.breakPoints, 10)).pow(player.recoverBought)).plus(1);
	
	player.firstSpeedGeneratorMultFinal = player.firstSpeedGeneratorMult;
	player.secondSpeedGeneratorMultFinal = player.secondSpeedGeneratorMult;
	player.thirdSpeedGeneratorMultFinal = player.thirdSpeedGeneratorMult;
	player.fourthSpeedGeneratorMultFinal = player.fourthSpeedGeneratorMult;
	player.fifthSpeedGeneratorMultFinal = player.fifthSpeedGeneratorMult;
	player.sixthSpeedGeneratorMultFinal = player.sixthSpeedGeneratorMult;
	
	if (player.hasBoughtImp16 == true){
		player.speedBoostEffect = (player.speedBoost.pow(2)).plus(1);
	}
	else if (player.hasBoughtImp9 == true) {
		player.speedBoostEffect = player.speedBoost.plus(1);
	}
	else {
		player.speedBoostEffect = (Decimal.root(player.speedBoost, 3)).plus(1);
	}
	
	if (player.hasBoughtImp16 == true){
		div = 5;
	}
	else if (player.hasBoughtImp15 == true){
		div = 6;
	}
}

function buyUpgrade(x){
	if (x == 1){
		if (player.gold.gte(player.repairCost)){
			var scale = new Decimal(0);
			if (player.repairBought.gte(75)){
				scale = (Decimal.pow(player.repairBought, 2)).div(5625);
			}
			player.gold = player.gold.minus(player.repairCost);
			player.repairCost = player.repairCost.times(scale.plus(1.3));
			if (player.hasBoughtImp1 == false){
				player.repair = player.repair.plus(0.1);
			}
			else player.repair = player.repair.plus(1);
			player.repairBought = player.repairBought.plus(1);
		}
	}
	if (x == 2){
		if (player.gold.gte(player.fixCost)){
			var scale = new Decimal(0);
			if (player.fixBought.gte(16)){
				scale = (Decimal.pow(player.fixBought, 2)).div(256);
			}
			player.gold = player.gold.minus(player.fixCost);
			player.fixCost = player.fixCost.times(scale.plus(3));
			if (player.hasBoughtImp3 == false){
				player.fix = player.fix.times(2);
			}
			else player.fix = player.fix.times(3);
			player.fixBought = player.fixBought.plus(1);
		}
	}
	if (x == 3){
		if (player.gold.gte(player.patchCost)){
			var scale = new Decimal(0);
			if (player.patchBought.gte(4)){
				scale = (Decimal.pow(player.patchBought, 2)).div(16);
			}
			player.gold = player.gold.minus(player.patchCost);
			player.patchCost = player.patchCost.times(scale.plus(50));
			player.patchBought = player.patchBought.plus(1);
		}
	}
	if (x == 4){
		if (player.gold.gte(player.correctCost)){
			var scale = new Decimal(0);
			if (player.correctBought.gte(3)){
				scale = player.correctBought.div(30);
			}
			player.gold = player.gold.minus(player.correctCost);
			player.correctCost = player.correctCost.pow(scale.plus(1.2));
			player.correctBought = player.correctBought.plus(1);
		}
	}
	if (x == 5){
		if (player.gold.gte(player.recoverCost)){
			player.gold = player.gold.minus(player.recoverCost);
			player.recoverCost = player.recoverCost.pow((player.recoverBought.div(50)).plus(1));
			player.recoverBought = player.recoverBought.plus(1);
		}
	}
}

function breakSOL(){
	if (player.speed.gte(player.maxSpeed)){
		//var div = 8;
		player.breakPoints = player.breakPoints.plus(Decimal.floor((Decimal.pow(10, Decimal.log10(player.speed).div(div))).div(10)));
		
		
		player.gold = new Decimal(0);
		player.speed = new Decimal(0.1);

		player.repair = new Decimal(0);
		player.repairCost = new Decimal(1);
		player.repairBought = new Decimal(0);

		player.fix = new Decimal(1);
		player.fixCost = new Decimal(10);
		player.fixBought = new Decimal(0);

		player.patch = new Decimal(0);
		player.patchCost = new Decimal(1000);
		player.patchBought = new Decimal(0);

		player.correct = new Decimal(1);
		player.correctCost = new Decimal(1e5);
		player.correctBought = new Decimal(0);
		
		player.recover = new Decimal(1);
		player.recoverCost = new Decimal(1e8);
		player.recoverBought = new Decimal(0);
	}
}

function unlockImproveUps(){
	player.hasUnlockedImproveUpgrades = true;
}

function buyImproveUpgrades(x){
	if ((x == 1) && player.hasBoughtImp1 == false){
		if (player.breakPoints.gte(25)){
			player.breakPoints = player.breakPoints.minus(25);
			player.hasBoughtImp1 = true;
		}
	}
	if ((x == 2) && player.hasBoughtImp2 == false){
		if (player.breakPoints.gte(100)){
			player.breakPoints = player.breakPoints.minus(100);
			player.hasBoughtImp2 = true;
			player.hasUnlockedAutobuyers = true;
		}
	}
	if ((x == 3) && player.hasBoughtImp3 == false){
		if (player.breakPoints.gte(500)){
			player.breakPoints = player.breakPoints.minus(500);
			player.hasBoughtImp3 = true;
		}
	}
	if ((x == 4) && player.hasBoughtImp4 == false){
		if (player.breakPoints.gte(5e4)){
			player.breakPoints = player.breakPoints.minus(5e4);
			player.hasBoughtImp4 = true;
		}
	}
	if ((x == 5) && player.hasBoughtImp5 == false){
		if (player.breakPoints.gte(1e5)){
			player.breakPoints = player.breakPoints.minus(1e5);
			player.hasBoughtImp5 = true;
		}
	}
	if ((x == 6) && player.hasBoughtImp6 == false){
		if (player.breakPoints.gte(5e5)){
			player.breakPoints = player.breakPoints.minus(5e5);
			player.hasBoughtImp6 = true;
		}
	}
	if ((x == 7) && player.hasBoughtImp7 == false){
		if (player.breakPoints.gte(1e6)){
			player.breakPoints = player.breakPoints.minus(1e6);
			player.hasBoughtImp7 = true;
		}
	}
	if ((x == 8) && player.hasBoughtImp8 == false){
		if (player.breakPoints.gte(5e6)){
			player.breakPoints = player.breakPoints.minus(5e6);
			player.hasBoughtImp8 = true;
		}
	}
	if ((x == 9) && player.hasBoughtImp9 == false){
		if (player.breakPoints.gte(1e7)){
			player.breakPoints = player.breakPoints.minus(1e7);
			player.hasBoughtImp9 = true;
		}
	}
	if ((x == 10) && player.hasBoughtImp10 == false){
		if (player.breakPoints.gte(1e10)){
			player.breakPoints = player.breakPoints.minus(1e10);
			player.hasBoughtImp10 = true;
		}
	}
	if ((x == 11) && player.hasBoughtImp11 == false){
		if (player.breakPoints.gte(1e12)){
			player.breakPoints = player.breakPoints.minus(1e12);
			player.hasBoughtImp11 = true;
		}
	}
	if ((x == 12) && player.hasBoughtImp12 == false){
		if (player.breakPoints.gte(1e14)){
			player.breakPoints = player.breakPoints.minus(1e14);
			player.hasBoughtImp12 = true;
		}
	}
	if ((x == 13) && player.hasBoughtImp13 == false){
		if (player.breakPoints.gte(1e20)){
			player.breakPoints = player.breakPoints.minus(1e20);
			player.hasBoughtImp13 = true;
		}
	}
	if ((x == 14) && player.hasBoughtImp14 == false){
		if (player.breakPoints.gte(1e21)){
			player.breakPoints = player.breakPoints.minus(1e21);
			player.hasBoughtImp14 = true;
		}
	}
	if ((x == 15) && player.hasBoughtImp15 == false){
		if (player.breakPoints.gte(1e39)){
			player.breakPoints = player.breakPoints.minus(1e39);
			player.hasBoughtImp15 = true;
		}
	}
	if ((x == 16) && player.hasBoughtImp16 == false){
		if (player.breakPoints.gte(1e63)){
			player.breakPoints = player.breakPoints.minus(1e63);
			player.hasBoughtImp16 = true;
			alert("恭喜!! 你通关了!");
		}
	}
}

function buyGenerator(tier){
	let name = TIER_NAMES[tier];
	if (player.breakPoints.gte(player[name + "SpeedGeneratorCost"])){
		player.breakPoints = player.breakPoints.minus(player[name + "SpeedGeneratorCost"]);
		player[name + "SpeedGeneratorCost"] = player[name + "SpeedGeneratorCost"].times(Decimal.pow(3, tier));
		player[name + "SpeedGeneratorBought"] = player[name + "SpeedGeneratorBought"].plus(1);
		player[name + "SpeedGeneratorAmount"] = player[name + "SpeedGeneratorAmount"].plus(1);
		player[name + "SpeedGeneratorMult"] = player[name + "SpeedGeneratorMult"].times(2);
	}
}

document.getElementById("autoRepairCheck").checked = player.repairAutobuyerChecked;
document.getElementById("autoFixCheck").checked = player.fixAutobuyerChecked;
document.getElementById("autoPatchCheck").checked = player.patchAutobuyerChecked;
document.getElementById("autoCorrectCheck").checked = player.correctAutobuyerChecked;
document.getElementById("autoGeneratorCheck").checked = player.generatorAutobuyerChecked;
document.getElementById("autoRecoverCheck").checked = player.recoverAutobuyerChecked;

function autobuy(){
	if (document.getElementById("autoRepairCheck").checked == true && player.hasBoughtImp2 == true){
		buyUpgrade(1);
		player.repairAutobuyerChecked = true;
	}
	else player.repairAutobuyerChecked = false;
	
	if (document.getElementById("autoFixCheck").checked == true && player.hasBoughtImp4 == true){
		buyUpgrade(2);
		player.fixAutobuyerChecked = true;
	}
	else player.fixAutobuyerChecked = false;
	
	if (document.getElementById("autoPatchCheck").checked == true && player.hasBoughtImp6 == true){
		buyUpgrade(3);
		player.patchAutobuyerChecked = true;
	}
	else player.patchAutobuyerChecked = false;
	
	if (document.getElementById("autoCorrectCheck").checked == true && player.hasBoughtImp8 == true){
		buyUpgrade(4);
		player.correctAutobuyerChecked = true;
	}
	else player.correctAutobuyerChecked = false;
	
	if (document.getElementById("autoGeneratorCheck").checked == true && player.hasBoughtImp11 == true){
		for (let tier = 1; tier < 7; tier++){
			buyGenerator(tier);
		}
		player.generatorAutobuyerChecked = true;
	}
	else player.generatorAutobuyerChecked = false;
	
	if (document.getElementById("autoRecoverCheck").checked == true && player.hasBoughtImp13 == true){
		buyUpgrade(5);
		player.recoverAutobuyerChecked = true;
	}
	else player.recoverAutobuyerChecked = false;
}

function updateUI(){
	document.getElementById("distance").textContent = "You have traveled " + format(player.gold, 2) + " Meters";
	document.getElementById("speed").textContent = "The Speed of Light is  " + format(player.speed, 2) + " Meters Per Second";
	
	document.getElementById("repairCost").textContent = "Cost: " + format(player.repairCost, 2) + " Meters";
	if (player.hasBoughtImp1 == true){
		document.getElementById("repairEffect").textContent = "SOL is 1 Meters/s faster";
	}
	document.getElementById("fixCost").textContent = "Cost: " + format(player.fixCost, 2) + " Meters";
	if (player.hasBoughtImp3 == true){
		document.getElementById("fixEffect").textContent = "SOL is 3x faster";
	}
	document.getElementById("patchCost").textContent = "Cost: " + format(player.patchCost, 2) + " Meters";
	if (player.hasBoughtImp5 == true){
		document.getElementById("patchEffect").textContent = "SOL is 0.1 Meters/s/s faster";
	}
	document.getElementById("correctCost").textContent = "Cost: " + format(player.correctCost, 2) + " Meters";
	if (player.hasBoughtImp7 == true){
		document.getElementById("correctEffect").textContent = "SOL is log30(Meters)x faster";
	}
	document.getElementById("recoverCost").textContent = "Cost: " + format(player.recoverCost, 2) + " Meters";
	
	//var div = 8;
	document.getElementById("break").textContent = "Break the SOL for " + format(Decimal.floor((Decimal.pow(10, Decimal.log10(player.speed).div(div))).div(10)), 0) + " Break Points"; 
	
	document.getElementById("breakPoints").textContent = "You have " + format(player.breakPoints, 0) + " Break Points";
	document.getElementById("breakPoints2").textContent = "You have " + format(player.breakPoints, 0) + " Break Points";
	document.getElementById("speedBoost").textContent = "You have " + format(player.speedBoost, 2) + " Speed Boost boosting SOL by " + format(player.speedBoostEffect, 2) + "x";
	document.getElementById("speedBoostPerSec").textContent = "You get " + format(new Decimal(player.firstSpeedGeneratorAmount.times(player.firstSpeedGeneratorMultFinal)), 2) + " Speed Boost/s";
	
	for (tier = 1; tier < 7; tier++){
		let name = TIER_NAMES[tier];
		let amount = player[name + "SpeedGeneratorAmount"];
		let mult = player[name + "SpeedGeneratorMult"];
		let cost = player[name + "SpeedGeneratorCost"];
		
		document.getElementById("speedGeneratorAmount" + tier).textContent = "Amount: " + format(amount, 0);
		document.getElementById("speedGeneratorMult" + tier).textContent = "Multiplier: " + format(mult, 0) + "x";
		document.getElementById("speedGeneratorCost" + tier).textContent = "Cost: " + format(cost, 0) + " BP";
	}
	
	if (player.repairBought.lt(1)){
		document.getElementById("fix").classList.add("locked");
	}
	else document.getElementById("fix").classList.remove("locked");
	
	if (player.fixBought.lt(1)){
		document.getElementById("patch").classList.add("locked");
	}
	else document.getElementById("patch").classList.remove("locked");
	
	if (player.patchBought.lt(1)){
		document.getElementById("correct").classList.add("locked");
	}
	else document.getElementById("correct").classList.remove("locked");
	
	if (player.hasBoughtImp12 == false){
		document.getElementById("recover").classList.add("locked");
	}
	else document.getElementById("recover").classList.remove("locked");
	
	if (player.firstSpeedGeneratorBought.lt(1)){
		document.getElementById("speedGenerator2").classList.add("locked");
	}
	else document.getElementById("speedGenerator2").classList.remove("locked");
	
	if (player.secondSpeedGeneratorBought.lt(1)){
		document.getElementById("speedGenerator3").classList.add("locked");
	}
	else document.getElementById("speedGenerator3").classList.remove("locked");
	
	if (player.thirdSpeedGeneratorBought.lt(1)){
		document.getElementById("speedGenerator4").classList.add("locked");
	}
	else document.getElementById("speedGenerator4").classList.remove("locked");
	
	if (player.fourthSpeedGeneratorBought.lt(1)){
		document.getElementById("speedGenerator5").classList.add("locked");
	}
	else document.getElementById("speedGenerator5").classList.remove("locked");
	
	if (player.fifthSpeedGeneratorBought.lt(1)){
		document.getElementById("speedGenerator6").classList.add("locked");
	}
	else document.getElementById("speedGenerator6").classList.remove("locked");
	
	//var div = 8;
	if ((player.speed.lt(player.maxSpeed)) && player.hasUnlockedImproveUpgrades == false){
		document.getElementById("break").classList.add("locked");
	}
	else if ((Decimal.floor((Decimal.pow(10, Decimal.log10(player.speed).div(div))).div(10))).lt(1)){
		document.getElementById("break").classList.add("locked");
	}
	else {
		document.getElementById("break").classList.remove("locked");
	}
	
	if (player.hasUnlockedImproveUpgrades == false){
		for (i = 1; i < 17; i++){
			document.getElementById("improveUpgrade" + i).classList.add("locked");
		}
		document.getElementById("improve").classList.remove("locked");
	}
	else{
		for (i = 1; i < 17; i++){
			document.getElementById("improveUpgrade" + i).classList.remove("locked");
		}
		document.getElementById("improve").classList.add("locked");
	}
	
	for (i = 1; i < 17; i++){
		if (player["hasBoughtImp" + i] == true){
			document.getElementById("improveUpgrade" + i).classList.add("bought");
		}
	}
	
	if (player.hasBoughtImp2 == false){
		document.getElementById("autoRepair").classList.add("locked");
	}
	else {
		document.getElementById("autoRepair").classList.remove("locked");
	}
	
	if (player.hasBoughtImp4 == false){
		document.getElementById("autoFix").classList.add("locked");
	}
	else {
		document.getElementById("autoFix").classList.remove("locked");
	}
	
	if (player.hasBoughtImp6 == false){
		document.getElementById("autoPatch").classList.add("locked");
	}
	else {
		document.getElementById("autoPatch").classList.remove("locked");
	}
	
	if (player.hasBoughtImp8 == false){
		document.getElementById("autoCorrect").classList.add("locked");
	}
	else {
		document.getElementById("autoCorrect").classList.remove("locked");
	}
	
	if (player.hasBoughtImp11 == false){
		document.getElementById("autoGenerator").classList.add("locked");
	}
	else {
		document.getElementById("autoGenerator").classList.remove("locked");
	}
	
	if (player.hasBoughtImp13 == false){
		document.getElementById("autoRecover").classList.add("locked");
	}
	else {
		document.getElementById("autoRecover").classList.remove("locked");
	}
	
	if (player.hasUnlockedBreak == false){
		document.getElementById("tab1").classList.add("locked");
	}
	else document.getElementById("tab1").classList.remove("locked");
	
	if (player.hasUnlockedImprove == false){
		document.getElementById("tab2").classList.add("locked");
	}
	else document.getElementById("tab2").classList.remove("locked");
	
	if (player.hasUnlockedAutobuyers == false){
		document.getElementById("tab3").classList.add("locked");
	}
	else document.getElementById("tab3").classList.remove("locked");
	
	if (player.breakPoints.gt(0)){
		player.hasUnlockedBreak = true;
	}
	
	if (player.secondSpeedGeneratorBought.gt(0)){
		player.hasUnlockedImprove = true;
	}
}

var tabButtons = document.querySelectorAll(".buttonContainer button");
var tabPanels = document.querySelectorAll(".tabPanel");

function showPanel(panelIndex, colorCode){
	tabButtons.forEach(function(node){
		node.style.borderColor = "lightgray";
	});
	
	tabButtons[panelIndex].style.borderColor=colorCode;
	tabPanels.forEach(function(node){
		node.style.display = "none";
	});
	
	tabPanels[panelIndex].style.display="grid";
}

showPanel(0, 'black');

function productionLoop(diff){
	player.gold = player.gold.plus(player.speed.times(diff));
	
	if (player.hasBoughtImp5 == false){
		player.patch = player.patch.plus(player.patchBought.times(0.01).times(diff));
	}
	else player.patch = player.patch.plus(player.patchBought.times(0.1).times(diff));
	
	player.speedBoost = player.speedBoost.plus(player.firstSpeedGeneratorAmount.times(player.firstSpeedGeneratorMultFinal).times(diff));
	for (tier = 2; tier < 7; tier++){
		player[TIER_NAMES[tier - 1] + "SpeedGeneratorAmount"] = player[TIER_NAMES[tier - 1] + "SpeedGeneratorAmount"].plus(player[TIER_NAMES[tier] + "SpeedGeneratorAmount"].times(player[TIER_NAMES[tier] + "SpeedGeneratorMultFinal"].times((diff))));
	}
	
	if (player.hasBoughtImp10 == true){
		player.breakPoints = player.breakPoints.plus((Decimal.floor((Decimal.pow(10, Decimal.log10(player.speed).div(div))).div(10))).times(diff));
	}
}

function mainLoop(){
	diff = (Date.now() - lastUpdate) / 1000;
	getLoop();
	productionLoop(diff);
	updateUI();
	autobuy();
	lastUpdate = Date.now(); 
}

setInterval(mainLoop, 50);

setInterval(save, 5000);

updateUI();



/*






*/







