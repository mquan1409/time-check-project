var d = new Date();
console.log(d.getHours());

function itemContentTasksEvent(){
    $(".item-duedate").unbind();
    $(".item-duedate-content").hide();
    $(".item-duedate").click(function(){
    $(".item-duedate-content").show();
});
}

itemContentTasksEvent();



$("#sub").click(function(){
    var date = new Date($('.date-input').val());
    console.log(date);
    console.log(date.getDate());
    $(".item-duedate-content").hide();
});