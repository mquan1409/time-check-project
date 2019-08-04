function addBtnWriteEvent(){
    $(".item-content").hide();
    $(".btn-write").click(function(){
        $(this).parent().find(".item-display").hide()
        $(this).parent().find(".item-content").show();
        $(".item-content").focusout(function(){
            $(".item-content").hide();
            $("span:hidden").html($(this).val());
            $(".item-display").show();
        })
    })
    $(".btn-write").hide();
    $("li").mouseenter(function(){
        console.log("k");
        $(this).find("div").show();
    })
    // $("li").mouseout(function(){
    //     console.log("k");
    //     $(this).find("div").hide();
    // })
}

function addBtnDeleteItemEvent(){
    $(".btn-delete-item").click(function(){
        $(this).parent().remove();
    })    
}

function addItemButtonEvent(addItemButton){
    addItemButton.addEventListener("click",(e)=>{
        var newItem = `
            <li>
                <span class="item-display">+ </span>
                <textarea class="item-content" name="" id="" cols="30" rows="10"></textarea>
                <div class="btn-write">w</div>
                <div class="btn-delete-item"></div>
            </li>
        `;
        $(".btn-write").unbind();
        e.target.parentNode.getElementsByClassName("container")[0].insertAdjacentHTML("beforeend",newItem);
        addBtnWriteEvent();
        addBtnDeleteItemEvent();
        
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
            <ul id="container-${colNumber}" class="container">
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
addBtnWriteEvent();

addBtnDeleteItemEvent();







