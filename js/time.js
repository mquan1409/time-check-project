var newD = new Date();
var day = newD.getDay();
var month = newD.getMonth() + 1;
var hour = newD.getHours();
var min = newD.getMinutes();

var date = new Date($('.date-input').val());
    console.log(date);
    console.log(date.getDate());
    $(".item-duedate-content").hide();


// for(var i=0; i<$(".date-input").length;i++){
//     if($(".hour-input")[i].val())
// }

console.log($(".date-input"));


function itemContentTasksEvent(){
    $(".item-duedate").unbind();
    $(".item-duedate-content").hide();
    $(".item-duedate").click(function(){
    $(".item-duedate-content").show();
});
}

itemContentTasksEvent();



// $("#sub").click(function(){
//     var date = new Date($('.date-input').val());
//     console.log(date);
//     console.log(date.getDate());
//     $(".item-duedate-content").hide();
// });
// var y = 0;
// while (y<5){
//     for(var i=0; i<$(".date-input").length;i++){
//        console.log($(".hour-input")[i].val);
//     }
//     y++;
// }