function selectElementContents(el) {
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}

function barContainerHeadingEvent(){
    $(".container-heading").focus(function(){
        $(this).addClass("focus-container-heading");
        var el = this;
        requestAnimationFrame(function() {
            selectElementContents(el);
        });
    });
    $(".container-heading").focusout(function(){
        $(this).removeClass("focus-container-heading");
    });
}

function btnWriteEvent(){
    $(".item-content").hide();
    $(".btn-write").click(function(){
        $(this).parent().find(".item-display").hide()
        $(this).parent().find(".item-content").show();
        $(this).parent().find(".item-content").focus();
        $(".item-content").focusout(function(){
            if($(this).parent().find(".item-content").val()==""){
                $(this).parent().remove();
            }
            $(".item-content").hide();
            $("span:hidden").html($(this).val());
            $(".item-display").show();
        });
    })
    $(".btn-write").hide();
    $("li").hover(
        function(){
        $(this).find(".btn-write").show();
    },
    function(){
        $(this).find(".btn-write").hide();
    });
    $(".btn-write").hover(
        function(){
            $(this).attr("style","background-color: #e6eef0");
        },
        function(){
            $(this).attr("style","background-color: white");
        }
    );
}

function btnDeleteItemEvent(){
    $(".btn-delete-item").click(function(){
        $(this).parent().remove();
    })    
}

function btnAddItemEvent(){
    $(".btn-add-item").click(function(e){
        var newItem = `
            <li>
                <span class="item-display">+ </span>
                <textarea class="item-content" name="" id="" cols="30" rows="10"></textarea>
                <div class="btn-write">
                    <i class="fas fa-pen"></i>
                </div>
                <div class="btn-delete-item"></div>
            </li>
        `;
        $(".btn-write").unbind();
        e.target.parentNode.getElementsByClassName("container")[0].insertAdjacentHTML("beforeend",newItem);
        btnWriteEvent();
        btnDeleteItemEvent();
        console.log($(this).siblings().find(".btn-write").last());
        $(this).siblings().find(".btn-write").last().trigger("click");
    });
    $(".btn-add-item").hover(
        function(){
            $(this).attr("style","background-color:#7AADAF");
        },
        function(){
            $(this).attr("style","background-color:#dfe1e6");
        });
}

function btnDeleteColEvent(){
    $(".btn-delete-col").click(function(){
        $(this).parent().remove();
        // containers.containers.splice(colNumberInArray,1);
    })
}

function btnAddContainerEvent(){
    $("#add-container").click(function(e){
        colNumber++;
        var newCol = `
            <div id="col-${colNumber}" class="col">
                <div class="col-content">
                    <div class="container-heading" contenteditable="true" style="outline:0px;"></div>
                    <ul id="container-${colNumber}" class="container">
                    </ul>
                    <div id="btn-add-item-${colNumber}" class="btn-add-item">
                        <i class="fas fa-plus"></i>
                        Add another card
                    </div>
                </div>
                <div class="btn-delete-col"></div>
            </div>
        `
        $(".btn-delete-col").unbind();
        $(".btn-add-item").unbind();
        $(this).before(newCol);
        containers.containers.push(document.getElementById(`container-${colNumber}`));
        btnAddItemEvent();
        btnDeleteColEvent();
        $(".container-heading").unbind();
        barContainerHeadingEvent();
        $(".container-heading").last().focus();
        $(".container-heading").last().focusout(function(){
            if($(".container-heading").last().text()==""){
                $(".container-heading").last().parent().parent().remove();
            }
        });
        
    });
    $("#add-container").hover(
        function(){
            $("#add-container").attr("style","background-color: rgba(125, 155, 159,1)");
        },
        function(){
            $("#add-container").attr("style","background-color: rgba(125, 155, 159,0.8)");
        }
    );

}


const containers = dragula([...document.getElementsByClassName("container")],{
    // revertOnSpill:true
});
containers.on('drag',function(e){
    e.classList.add('is-moving');
});
containers.on('dragend', function(e) {
	e.classList.remove('is-moving');
});

var addContainer = document.getElementById("add-container");
var colNumber = 2;



btnAddContainerEvent();

btnAddItemEvent();

btnWriteEvent();

btnDeleteItemEvent();

btnDeleteColEvent();

barContainerHeadingEvent();





