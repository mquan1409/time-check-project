$(document).ready(function () {

    var hide = $(".fa-eye-slash"),
        show = $(".fa-eye");
        hide.hide();
        show.show();
    show.on("click", function () {
        show.hide();
        hide.show();
        $("input:nth-of-type(2)").prop("type", "text");
    });

    hide.on("click", function () {
        hide.hide();
        show.show();
        $("input:nth-of-type(2)").prop("type", "password");
    });
});