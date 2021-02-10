// Initialize dropdowns and modals
$('.dropdown-trigger').dropdown();
$('.modal').modal();


// Get rid of intro div, render week of workouts
$("#accept").click(e => {
    e.preventDefault();
    $("#invitation").css("display", "none");
    $("#workout").css("display", "block")
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

});

// Add workout to day
$(".add-btn").click(function (e) {
    e.preventDefault();
    const name = $(this).data("name");
    const type = $(this).data("type");

    // Parse integers for data attributes in html
    const weight = parseInt($(this).data("weight"));
    const sets = parseInt($(this).data("sets"));
    const reps = parseInt($(this).data("reps"));
    const duration = parseInt($(this).data("duration"));

    // This takes a string and evaluates it for truthiness, then returns true or false. Because workouts where cardio is false have data attributes set to empty strings in html, they will evaluate to false while workouts where cardio is true will evalute to true as their attributes are a string labeled "true". I am using this method to "parse" a boolean from a string.
    const cardio = !!$(this).data("cardio");

    console.log(name);
    console.log(type);
    console.log(weight);
    console.log(sets);
    console.log(reps);
    console.log(duration);
    console.log(cardio);
    const newWorkout = { name: name, type: type, weight: weight, sets: sets, reps: reps, duration: duration, cardio: cardio }
    console.log(newWorkout);
    $.ajax({
        url: "/api/workouts",
        method: "POST",
        data: newWorkout
    }).then(dbworkout => {
        // TODO: add note about adding workout to routine 
        console.log(dbworkout);
        $(this).append(`You have officiall added ${dbworkout} to your routine.`);
    })
})

// Render a week of workouts
function renderWorkouts() {
    $("#days").empty();
    $.ajax({
        url: "/populateddays",
        method: "GET",
    }).then(data => {
        // Day 1 workout plan
        $("#day-1").append(`But if you don't respect it, it will chew you up and spit you out like an angry komodo rhino! Zuko demands ${data[0].workouts[0].sets} sets of ${data[0].workouts[0].name} and ${data[0].workouts[1].sets} sets of ${data[0].workouts[1].name}. What's left of you will attempt ${data[0].workouts[2].sets} sets of ${data[0].workouts[2].name}. Quickly now!`);

        // Day 2 workout plan
        $("#day-2").append(`What was that? That was the worst firebending I've ever seen! For your incompetence, you must now complete ${data[1].workouts[0].sets} sets of ${data[1].workouts[0].name} and ${data[1].workouts[1].sets} sets of ${data[1].workouts[1].name}. After that, you'll do ${data[1].workouts[2].sets} sets of ${data[1].workouts[2].name}, or die trying. Next time Zuko will not be so forgiving.`);

        // Day 3 workout plan
        $("#day-3").append(`To improve, you must learn from the ancient Sun Warriots. Do ${data[2].workouts[0].sets} sets of ${data[2].workouts[0].name} and ${data[2].workouts[1].sets} sets of ${data[2].workouts[1].name}. ${data[2].workouts[2].sets} sets of ${data[2].workouts[2].name} will be your reward for completing your task.`);

        // Day 4 workout plan
        $("#day-4").append(`You are slowly but surely washing off the stench of failure. Hurry! Complete ${data[3].workouts[0].sets} sets of ${data[3].workouts[0].name} and ${data[3].workouts[1].sets} sets of ${data[3].workouts[1].name}, followed by ${data[3].workouts[2].sets} sets of ${data[3].workouts[2].name}! Perhaps you can fight the Fire-Lord and live!`);

        // Day 5 workout plan
        $("#day-5").append(`Avatar Kyoshi offers you the wisdom that you must be decisive. ${data[4].workouts[0].sets} sets of ${data[4].workouts[0].name} followed by ${data[4].workouts[1].sets} sets of ${data[4].workouts[1].name} and ${data[4].workouts[2].sets} sets of ${data[4].workouts[2].name} will clear your mind and prepare you for the task at hand.`);

        // Day 6 workout plan
        $("#day-6").append(`If you want to be a bender, you have to let go of fear. You must now complete ${data[5].workouts[0].sets} sets of ${data[5].workouts[0].name} followed by ${data[5].workouts[1].sets} sets of ${data[5].workouts[1].name} and ${data[5].workouts[2].sets} sets of ${data[5].workouts[2].name}. You have covered much distance this week, and you must not lose sight of the finish line!`);

        // Day 7 workout plan
        $("#day-7").append(`The true mind can weather all the lies and illusions without being lost. The true heart can tough the poison of hatred without being harmed. Since beginningless time darkness thrives in the void, but always yields to purifying light. Anyway, do ${data[6].workouts[0].sets} sets of ${data[6].workouts[0].name}, ${data[6].workouts[1].sets} sets of ${data[6].workouts[1].name}, and ${data[6].workouts[2].sets} sets of ${data[6].workouts[2].name}. It is time, Avatar Aang. You are ready.`);
    })

}



