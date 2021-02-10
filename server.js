// Dependencies
const express = require("express");
const mongoose = require("mongoose");

// Create an express server and set up port with environment variables
const app = express();
const PORT = process.env.PORT || 8080;

// Middleware to handle data parsing and serve files in "public" folder
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))

// Connect to mongoose database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/firebending101", {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

// Require in our models from index.js
const db = require("./models");

// Home route
app.get("/", (req, res) => {
    res.sendFile("./index.html")
});

// Seed data
const seedWorkouts = [
    {
        name: "Fire Whip",
        type: "Attack",
        weight: 0,
        sets: 10,
        reps: 25,
        duration: 1,
        isCardio: true,
        finished: false
    },
    {
        name: "Flame Vortex",
        type: "Defense",
        weight: 25,
        sets: 5,
        reps: 1,
        duration: 10,
        isCardio: false,
        finished: false
    },
    {
        name: "Jet Propulsion",
        type: "Transportation",
        weight: 0,
        sets: 10,
        reps: 5,
        duration: 5,
        isCardio: true,
        finished: false
    },
    {
        name: "Wall of Flames",
        type: "Defense",
        weight: 100,
        sets: 1,
        reps: 1,
        duration: 1,
        isCardio: false,
        finished: false
    },
    {
        name: "Fire Missiles",
        type: "Attack",
        weight: 5,
        sets: 20,
        reps: 20,
        duration: 5,
        isCardio: true,
        finished: false
    },
    {
        name: "Blocking Fire",
        type: "Defense",
        weight: 0,
        sets: 20,
        reps: 10,
        duration: 5,
        isCardio: true,
        finished: false
    },
    {
        name: "Fire Blade",
        type: "Attack",
        weight: 5,
        sets: 10,
        reps: 15,
        duration: 1,
        isCardio: false,
        finished: false
    },
    {
        name: "Fire Bomb",
        type: "Attack",
        weight: 20,
        sets: 10,
        reps: 20,
        duration: 2,
        isCardio: false,
        finished: false
    },
    {
        name: "Fire Circle",
        type: "Form",
        weight: 2,
        sets: 5,
        reps: 20,
        duration: 5,
        isCardio: false,
        finished: false
    },
    {
        name: "Jet Stepping",
        type: "Transportation",
        weight: 0,
        sets: 20,
        reps: 10,
        duration: 2,
        isCardio: true,
        finished: false
    },
    {
        name: "Fire Streams",
        type: "Attack",
        weight: 5,
        sets: 50,
        reps: 10,
        duration: 2,
        isCardio: true,
        finished: false
    },
    {
        name: "Flame Redirection",
        type: "Defense",
        weight: 50,
        sets: 2,
        reps: 10,
        duration: 5,
        isCardio: false,
        finished: false
    },
    {
        name: "The Dancing Dragon",
        type: "Form",
        weight: 0,
        sets: 1,
        reps: 1,
        duration: 10,
        isCardio: true,
        finished: false
    },
    {
        name: "Fire Pinwheel",
        type: "Attack",
        weight: 10,
        sets: 5,
        reps: 10,
        duration: 2,
        isCardio: false,
        finished: false
    },
]

// Generate a week's training regimen
app.get("/seeddays", (req, res) => {
    db.Workout.create(seedWorkouts).then(result => {
        console.log(`Here's all your workouts: ${result, null, 2}`)
        db.Day.create([
            {
                name: "Day 1",
                workouts: [
                    result[Math.floor(Math.random() * result.length)]._id,
                    result[Math.floor(Math.random() * result.length)]._id,
                    result[Math.floor(Math.random() * result.length)]._id
                ]
            },
            {
                name: "Day 2",
                workouts: [
                    result[Math.floor(Math.random() * result.length)]._id,
                    result[Math.floor(Math.random() * result.length)]._id,
                    result[Math.floor(Math.random() * result.length)]._id
                ]
            },
            {
                name: "Day 3",
                workouts: [
                    result[Math.floor(Math.random() * result.length)]._id,
                    result[Math.floor(Math.random() * result.length)]._id,
                    result[Math.floor(Math.random() * result.length)]._id
                ]
            },
            {
                name: "Day 4",
                workouts: [
                    result[Math.floor(Math.random() * result.length)]._id,
                    result[Math.floor(Math.random() * result.length)]._id,
                    result[Math.floor(Math.random() * result.length)]._id
                ]
            },
            {
                name: "Day 5",
                workouts: [
                    result[Math.floor(Math.random() * result.length)]._id,
                    result[Math.floor(Math.random() * result.length)]._id,
                    result[Math.floor(Math.random() * result.length)]._id
                ]
            },
            {
                name: "Day 6",
                workouts: [
                    result[Math.floor(Math.random() * result.length)]._id,
                    result[Math.floor(Math.random() * result.length)]._id,
                    result[Math.floor(Math.random() * result.length)]._id
                ]
            },
            {
                name: "Day 7",
                workouts: [
                    result[Math.floor(Math.random() * result.length)]._id,
                    result[Math.floor(Math.random() * result.length)]._id,
                    result[Math.floor(Math.random() * result.length)]._id
                ]
            }

        ]).then(trainingWeek => {
            res.json(trainingWeek)
            console.log(`Here's your week good luck: ${JSON.stringify(trainingWeek, null, 2)}`)
        }).catch((err) => {
            if (err) console.log(err.message)
            res.status(500).send("Uncle Iroh is disappointed in you.")
        })
    })
})

// View data
app.get("/api/workouts", (req, res) => {
    db.Workout.find({}).then(data => {
        console.log(`Here's all your workouts pal: ${JSON.stringify(data, null, 2)}`);
        res.json(data);
    }).catch((err) => {
        if (err) console.log(err.message)
        res.status(500).send("Uncle Iroh is sad because you have lost your way.")
    })
});

app.get("/api/days", (req, res) => {
    db.Day.find({}).then(data => {
        console.log(`Here's the days of the week pal: ${JSON.stringify(data, null, 2)}`);
        res.json(data);
    }).catch((err) => {
        if (err) console.log(err.message)
        res.status(500).send("Uncle Iroh is sad because you have lost your way.")
    })
});

app.get("/populateddays", (req, res) => {
    db.Day.find({}).populate("workouts").then(data => {
        console.log(`Oh, you want to know what DAYS to work out? Fine. ${JSON.stringify(data, null, 2)}`)
        res.json(data)
    }).catch((err) => {
        if (err) console.log(err.message)
        res.status(500).send("Uncle Iroh is sad because you have lost your way.")
    })
})

// Post new data
app.post("/api/days", (req, res) => {
    db.Day.create(req.body).then(data => {
        console.log(`Here's your new day: ${JSON.stringify(data, null, 2)}`);
        res.json(data)
    }).catch((err) => {
        if (err) console.log(err.message);
        res.status(500).send("Uncle Iroh is sad because you have lost your way.")
    })
})


app.post("/api/workouts", (req, res) => {
    db.Workout.create(req.body).then(data => {
        db.Day.findOneAndUpdate({ _id: req.body.dayId }, { $push: { workouts: data._id } }).then(dbDay => {
            console.log(`Here's your new day ${JSON.stringify(dbDay, null, 2)}`);
            res.json(dbDay)
        })
    }).catch((err) => {
        if (err) console.log(err.message);
        res.status(500).send("Uncle Iroh is sad because you have lost your way.")
    })

})

// Update existing data
app.put("/update/:id", (req, res) => {
    db.Workout.update({ _id: mongojs.ObjectId(req.params.id) }, {
        $set: {
            finished: req.body.finished
        }
    }).then(data => {
        console.log(`So you finished one, eh? ${data, null, 2}`)
        res.json(data)
    }).catch((err) => {
        if (err) console.log(err.message);
        res.status(500).send("Uncle Iroh is sad because you have lost your way.")
    })
})

// Instruct server to listen on correct environment port
app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
});