// Get rid of intro div, render week of workouts
$("#accept").click(e => {
    e.preventDefault();
    $("#invitation").css("display", "none");
    $.ajax({
        url: "/populateddays",
        method: "GET",
    }).then(data => {
        console.log(`Here's your workouts, friend: ${JSON.stringify(data, null, 2)}`)
    })
})

$("#decline").click(e => {
    e.preventDefault();
    $("invitation").css("display", "none")
})