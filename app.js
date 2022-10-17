// player->O and computer->X
/*
    0   1   2
    3   4   5
    6   7   8
*/
const modal=document.querySelector(".modal")
const startbtn=document.querySelector(".start")
const boxes=[...document.querySelectorAll(".box")]
const turns=["computer","player"]
const winLine=document.querySelector(".line")
const displayResult=document.querySelector(".result")
const playAgain=document.querySelector("#again")

let counter   //this is useful while maing decision for computer choice
let positionLeft=[0,1,2,3,4,5,6,7,8]
let currTurn
let XO=["","","","","","","","",""]

const playerCB=document.querySelector(".player .checkbox")
const computerCB=document.querySelector(".computer .checkbox")


const removeItem=(arr,item)=>{
    // this function is made for my own ease
    const x=arr.indexOf(item)
    arr.splice(x,1)
}
const count=(arr,item)=>{
    // this function is made for my own ease
    let c=0;
    for(let i=0;i<arr.length;i++){
        if(arr[i]===item){
            c+=1
        }
    }
    return c
}
const lineAnimation=(n)=>{
    // here we get n based on the position of blocks determining win e.g: (0,1,2)
    /*
        (0,1,2)<=>n=0
        (3,4,5)<=>n=1
        (6,7,8)<=>n=2
        (0,4,8)<=>n=3
        (2,4,6)<=>n=4
        (0,3,6)<=>n=5
        (1,4,7)<=>n=6
        (2,5,8)<=>n=7
    */
    // line property contains data about transfrom propertites: translate and rotate for index n
    // [width,translatex,translatey,rotate]
   const lineProperty=[
        [85,24,47,0],
        [85,24,153,0],
        [85,24,257,0],
        [106,43,42,45],
        [106,38,270,-45],
        [85,50,21,90],
        [85,155,21,90],
        [85,260,21,90]
    ]
    const r=lineProperty[n]
    document.querySelector("style").innerHTML=`
        @keyframes lineanimation{
            0%{
                transform:translate(${r[1]}px,${r[2]}px) rotate(${r[3]}deg) scaleX(0%);
            }
            100%{
                transform:translate(${r[1]}px,${r[2]}px) rotate(${r[3]}deg) scaleX(100%);
            }
        }    
    `
    const rule=`width:${r[0]}%;transform:translate(${r[1]}px,${r[2]}px) rotate(${r[3]}deg);animation:lineanimation 0.5s linear;`

    winLine.classList.remove("hidden")
    winLine.setAttribute("style",rule)
}
const computerChoose=(n)=>{
    XO[n]="X"
    removeItem(positionLeft,n)
    boxes[n].innerHTML=`
    <div class="cross">
        <div class="arm1"></div>
        <div class="arm2"></div>
    </div>`
    boxes[n].classList.add("checked")
}
const MoveCheck=(n1,n2,n3,char)=>{
    const z=[XO[n1],XO[n2],XO[n3],n1,n2,n3]
    if(count(z,char)==2 && count(z,"")==1){
        const p=z[z.indexOf("")+3]
        computerChoose(p)
        return true
    }else{
        return false
    }
}
const positionCheck=(n1,n2,n3)=>{
    // similar to MoveCheck
    const z=[XO[n1],XO[n2],XO[n3],n1,n2,n3]
    if(count(z,"")==2 && count(z,"X")==1){
        const p=z[z.indexOf("")+3]
        computerChoose(p)
        return true
    }else{
        return false
    }
}
const checkAttack=()=>{
    // here it is checked whether computer can win in next move or we check possible attack moves
    if (MoveCheck(0,1,2,"X")){}
    else if (MoveCheck(3,4,5,"X")){}
    else if (MoveCheck(6,7,8,"X")){}
    else if (MoveCheck(0,3,6,"X")){}
    else if (MoveCheck(1,4,7,"X")){}
    else if (MoveCheck(2,5,8,"X")){}
    else if (MoveCheck(0,4,8,"X")){}
    else if (MoveCheck(2,4,6,"X")){}
    else if (XO[5]==="O" && XO[7]==="O" && XO[8]==="" && XO[6]===""){
        computerChoose(8)
    }
    else if (XO[4]==="X" && (XO[1]==="O" || XO[3]==="O" || XO[5]==="O" || XO[7]==="O") && (XO[0]===XO[2] && XO[6]===XO[8] && XO[0]==="")){
        computerChoose(0)
    }
    else{
        return false
    }
    // yedi else part run bhachaina bhane 
    return true
}
const checkDefense=()=>{
    if (MoveCheck(0,1,2,"O")){}
    else if (MoveCheck(3,4,5,"O")){}
    else if (MoveCheck(6,7,8,"O")){}
    else if (MoveCheck(0,3,6,"O")){}
    else if (MoveCheck(1,4,7,"O")){}
    else if (MoveCheck(2,5,8,"O")){}
    else if (MoveCheck(0,4,8,"O")){}
    else if (MoveCheck(2,4,6,"O")){}
    else if( XO[4]=="O" && XO[8]=="O" && XO[0]=="X" && count(XO,"")==6){
        computerChoose(6)
    }
    else if(XO[5]=="" && XO[8]=="" && XO[2]=="O" && XO[7]=="O" && positionLeft.length>2){
        computerChoose(8)
    }
    else if(XO[5]=="O" && XO[6]=="O" && XO[7]=="" && XO[8]=="" && XO[2]==""){
        computerChoose(8) 
    }
    else{
        return false
    }
    // yedi else part run bhachaina bhane 
    return true
}
const makeMove=()=>{
    if (positionCheck(0,1,2)){}
    else if(positionCheck(3,4,5)){}
    else if(positionCheck(6,7,8)){}
    else if(positionCheck(0,3,6)){}
    else if(positionCheck(1,4,7)){}
    else if(positionCheck(2,5,8)){}
    else if(positionCheck(0,4,8)){}
    else if(positionCheck(2,4,6)){}
    else{
        const c=positionLeft[Math.floor(Math.random()*(positionLeft.length))]
        computerChoose(c)
    }
}
const computer=()=>{
    // computer logic goes here
    if(counter===1){
        // if computer is given the first turn, then computer will chose box 5 or index 4
        computerChoose(4)
        counter+=1
    }else if(counter===2){
        // if computer is given the second turn
        // first findout which box player selected
        let n=0
        positionLeft.forEach((i)=>{
            n+=i
        })
        // 0+1+2+3+4+5+6+7+8=36
        n=36-n

        //based on user selection we consider two possibilites
        if(n!=4){
            computerChoose(4)
        }else{
            computerChoose(0)
        }
        counter+=1
    }else{
        // for other turns
        /*
            Strategy
            1. First Check if the computer can win by one move and do it
            2. If not, then check if the user is away from winning by just one move and block it
            3. If not then make some move defined moves
        */
        const CA=checkAttack()
        if(CA==false){
            const CD=checkDefense()
            if(CD==false){
                makeMove()
            }
        }
        counter+=1
    }
    //now giving back the turn to player
    if(isGameOver()==false){
        currTurn="player"
        computerCB.classList.remove("computerTurn")
        playerCB.classList.add("playerTurn")
    }else{
        // i.e game end
        playerCB.classList.remove("playerTurn")
        computerCB.classList.remove("computerTurn")
    }
}
const result=(c)=>{
    let n
    if(XO[0]==XO[1] && XO[1]==XO[2] && XO[0]==c){n=0}
    else if(XO[3]==XO[4] && XO[4]==XO[5] && XO[3]==c){n=1}
    else if(XO[6]==XO[7] && XO[7]==XO[8] && XO[6]==c){n=2}
    else if(XO[0]==XO[4] && XO[4]==XO[8] && XO[0]==c){n=3}
    else if(XO[2]==XO[4] && XO[4]==XO[6] && XO[2]==c){n=4}
    else if(XO[0]==XO[3] && XO[3]==XO[6] && XO[0]==c){n=5}
    else if(XO[1]==XO[4] && XO[4]==XO[7] && XO[1]==c){n=6}
    else if(XO[2]==XO[5] && XO[5]==XO[8] && XO[2]==c){n=7}
    else{
        return false
    }
    // following would execute only if any of above condition is true
    boxes.forEach((box)=>{
        box.classList.add("checked")
    })

    lineAnimation(n)
    return true
}
const isGameOver=()=>{
    // some logic to check whether the game is over or not
    let m
    if(result("X")){
        m=">> Computer Wins !"
    }else if(result("O")){
        m=">> You Wins !"
    }else if(positionLeft.length==0){
        m=">> It's a draw!"
    }else{
        return false
    }
    displayResult.innerHTML=m
    displayResult.classList.remove("hidden")
    document.querySelector(".turn").classList.add("hidden")
    playAgain.classList.remove("hidden")
    return true     //for above if and else if part
}
/*
if first turn goes to computer then the function computer() runs
if first turn goes to player then the program waits for the user input i.e for the click event on boxes
*/
startbtn.addEventListener("click",()=>{
    // everything starts from here
    counter=1
    currTurn=turns[Math.floor(Math.random()*2)]
    modal.classList.add("hidden")
    if(currTurn==="computer"){
        computerCB.classList.add("computerTurn")
        setTimeout(()=>{
            // this timeout is to create a delay... to make little interactive
            computer()
        },400)
    }
    else{
        playerCB.classList.add("playerTurn")
    }

})
playAgain.addEventListener("click",()=>{
    positionLeft=[0,1,2,3,4,5,6,7,8]
    XO=["","","","","","","","",""]
    winLine.classList.add("hidden")
    boxes.forEach(box=>{
        box.classList.remove("checked")
        box.innerHTML=""
    })
    displayResult.classList.add("hidden")
    document.querySelector(".turn").classList.remove("hidden")
    playAgain.classList.add("hidden")
    counter=1
    currTurn=turns[Math.floor(Math.random()*2)]

    if(currTurn==="computer"){
        computerCB.classList.add("computerTurn")
        setTimeout(()=>{
            // this timeout is to create a delay... to make little interactive
            computer()
        },400)
    }
    else{
        playerCB.classList.add("playerTurn")
    }
})

boxes.forEach((box,index)=>{
    box.addEventListener("click",(e)=>{
        console.log("here")
        if(currTurn==="player" && XO[index]===""){
            box.innerHTML=`<div class="circle"></div>`
            box.classList.add("checked")
            XO[index]="O"

            removeItem(positionLeft,index) //remove the given index as it has now filled
            counter+=1
            playerCB.classList.remove("playerTurn")

            currTurn="computer"
            if(isGameOver()==false){
                //asking now computer to make the next move if the game is not over yet
                computerCB.classList.add("computerTurn")
                setTimeout(()=>{
                    // this timeout is to create a delay... to make little interactive
                    computer()
                },400)
            }
        }
    })
})