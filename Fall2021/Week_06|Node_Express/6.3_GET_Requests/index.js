let express = require("express");
let app = express();

let signs = {
    "data" : [
        {
            name: "aries",
            info: "(March 21 – April 19) – This zodiac birthday sign with Mars as its ruler represents courage, strength, independence, competition and enthusiasm."
        },
        {
            name: "taurus",
            info: "(April 20 – May 20) – Venus is the ruling sign and this zodiac sign is symbolic of calmness, peace, focus, patience and possessiveness."
        },
        {
            name: "gemini",
            info: "(May 21 – June 20) – Mercury is the ruler of this sun sign and people of this sign are joyful, pleasant, charming and adaptable."
        }

    ]
}

app.get('/', (req,res)=> {
    res.send("this is the root page");
})

app.get('/about', (req,res)=> {
    res.send("this is the page that will contain info about the project");
})

app.get('/signs', (req,res)=> {
    res.json(signs);
})

app.get('/signs/:sign', (req,res)=> {
    console.log(req.params.sign);
    let user_sign = req.params.sign;
    let user_obj;
    for(let i=0;i<signs.data.length;i++) {
        if(user_sign == signs.data[i].name) {
            user_obj = signs.data[i];
            
        }
    }
    console.log(user_obj);
    if(user_obj) {
        res.json(user_obj);
    } else {
        res.json({status: "info not present"});
    }
})

app.get('/test', (req,res) => {
    // console.log(req)
    console.log(req.query.a)
    res.send('hello')
})

app.listen(3000, ()=> {
    console.log("listening at localhost:3000");
})