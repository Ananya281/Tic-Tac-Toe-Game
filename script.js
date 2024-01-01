let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector("#reset");
let newgamebtn=document.querySelector(".new");
let msgcontainer=document.querySelector(".msg-container");
let msg=document.querySelector(".msg");

let turnO=true;
let count=0;

//winning pattern define in 2d array
const winpatterns=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetgame=() =>{
    turnO=true;
    enableboxes();
    msgcontainer.classList.add("hide");
};

const disableboxes=() =>{
    for(let box of boxes){
        box.disabled=true;
    }
};

const enableboxes=() =>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
        box.style.boxShadow="0 0 1rem white";
    }
};


const drawfunction=() =>{
    msg.innerText=`The Game is Tie this time
                            
                         Play Again`;
    msgcontainer.classList.remove("hide");
    count=0;
    disableboxes();
};

//event listener at every box
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(!checkwinner()){
             //if turnO is true
            if(turnO){
                //playerO
                box.innerText="O";
                box.style.color="blue"
                box.style.boxShadow="0 0 20px blue"
                box.classList.add("glowblue");
                turnO=false;
            }
            else{
                //playerX
                box.innerText="X";
                box.style.boxShadow="0 0 20px red"
                box.style.color="red"
                box.classList.add("glowred");
                turnO=true;
            }
            //Increment count on each click
            count+=1;
            box.disabled=true;

            //Check for win condition on every click
            checkwinner();

            if(count===9)
            {
                drawfunction();
            }
        }
    });
});

const showwinner=(winner) =>{
    msg.innerText=`Congratulations

                    Winner is ${winner}`;
    msgcontainer.classList.remove("hide");
    disableboxes();
}

// for checking winner we have to check eack winning pattern 
const checkwinner=() =>{
    for(let pattern of winpatterns){
        let pos1val=boxes[pattern[0]].innerText;
        let pos2val=boxes[pattern[1]].innerText;
        let pos3val=boxes[pattern[2]].innerText;

        if(pos1val!="" && pos2val!="" && pos3val!="")
        {
            if(pos1val===pos2val && pos2val===pos3val)
            {
                showwinner(pos1val);
                count=0;
            }
        }
    }
};

newgamebtn.addEventListener("click",resetgame);
resetbtn.addEventListener("click",resetgame);