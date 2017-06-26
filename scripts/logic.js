var colors = ["red","#49C549","blue"];
var text = ["Red","Green","Blue"];
var lcolor, ltext, rcolor, rtext;
var lhsElem, rhsElem, image = document.getElementById("sign");
var count,correct,success,counter,fac=0;
count = correct = incorrect = 0,i=-1;
var pattern = [];
var duration = 61;
var limit = parseInt((Math.random())*3)+2;
var yes_button = document.getElementById("yes-btn");
var no_button = document.getElementById("no-btn");
var greenImagePath = "../images/s.png";
var redImagePath = "../images/n.png";

function genElements()
{
  ++fac;
  lcolor = parseInt((Math.random())*3);
  ltext = parseInt((Math.random())*3);
  rcolor = parseInt((Math.random())*3);
  rtext = parseInt((Math.random())*3);
  if(fac == limit)
  {
    rcolor = ltext;
    fac = 0;
  }
  if(rcolor == rtext && lcolor == ltext && lcolor == rcolor)
  {
    if(lcolor == 0)
      rcolor = parseInt((Math.random())*2)+1;
    else
      rcolor = lcolor - 1;
  }
  lhsElem = document.getElementById("lhs-color");
  rhsElem = document.getElementById("rhs-color");
  lhsElem.innerHTML = text[ltext];
  rhsElem.innerHTML = text[rtext];
  lhsElem.style.color=colors[lcolor];
  rhsElem.style.color=colors[rcolor];
}

function processAns(elm)
{
  function incrementScore(){
    image.src = greenImagePath;
    ++correct;
  }

  function decrementScore(){
    image.src = redImagePath;
    --correct;
  }

  ++count;
  var eid = elm.id;
  pattern[++i] = eid;
  if(ltext==rcolor)
  {
    if(eid=="yes-btn")
    {
      incrementScore();
    }

    else
    {
      decrementScore();
    }

  }
  else
  {
    if(eid=="no-btn")
    {
      incrementScore();
    }
    else
    {
      decrementScore();
    }
  }
  genElements();
}

function startActivity()
{
  counter = duration;
  setInterval(function () {--counter; document.getElementById("timer-value").innerHTML = "Seconds left : "+counter;}, 1000);
  document.getElementById("start").style.display = "none";
  document.getElementById("timer").style.display = "block";
  document.getElementById("sign").style.display = "block";
  document.getElementById("snbut").style.display = "block";
  $(".color-block").show(function(){
    $(".custom-buttons").on('click',function(event)
    {
      processAns(event.target);
    });
  });
  count = correct = incorrect = 0;
  myVar = setTimeout(function(){  genResults(); },(duration*1000));
  makeRed = setTimeout(function(){  $("#timer-value").css("color","red"); },((duration - 10)*1000));
  genElements();
}

function genResults()
{
  success = ((correct/count)*100).toFixed(2);
  if(count==0||correct<1)
    success = 0;
  assignResultsToLocalStorage();
  window.location.assign("../views/result.html");
}

function assignResultsToLocalStorage()
{
  localStorage.setItem('count',count);
  localStorage.setItem('score',correct);
  localStorage.setItem('accuracy',success);
  return;
}

function hideTimer()
{
  document.getElementById("timer").style.display = "none";
  document.getElementById("sign").style.display = "none";
  document.getElementById("snbut").style.display = "none";
  $(".color-block").hide();
}

document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 37:
    no_button.click();
    break;
    case 39:
    yes_button.click();
    break;
  }
};

function writeResults()
{
  var attempts = document.getElementById("attempts").innerHTML;
  var score = document.getElementById("score").innerHTML;
  var accuracy = document.getElementById("accuracy").innerHTML;
  document.getElementById("attempts").innerHTML = attempts + localStorage.getItem('count');
  document.getElementById("score").innerHTML = score + localStorage.getItem('score');
  document.getElementById("accuracy").innerHTML = accuracy + localStorage.getItem("accuracy");
}

$("#homeLink").on('click',function(event)
{
  if(counter > 0 && counter < duration)
  {
    event.preventDefault();
    var exit = confirm("Game in progress. Want to exit ?");
    if(exit)
    {
      window.location.assign("../index.html");
    }
  }
});
