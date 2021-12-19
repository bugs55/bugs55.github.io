const colors = ["#00bfff","#0080ff","#8533ff","#0080ff"]; //colors pattern
const parentEl = document.getElementById("elements");

//create first 3 elements
for (let i = 0; i < 3; i++) {
    const elem = `<div class=els id=n${i+1} style=background:${colors[i]}><div class=number>${i+1}</div><div class=cancel><i class=icon-cancel></i></div><input type=text class=things><div class=clear></div></div>`;
    $(parentEl).append(elem);
}

//aniamtions
$( "#elements" ).on("mouseover",".els", function() {
    $( this ).find( ".number" ).hide();
    $( this ).find( ".cancel" ).show();
  });

$( "#elements" ).on("mouseout",".els", function() {
    $( this ).find( ".number" ).show();
    $( this ).find( ".cancel" ).hide();
  });

//some variables for creating new elements
const allInputs = document.getElementsByClassName("things");
let inputsNumber = allInputs.length;
let color = 3;
$('.things:last-of-type').on('focus', add);

//if you press enter call function choose
const y = document.addEventListener('keydown', (event) => {if (event.keyCode === 13) choose();})

//adding element process
const addElement = () => {
    const parent = document.getElementById("elements");
    const howmany = parent.childElementCount;
    const input = document.createElement("div");
    input.innerHTML = `<div class=els id=n${howmany+1} style=background:${colors[color]}><div class=number>${howmany+1}</div><div class=cancel><i class=icon-cancel></i></div><input type=text class=things><div class=clear></div></div>`;
    $('#elements').append(input);
    $(input).hide().fadeIn(150);
    $('.things:last-child').focus();
    if(color===3) color=0;
    else color++;
    inputsNumber++;
}

//add element if you press tab in last element
function add(){
    const x = document.addEventListener("keydown", (event) => {
        if (event.keyCode === 9 && document.activeElement==allInputs[inputsNumber-1]) addElement();
      });
}

//add element
function add2() {
    addElement();
    add();
}

//add element on click
$('#new').on('click', add2);

//remove element on click element .cancel
$(document).on('click','.cancel', function(){
    $(this).parent().remove();
    inputsNumber = allInputs.length;
    renumber();
});

//renumber after removing
const renumber = () => {
    const childs = document.getElementById("elements").childElementCount;

    for (let i = 0; i < childs; i++) {
        document.getElementsByClassName('number')[i].innerHTML = i+1;
        document.getElementsByClassName('els')[i].id = "n"+(i+1);
    }
}

//call choose function on click
$('#button').on('click', choose);

//lottery machine mechanism
function choose(){
    let ile = document.getElementById("elements").children.length;
    let pula = [];
    let to = ile-1;

    for(let j=0; j<=to; j++)
    {
        pula[j] = document.getElementsByClassName("things")[j].value;
    }

    function none(value){
        return value!='';
    }

    pula2 = pula.filter(none);

    const he = pula2.length;

    if (he<2) swal("Not enough!", "Type at least 2 options.","info");
    else{
    
        const w = Math.floor(Math.random() * he);

        document.getElementById("winner").innerHTML = pula2[w];
        $('#result').hide().fadeIn(300);
        
        if (ile>4) {
            $('html, body').animate({
                scrollTop: ($('.els:last-child').offset().top)
            },500);
        }
    }
}