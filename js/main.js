function selectElementContents(el) {
    console.log("kay2");
    var range = document.createRange();
    range.selectNodeContents(el);
    console.log(range);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}

function barContainerHeadingEvent(){
    $(".container-heading").focus(function(){
        $(this).addClass("focus-container-heading");
        var el = this;
        console.log(el);
        console.log(typeof(el));
        requestAnimationFrame(function() {
            selectElementContents(el);
        });
    });
    $(".container-heading").focusout(function(){
        $(this).removeClass("focus-container-heading");
    });
}

function btnWriteEvent(){
    $(".write-item-screen").hide();
    $(".item-content").hide();
    $(".btn-write").click(function(){
        $(this).parent().find(".item-display").hide()
        $(this).parent().find(".item-content").show();
        $(this).parent().find(".write-item-screen").show();
        $(this).parent().find(".item-content").focus();
        // $(this).parent().find(".item-content").focus(function(){
        //     console.log("kay")
        //     el = this;
        //     console.log(el);
        //     requestAnimationFrame(function() {
        //         selectElementContents(el);
        //     });
        // });
        $(".write-item-screen").click(function(){
            if($(this).parent().find(".item-content").val()==""){
                $(this).parent().remove();
            }
            $(".item-content").hide();
            $("span:hidden").html($(this).parent().find(".item-content").val());
            $(this).parent().find(".write-item-screen").hide();
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
                <textarea class="item-content" name="" id="" cols="23" rows="6"></textarea>
                <div class="write-item-screen"></div>
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

$(".more-tasks").hide();
$(".more-screen").hide();
$(".btn-more").click(function(){
    $(this).parent().find(".more-tasks").show();
    $(this).parent().find(".more-tasks").css("z-index","2");
    $(this).parent().find(".more-screen").show();
    $(this).css("z-index","2");
    $(this).css("background-color","rgb(195, 200, 209)");
    
});

$(".more-screen").click(function(){
    $(this).hide();
    $(this).parent().find(".more-tasks").hide();
    $(this).parent().find(".more-tasks").css("z-index","1");
    $(this).parent().find(".btn-more").css("z-index","1");
    $(this).parent().find(".btn-more").css("background-color","#dfe1e6");
});


$(".btn-more").hover(function(){
    $(this).css("background-color","rgb(195, 200, 209)");
},
function(){
    $(this).css("background-color","#dfe1e6");
})

$(".task").hover(function(){
    $(this).css("background-color","rgb(245, 246, 248)")
},
function(){
    $(this).css("background-color","white");
});

$(".btn-delete-item").hide();
$(".delete-item-screen").hide();
$(".btn-delete-col").hide();
$(".delete-col-screen").hide();



btnAddContainerEvent();

btnAddItemEvent();

btnWriteEvent();

btnDeleteItemEvent();

btnDeleteColEvent();

barContainerHeadingEvent();







