function addWriteButtonEvent(writeButton){
    writeButton.addEventListener("click",(e)=>{
        console.log("click");
    });
}

function addItemButtonEvent(addItemButton){
    addItemButton.addEventListener("click",(e)=>{
        var newItem = `
            <li>+
                <div class="btn-write">w</div>
            </li>
        `;
        e.target.parentNode.getElementsByClassName("container")[0].insertAdjacentHTML("beforeend",newItem);
        
        var writeButtons = document.getElementsByClassName("btn-write");

    })
}

const containers = dragula([...document.getElementsByClassName("container")],{
    revertOnSpill:true
});
console.log(containers);
// containers.removeOnSpill = true;

var addContainer = document.getElementById("add-container");
var colNumber = 2;

addContainer.addEventListener("click",function(e){
    colNumber++;
    var newCol = `
        <div id="col-${colNumber}" class="col">
            <ul id="${colNumber}" class="container">
                container-${colNumber}
            </ul>
            <div id="btn-add-item-${colNumber}" class="btn-add-item">Add</div>
        </div>
    `
    document.getElementById("containers").insertAdjacentHTML("beforeend",newCol);
    containers.containers.push(document.getElementById(`container-${colNumber}`))
    addItemButtonEvent(document.getElementsByClassName("btn-add-item")[colNumber-1]);
});

var addItemButtons = document.getElementsByClassName("btn-add-item");

for(var i=0;i<addItemButtons.length;i++){
    addItemButtonEvent(addItemButtons[i]);
}

var writeButtons = document.getElementsByClassName("btn-write");

for(var i=0;i<writeButtons.length;i++){
    addWriteButtonEvent(writeButtons[i]);
}







