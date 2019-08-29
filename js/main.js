function selectElementContents(el) {
    var range = document.createRange();
    range.selectNodeContents(el);
    var sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}

function barContainerHeadingEvent(){
    $(".container-heading").unbind();
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
    $(".btn-write").unbind();
    $(".write-item-screen").hide();
    $(".item-content").hide();
    $(".item-content-tasks").hide();
    $(".btn-write").click(function(){
        $(this).parent().find(".item-display").hide()
        $(this).parent().find(".item-content").show();
        $(this).parent().find(".write-item-screen").show();
        $(this).parent().find(".item-content-tasks").show();
        $(this).parent().find(".item-content").focus();
        $(this).parent().find(".item-content").focus(function(){
            e = this;
            requestAnimationFrame(function(){
                selectElementContents(e);
            });
        });
        $(".write-item-screen").click(function(){
            if($(this).parent().find(".item-content").html()==""){
                $(this).parent().remove();
            }
            $(".item-content").hide();
            $(".item-content-tasks").hide();
            $(".item-duedate-content").hide();
            $(this).parent().find(".item-display").html($(this).parent().find(".item-content").html());
            $(this).parent().find(".write-item-screen").hide();
            $(".item-display").show();
        });
    });
    // itemContentTasksEvent();
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
            $(this).attr("style","background-color: inherit");
        }
    );
}

function btnDeleteItemEvent(){
    $(".btn-delete-item").click(function(){
        $(this).parent().remove();
    })    
}

function btnAddItemEvent(){
    $(".btn-add-item").unbind();
    $(".btn-add-item").click(function(e){
        var newItem = `
        <li>
            <span class="item-display"> </span>
            <div class="write-item-screen"></div>
            <div contenteditable="true" class="item-content" ></div>
            <div class="item-content-tasks">
                <div class="item-duedate">Set Due Date</div>
                <div class="item-duedate-content">
                    <div class="time-input">
                        <input type="number" class="hour-input" min="0" max="23" placeholder="00">
                        <span>:</span>
                        <input type="number" class="minute-input" min="0" max="59" placeholder="00">
                    </div>
                    <input type="date" class="date-input">
                    <!-- <div id="sub">sub</div> -->
                </div>
            </div>
            <div class="btn-write">
                <i class="fas fa-pen"></i>
            </div>
            <div class="btn-delete-item">
                <i class="fas fa-minus-circle"></i>
            </div>
        </li>
        `;
        
        e.target.parentNode.getElementsByClassName("container")[0].insertAdjacentHTML("beforeend",newItem);
        itemContentTasksEvent();
        btnWriteEvent();
        btnDeleteItemEvent();
        $(this).siblings().find(".btn-write").last().trigger("click");
        btnMoreTasksEvent();
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
    $(".btn-delete-col").unbind();
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
            <div class="delete-item-screen"></div>
            <div class="col-content">
                <div class="btn-more">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
                <div class="more-tasks">
                    <div class="more-tasks-content">
                        <div class="more-heading">List Actions</div>
                        <div class="task task-delete-item">Delete Card</div>
                        <div class="task task-delete-col">Delete Container</div>
                        <div class="task task-add-item">Add Card...</div>
                    </div>
                </div>
                <div class="more-screen"></div>
                <div class="container-heading" contenteditable="true" style="outline:0px;"></div>
                <ul id="container-${colNumber}" class="container">
                </ul>
                <div class="btn-add-item">
                    <i class="fas fa-plus"></i>
                    Add another card
                </div>
            </div>
            <div class="btn-delete-col">
                <i class="fas fa-minus-circle"></i>
            </div>  
        </div>
        `
        $(this).before(newCol);
        containers.containers.push(document.getElementById(`container-${colNumber}`));
        btnAddItemEvent();
        btnDeleteColEvent();
        
        barContainerHeadingEvent();
        $(".container-heading").last().focus();
        $(".container-heading").last().focusout(function(){
            if($(".container-heading").last().text()==""){
                $(".container-heading").last().parent().parent().remove();
            }
        });
        btnMoreTasksEvent();
        
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

function btnMoreTasksEvent(){
    $(".btn-more").unbind();
    $(".task").unbind();
    $(".more-tasks").hide();
    $(".more-screen").hide();
    $(".btn-delete-item").hide();
    $(".delete-item-screen").hide();
    $(".btn-delete-col").hide();
    $(".delete-col-screen").hide();

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
        $(this).parent().find(".btn-more").css("z-index","auto");
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

    $(".task").click(function(){
        switch($(this).html()){
            case 'Delete Card':
                $(".more-tasks").hide();
                $(".more-tasks").css("z-index","auto");
                $(".more-screen").hide();
                $(".btn-more").css("background-color","#dfe1e6");
                $(".btn-more").css("z-index","auto");
                $(this).parent().parent().parent().parent().find(".delete-item-screen").show();
                $(this).parent().parent().parent().parent().find(".col-content").css("z-index","5");
                $(this).parent().parent().parent().find(".btn-delete-item").show();
                $(".delete-item-screen").click(function(){
                    $(this).hide();
                    $(this).parent().parent().parent().parent().find(".col-content").css("z-index","auto");
                    $(".btn-delete-item").hide();
                    $(".btn-more").css("z-index","auto");
                });
                break;
            case 'Delete Container':
                $(".more-tasks").hide();
                $(".more-tasks").css("z-index","auto");
                $(".more-screen").hide();
                $(".btn-more").css("background-color","#dfe1e6");
                $(".btn-more").css("z-index","auto");
                $(this).parent().parent().parent().parent().parent().find(".delete-col-screen").show();
                $(".col-content").css("z-index","5");
                $(".btn-delete-col").show();
                $(".btn-delete-col").css("z-index","5");
                $(".delete-col-screen").click(function(){
                    $(this).hide();
                    $(".col-content").css("z-index","auto");
                    $(".btn-delete-col").hide();
                    $(".btn-delete-col").css("z-index","auto");
                });
                break;
            case 'Add Card...':
                $(".more-tasks").hide();
                $(".more-tasks").css("z-index","auto");
                $(".more-screen").hide();
                $(".btn-more").css("background-color","#dfe1e6");
                $(".btn-more").css("z-index","auto");
                $(this).parent().parent().parent().find(".btn-add-item").trigger("click");
                break;
        }
    });
}

function itemsEvent(){
    $(".item").hover(
        function(){
            $(this).css("background-color", "rgb(244, 245, 247)");
        },
        function(){
            $(this).css("background-color", "white");
        }
    )
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

btnMoreTasksEvent();

itemsEvent();







