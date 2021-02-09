// Get rid of intro div, render week of workouts
$("#accept").click(e => {
    e.preventDefault();
    $("#invitation").css("display", "none");
    renderWorkouts();
})

// Decline button 
$("#decline").click(e => {
    e.preventDefault();
    $("#invitation").css("display", "none");
    $("#wimp").css("display", "block");
})

// Okay button returns to invitation view
$("#okay").click(e => {
    e.preventDefault();
    $("#wimp").css("display", "none");
    $("#invitation").css("display", "block")

})

// Render a week of workouts
function renderWorkouts() {
    $("#days").empty();
    $.ajax({
        url: "/populateddays",
        method: "GET",
    }).then(data => {
        console.log(`Here's your data: ${JSON.stringify(data, null, 2)}`)
    })
}