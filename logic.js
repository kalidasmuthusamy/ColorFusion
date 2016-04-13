var colors = ["red","#49C549","blue"];
var text = ["Red","Green","Blue"];
var lcolor, ltext, rcolor, rtext;
var lhsElem, rhsElem, image = document.getElementById("sign");
var count,correct,success,fac=0,yes=0,no=0;
count = correct = incorrect = 0,i=-1;
var pattern = [];
var counter = 61;
var limit = parseInt((Math.random())*3)+2;
var yes_button = document.getElementById("yes");
var no_button = document.getElementById("no");

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
  lhsElem = document.getElementById("lhs");
  rhsElem = document.getElementById("rhs");
  lhsElem.innerHTML = text[ltext];
  rhsElem.innerHTML = text[rtext];
  lhsElem.style.color=colors[lcolor];
  rhsElem.style.color=colors[rcolor];
}

function processAns(elm)
{
  ++count;
  var eid = elm.id;
  pattern[++i] = eid;
  if(ltext==rcolor)
  {
    if(eid=="yes")
    {
      image.src = "s.png";
      ++correct;              ++yes;
      console.log("yes");
    }

    else
    {
      image.src = "n.png";
      --correct;            ++no;
      console.log("no");
    }

  }
  else
  {
    if(eid=="no")
    {
      image.src = "s.png";
      ++correct;          ++no;
      console.log("no");
    }
    else
    {
      image.src = "n.png";
      --correct;                 ++yes;
      console.log("yes");
    }
  }
  genElements();
}

function startActivity()
{
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
  myVar = setTimeout(function(){  genResults(); },61000);
  makeRed = setTimeout(function(){  $("#timer-value").css("color","red"); },51000);
  genElements();
}

function genResults()
{
  success = ((correct/count)*100).toFixed(2);
  if(count==0||correct<1)
    success = 0;
  assignResultsTolocalStorage();
  window.location.assign("result.html");
}

function assignResultsTolocalStorage()
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
  if(counter > 0 && counter < 61)
  {
    event.preventDefault();
    var exit = confirm("Game in progress. Want to exit ?");
    if(exit)
    {
      window.location.assign("index.html");
    }
  }
});