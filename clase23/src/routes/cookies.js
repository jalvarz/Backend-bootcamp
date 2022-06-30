import {Router} from "express"

const router = Router()

router.get('/',(req,res)=>{
    res.render('cookies')
})

router.post('/info',(req,res)=>{
    console.log(req.body)
    for(const key in req.body){
        res.cookie(key,req.body[key],{maxAge:30000})
    }
    res.send('informacion enviada con exito')
})

router.get('/ver',(req,res)=>{
    res.send(req.signedCookies)
})

export default router