function draw() {
    var width = $(document).width();
    var height = $(document).height();

    $("section").width(width).height(height);
}

$(document).resize(draw);
$(draw);