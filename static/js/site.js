function setFooterPosition() {
    var windowHeight = $(window).height();
    var bodyHeight = $("body").outerHeight(true);
    var footerHeight = $("footer").outerHeight(true);

    if (windowHeight > (bodyHeight + footerHeight)) {
        $("footer").addClass("fixed-bottom");
    } else {
        $("footer").removeClass("fixed-bottom");
    }
}

$(window).on("load", function () {
    setFooterPosition();
});

$(window).on("resize", function () {
    setFooterPosition();
});

$(".show-answer").on("click", function () {
    var id = (this.id).split('-')[3];

    var hidden = $("#answer-for-" + id).hasClass("d-none");

    if (hidden) {
        $("#answer-for-" + id).removeClass("d-none")
        $(this).text("Hide answer");
    } else {
        $("#answer-for-" + id).addClass("d-none")
        $(this).text("Show answer");
    }
});