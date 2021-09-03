/*$(document).ready(function(){
   $('#fill').hide().delay(400).fadeIn(300); 
});*/

var colors = ["#00bfff","#0080ff","#8533ff","#0080ff"];
var parentEl = document.getElementById("elements");

for (i = 0; i < 3; i++) {
    var elem = "<div class=els id=n"+(i+1)+" style=background:"+colors[i]+"><div class=number>"+(i+1)+"</div><div class=cancel><i class=icon-cancel></i></div><input type=text class=things><div class=clear></div></div>";
    $(parentEl).append(elem);
}

$( "#elements" ).on("mouseover",".els", function() {
    $( this ).find( ".number" ).hide();
    $( this ).find( ".cancel" ).show();
  });

$( "#elements" ).on("mouseout",".els", function() {
    $( this ).find( ".number" ).show();
    $( this ).find( ".cancel" ).hide();
  });

var allInputs = document.getElementsByClassName("things");
var inputsNumber = allInputs.length;
var color = 3;
//var y = allInputs[inputsNumber-1].addEventListener("focus", add);
$('.things:last-of-type').on('focus', add);

var y = document.addEventListener('keydown', function (event) {if (event.keyCode === 13) choose();})

function add(){
    var x = document.addEventListener("keydown", function(event) {
        if (event.keyCode === 9 && document.activeElement==allInputs[inputsNumber-1]) {
            var parent = document.getElementById("elements");
            var howmany = parent.childElementCount;
            var input = document.createElement("div");
            input.classList.add("els");
            input.id = "n"+(howmany+1);
            input.style.background = colors[color];
            input.innerHTML = "<div class=number>"+(howmany+1)+"</div><div class=cancel><i class=icon-cancel></i></div><input type=text class=things><div class=clear></div>";
            $('#elements').append(input);
            $(input).hide().fadeIn(150);
            $('.things:last-child').focus();
            if(color==3) color=0;
            else color++;
            inputsNumber++;
        }
      });
}

function add2() {
    var parent = document.getElementById("elements");
    var howmany = parent.childElementCount;
    var input = document.createElement("div");
    input.classList.add("els");
    input.id = "n"+(howmany+1);
    input.style.background = colors[color];
    input.innerHTML = "<div class=number>"+(howmany+1)+"</div><div class=cancel><i class=icon-cancel></i></div><input type=text class=things><div class=clear></div>";
    $('#elements').append(input);
    $(input).hide().fadeIn(150);
    $('.things:last-child').focus();
    if(color==3) color=0;
    else color++;
    inputsNumber++;
    add();
}

$('#new').on('click', add2);

$(document).on('click','.cancel', function(){
    $(this).parent().remove();
    inputsNumber = allInputs.length;
    renumber();
});

function renumber(){
    var childs = document.getElementById("elements").childElementCount;

    for (var i = 0; i < childs; i++) {
        document.getElementsByClassName('number')[i].innerHTML = i+1;
        document.getElementsByClassName('els')[i].id = "n"+(i+1);
    }
}

$('#button').on('click', choose);

function choose(){
    var ile = document.getElementById("elements").children.length;
    var pula = new Array();
    var to = ile-1;

    for(var j=0; j<=to; j++)
    {
        pula[j] = document.getElementsByClassName("things")[j].value;
    }

    function none(value){
        return value!='';
    }

    pula2 = pula.filter(none);

    var he = pula2.length;

    if (he<2) swal("Not enough!", "Type at least 2 options.","info");
    else{
    
        var w = Math.floor(Math.random() * he);
        //console.log(w);

        document.getElementById("winner").innerHTML = pula2[w];
        $('#result').hide().fadeIn(300);
        
        if (ile>4) {
            $('html, body').animate({
                scrollTop: ($('.els:last-child').offset().top)
            },500);
        }
    }
}