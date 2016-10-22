var cardsLeftSide =[];
var cardsRightSide =[];
var playCards=0;
var modeBools=[buildLeftBool=false,buildRightBool=false,eraseCardsBool=false,playCardsBool=false];

function sort(buttonImg)
{
	if(modeBools[0] == true)
		{
			buildLeftStuff(buttonImg);
		}
	if(modeBools[1] == true)
		{
			buildRightStuff(buttonImg);
		}
	if(modeBools[3] == true)
		{
			playStuff(buttonImg);
		}
}

function buildLeftStuff(imgId)
{
	var newCard = document.createElement("img");
	newCard.src = imgId + ".jpg";
	cardsLeftSide.push(newCard);
	cardsLeftSide[cardsLeftSide.length-1].id = "createdLeftCard"+cardsLeftSide.length;
	cardsLeftSide[cardsLeftSide.length-1].style.position = "absolute";
	cardsLeftSide[cardsLeftSide.length-1].style.width =70;
	cardsLeftSide[cardsLeftSide.length-1].style.height =53;
	alignCards();
	document.body.appendChild(cardsLeftSide[cardsLeftSide.length-1]);
	cardsLeftSide[cardsLeftSide.length-1].addEventListener("click",eraseLeftStuff);
}

function buildRightStuff(imgId)
{
	var newCard = document.createElement("img");
	newCard.src = imgId + ".jpg";
	cardsRightSide.push(newCard);
	cardsRightSide[cardsRightSide.length-1].id = "createdRightCard"+cardsRightSide.length;
	cardsRightSide[cardsRightSide.length-1].style.position = "absolute";
	cardsRightSide[cardsRightSide.length-1].style.width =70;
	cardsRightSide[cardsRightSide.length-1].style.height =53;
	alignCards();
	document.body.appendChild(cardsRightSide[cardsRightSide.length-1]);
	cardsRightSide[cardsRightSide.length-1].addEventListener("click",eraseRightStuff);
}

function playStuff(imgId)
{
	playCards += 1;
	var newPlayCardLeft = document.createElement("img");
	newPlayCardLeft.src = imgId + ".jpg";
	newPlayCardLeft.id = "playCard";
	newPlayCardLeft.style.position = "absolute";
	newPlayCardLeft.style.width = 70;
	newPlayCardLeft.style.top=400;
	newPlayCardLeft.style.left = 30 + 70*playCards-70;
	document.body.appendChild(newPlayCardLeft);
	newPlayCardLeft.addEventListener("click",erasePlayedStuff);
	
	var newPlayCardRight = document.createElement("img");
	newPlayCardRight.src = imgId + ".jpg";
	newPlayCardRight.id = "playCard";
	newPlayCardRight.style.position = "absolute";
	newPlayCardRight.style.width = 70;
	newPlayCardRight.style.top = 400;
	newPlayCardRight.style.left = 600 + 70*playCards;
	document.body.appendChild(newPlayCardRight);
	newPlayCardRight.addEventListener("click",erasePlayedStuff);
}

function eraseLeftStuff(cardId)
{
	if(modeBools[2] == true)
		{
			document.body.removeChild(cardId.target);
			cardsLeftSide.splice(parseInt(cardId.target.style.left)/70,1);
			alignCards();
		}
		
}

function eraseRightStuff(cardId)
{
	if(modeBools[2] == true)
		{
			document.body.removeChild(cardId.target);
			var equatedImgEdge = parseInt(document.getElementById("equated").style.left)+70;
			var targetImgEdge = parseInt(cardId.target.style.left);
			cardsRightSide.splice((targetImgEdge-equatedImgEdge)/70,1);
			alignCards();
		}
		
}

function erasePlayedStuff(cardId)
{
	if(modeBools[2] == true)
		{
			for(var i=0;i<2*playCards;i++)
			{
				document.body.removeChild(document.getElementById(cardId.target.id));
			}
		playCards = 0;
		}
}

function pickMode(modeId)
{
	var modeIds =["buildLeft","buildRight","eraseCards","playCards"];
	for(var i=0;i<4;i++)
		{
			if(modeIds[i] == modeId)
				{
					var activeMode = document.getElementById(modeIds[i]);
					activeMode.src = "radioOn.png";
					modeBools[i] = true;
				}else{
					var inactiveMode = document.getElementById(modeIds[i]);
					inactiveMode.src = "radioOff.png";
					modeBools[i] = false;
				}
		}
	showParentheses();
}
function showParentheses()
{
	if(modeBools[3]==true || modeBools[2]==true)
		{
			document.getElementById("openParenthGhost1").style.opacity =1;
			document.getElementById("openParenthGhost2").style.opacity =1;
			document.getElementById("closeParenthGhost1").style.opacity =1;
			document.getElementById("closeParenthGhost2").style.opacity =1;
			document.getElementById("openParenthGhost2").style.left = parseInt(cardsRightSide[0].style.left)-5;
			document.getElementById("closeParenthGhost1").style.left = parseInt(cardsLeftSide[cardsLeftSide.length-1].style.left)+45;
			document.getElementById("closeParenthGhost2").style.left = parseInt(cardsRightSide[cardsRightSide.length-1].style.left)+45;
		}else{
			document.getElementById("openParenthGhost1").style.opacity =0;
			document.getElementById("openParenthGhost2").style.opacity =0;
			document.getElementById("closeParenthGhost1").style.opacity =0;
			document.getElementById("closeParenthGhost2").style.opacity =0;
		}
}

function alignCards()
{
	for(var i=0,u=cardsLeftSide.length;i<u;i++)
		{
			cardsLeftSide[i].style.left = 70*i;
		}
	document.getElementById("equated").style.left = 70*cardsLeftSide.length;
	for(var q=0,w=cardsRightSide.length;q<w;q++)
		{
			var equalsSign = document.getElementById("equated");
			cardsRightSide[q].style.left = 70*(q+1) + parseInt(equalsSign.style.left);
		}
	showParentheses();
}