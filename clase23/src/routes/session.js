import { Router } from "express"
const router = Router()


router.get('/',(req,res)=>{
    res.render('session')
})

router.post('/session',(req,res)=>{
    for (const key in req.body){

    }

})
export default router

