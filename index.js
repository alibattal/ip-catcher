const express = require("express")

const app = express()

const port = process.env.PORT || 3000;


app.use(express.json())
app.use(express.urlencoded({ extended: false }))


let sensors = [
    {
        "id": "",
        "ip": "",
        "mac": "",
        "hostname": "",
    },
]

app.get("/sensor", (req, res) => {
    res.json(sensors)
})

app.post("/sensor", (req, res) => {
    const sensor = req.body

    console.log(sensor)
    sensors.push(sensor)
    res.send("Sensor is added to the list")
})

app.get("/sensor/:id", (req, res) => {
    const id = req.params.id

    for (let sensor of sensors) {
        if (sensor.id === id) {
            res.json(sensor)
            return
        }
    }

    res.status(404).send('sensor not found')
})

app.delete("/sensor/:id", (req, res) => {
    const id = req.params.id

    sensors = sensors.filter((sensor) => {
        if (sensor.id !== id) {
            return true
        }

        return false
    })

    res.send('sensor is deleted')
})

app.patch("/sensor/:id", (req, res) => {
    const id = req.params.id;
    const { name, value } = req.body;

    const sensor = sensors.find((sensor) => sensor.id == id);

    if (name) sensor.name = name;
    if (value) sensor.value = value;

    res.send(`User with the id ${id} has been changed!`);
});

app.listen(port, () => {
    console.log("App is running on port " + port);
});