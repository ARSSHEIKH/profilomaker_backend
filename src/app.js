const express = require("express");
var cors = require("cors")
const multer = require("multer")
const path = require('path');

require("./db/conn");
const Users = require("./models/users");
const UserProfiles1 = require("./models/userProfile1");
const UserProfiles2 = require("./models/userProfile2");
const UserProfiles3 = require("./models/userProfile3");

const app = express();

const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
    }
})

const upload = multer({storage: storage});


app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
const port = process.env.PORT || 3200;
let profile_url = "";



//#region users database
app.post("/registeration", (req, res) => {
    console.log(req.body);

    const user = new Users(req.body)
    user.save().then(() => res.status(201).send(user)).catch((err) => res.status(400).send(err))
})

//#region find users, usually for login
app.get("/users", async (req, res) => {
    try {
        const userData = await Users.find()
        if (!userData) return res.status(404).send()
        else res.send(userData)
    } catch (err) {
        console.log(err);
    }
})
app.get("/users/:email", async (req, res) => {
    try {
        const email = req.params.email
        // const userData = await Users.findOne({ email: email }).exec();
        // if(!userData) return res.status(404).send()
        // else res.send(userData)

        Users.findOne({ email: email }, 'password verified', function (err, userData) {
            if (err) return res.status(404).send();
            else res.send(userData)
        });
    } catch (err) {
        res.status(500)
    }
})
app.post("/update_user/:email", async (req, res) => {
    try {
        const email = req.params.email
        Users.findOneAndUpdate({ email: email }, req.body, function (err, userData) {
            if (err) return res.status(404).send();
            else res.send(userData)
        });
    } catch (err) {
        res.status(500)
    }
})
//#endregion
//#endregion


//#region userprofile database forms
async function finding() {

    //#region getting id from user database
    const get_all_users = await Users.find();
    get_all_users.map((val, ind) => {
        profile_url = val.id;
    })
    //#endregion

    //#region insert data 
    //#region adding data for form1 
    app.post(`/add_profile/user/:${profile_url}/form1`, (req, res) => {
        const user = new UserProfiles1(req.body);
        user.save().then(() => res.status(201).send(user)).catch((err) => {
            res.status(400).send(err)
        })
    })
    //#endregion

    //#region adding data for form2
    app.post(`/add_profile/user/:${profile_url}/form2`, (req, res) => {
        const user = new UserProfiles2(req.body);
        console.log(user)
        user.save().then(() => res.status(201).send(user)).catch((err) => {
            res.status(400).send(err)
        })
    })
    //#endregion

    //#region adding data for form3
    app.post(`/add_profile/user/:${profile_url}/form3`, upload.single("profile_pic"), (req, res) => {

        console.log(req.file, req.body)
        let ext = '';

        if (req.file.originalname.split('.').length > 1) {
            ext = req.file.originalname.substring(req.file.originalname.lastIndexOf('.'));
        }
        const user = new UserProfiles3({
            user_id: req.body.user_id,
            summary: req.body.summary,
            profile_pic: req.file
        });
        user.save().then(() => res.status(201).send(user)).catch((err) => {
            res.status(400).send(err)
        })
    })
    //#endregion
    //#endregion

    //#region update data
    //#region updating data for form2
    app.post(`/update_profile/user/form2`, (req, res) => {
        const {
            user_id, degreeLevel, careerLevel,
            experience, designation, pfCity, salary,
            fbProfile, inProfile, twtProfile,
        } = req.body;


        UserProfiles2.findOneAndUpdate({ user_id: user_id }, {
            user_id, degreeLevel, careerLevel,
            experience, designation, pfCity, salary,
            fbProfile, inProfile, twtProfile,
        },
            function (err, userData) {
                if (err) return res.status(404).send();
                else res.status(201).send(userData)
            });
    })
    //#endregion

    //#region updating data for form1 
    app.post(`/update_profile/user/form1`, (req, res) => {
        const { user_id, fname, lname, email, gender, dob, address, city, country, postalcode, phone1,
            phone2 } = req.body;

        UserProfiles1.findOneAndUpdate({ user_id: user_id }, {
            fname, lname, email, gender, dob, address, city, country, postalcode, phone1, phone2,
        },
            function (err, userData) {
                if (err) return res.status(404).send();
                else res.status(201).send(userData)
            });
    })
    //#endregion

    //#region updating data for form3 
    app.post(`/update_profile/user/form3`, upload.single("profile_pic"), (req, res) => {

        const { user_id, summary } = req.body;
        const profile_pic = req.file;

        UserProfiles3.findOneAndUpdate({ user_id: user_id }, { summary, profile_pic },
            function (err, userData) {
                if (err) return console.log(err)
                else res.status(201).send(userData)
            });
    })
    //#endregion

    //#endregion

    //#region get data
    //#region getting data from form1
    app.get(`/profiles/user/:id/form1`, async (req, res) => {
        const id = req.params.id
        UserProfiles1.find().where('user_id').in(id).exec((err, records) => {
            if (err) return res.status(404).send();
            else res.status(201).send(records)
        });
    });
    //#endregion

    //#region getting data from form2
    app.get(`/profiles/user/:id/form2`, async (req, res) => {
        const id = req.params.id
        console.log(req.params.id)
        UserProfiles2.find().where('user_id').in(id).exec((err, records) => {
            if (err) return res.status(404).send();
            else res.status(201).send(records)
        });
    });
    //#endregion

    //#region getting data from form3
    app.get(`/profiles/user/:id/form3`, async (req, res) => {
        const id = req.params.id
        console.log(req.params.id)

        UserProfiles3.find().where('user_id').in(id).exec((err, records) => {
            if (err) return res.status(404).send();
            else res.status(201).send(records)
        });
    });
    //#endregion
    app.get('/uploads/:filename', (req, res) => {
        res.sendFile(req.params.filename,
            {
                root:
                    path.normalize('C:\\Users\\Desktop\\profilomaker_backend\\uploads')
            });
    })
    //#endregion
}

console.log(path.normalize('C:\\Users\\Desktop\\profilomaker_backend\\uploads'))
finding();
//#endregion









app.listen(port, () => {
    console.log("Server is running on port 3200")
})