import { Router} from "express";
import {usersDao as api } from "../daos/index.js";
const router = new Router()


router.get('/',async (req,res)=>{
    try{
        const allUsers = await api.getAll()
        res.json(allUsers)
    }
    catch (error){
        console.log(error)
    }

})

router.post('/',async (req,res)=>{
    try{
        const createUsers = await api.create(req.body)
        res.json(allUsers)
    }
    catch (error){
        console.log(error)
    }

})

export default router