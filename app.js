require("dotenv").config();

let {crews, shifts} = require("./data.js");

// setup
const express = require("express");
const app = express();

// middelware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
const logger = (req, res, next) => {
    const date = new Date();
    const method = req.method;
    const url = req.url;
    const ip = req.ip;
    console.log(`Date: ${date} 
                - Method: ${method} 
                - URL: ${url} 
                - IP: ${ip}`
            );
    next();
}
app.use(logger)

// GET ALL
app.get("/api/v1/crews", (req, res) => {
    return res.status(200).json({message: "Bring The Data", data: crews});
})

// GET ONE
app.get("/api/v1/crews/:id", (req, res) => {
    const id = Number(req.params.id);
    const crew = crews.find((crew) => crew.id === id);
    if(!crew) {
        return res.status(404).json({
            message: "the crew does not exsist",
            data: null
        });
    }
    return res.status(200).json({message: "Get the Crew", data: crew});
})

// CREAT ONE
app.post("/api/v1/crews", (req,res) => {
    const {name, role, active} = req.body;
    const crew = {
        id: new Date().getTime(),
        name: name,
        role: role,
        active: active
    };
    crews.push(crew);
    return res.status(201).json({
        message: "Added Successfuly",
        data: crew
    })
})

// UPDATE
app.put("/api/v1/crews/:id", (req, res) => {
    const id = Number(req.params.id);
    const crew = crews.find((crew) => crew.id === id);
    if(!crew) {
        return res.status(404).json({
            message: "the crew does not exsist"
        });
    }
    crew.name = req.body.name;
    crew.role = req.body.role;
    crew.active = req.body.active;
    return res.status(200).json({
        message: "Updated Data Success",
        data: crew
    });
})

// DELETE   
app.delete("/api/v1/crews/:id", (req, res) => {
    const id = Number(req.params.id);
    
    // البحث عن مكان العنصر في المصفوفة
    const index = crews.findIndex((crew) => crew.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "the crew does not exist"
        });
    }

    // حذف العنصر مباشرة من المصفوفة الأصلية
    crews.splice(index, 1);

    return res.status(200).json({
        message: "Delete Success",
        data: null
    });
});

// GET ALL SHIFTS
app.get("/api/v1/shifts", (req, res) => {
    return res.status(200).json({
        message: "Bring The Data",
        data: shifts
    })
})

// GET ONE SHIFT
app.get("/api/v1/shifts/:id", (req, res) => {
    const id = Number(req.params.id);
    const shift = shifts.find((shift) => shift.id === id);
    if(!shift) {
        return res.status(404).json({
            message: "the shift does not exsist",
            data: null
        });
    }
    return res.status(200).json({
        message: "Get the shift",
        data: shift
    });
})

// CREAT ONE SHIFTS
app.post("/api/v1/shifts", (req,res) => {
    const {crewId, berth, startsAt, endsAt} = req.body;
    const crewExists = crews.find(crew => crew.id === Number(crewId));
    
    if (!crewExists) {
        return res.status(400).json({
            message: "Invalid crewId: This member does not exist"
        });
    }
    const shift = {
        id: new Date().getTime(),
        crewId: Number(crewId),
        berth: berth,
        startsAt: startsAt,
        endsAt: endsAt
    };
    shifts.push(shift);
    return res.status(201).json({
        message: "Added Successfuly",
        data: shift
    })
})

// UPDATE
app.put("/api/v1/shifts/:id", (req, res) => {
    const id = Number(req.params.id);
    const shift = shifts.find((shift) => shift.id === id);
    if(!shift) {
        return res.status(404).json({message: "the shift does not exsist"});
    }
    shift.crewId = Number(req.body.crewId);
    shift.berth = req.body.berth;
    shift.startsAt = req.body.startsAt;
    shift.endsAt = req.body.endsAt;
    return res.status(200).json({
        message: "Updated Data Success",
        data: shift
    });
})

// DELETE
app.delete("/api/v1/shifts/:id", (req, res) => {
    const id = Number(req.params.id);
    
    // البحث عن مكان العنصر في المصفوفة
    const index = shifts.findIndex((shift) => shift.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "the shift does not exist" });
    }

    // حذف العنصر مباشرة من المصفوفة الأصلية
    shifts.splice(index, 1);

    return res.status(200).json({
        message: "Delete Success",
        data: null
    });
});

// reverse port
const PORT = process.env.PORT
const LOCAL = process.env.LOCAL;
app.listen(PORT, () => {
    console.log(`server is running in http://${LOCAL}:${PORT}`)
})