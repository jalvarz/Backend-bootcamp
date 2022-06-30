import { Router} from "express"

const router = Router()

router.get('/', (req,res)=>{

})

router.post('/',(req,res)=>{
    const{ nombre,valor,tiempo} = req.body
    if(!nombre) return res.send({'error':'falta nombre'})
    if(!valor) return res.send({'error':'falta valor'})


tiempo 
    ? res.cookie(nombre,valor, { maxAge : 1000 * tiempo })
    : res.cookie(nombre,valor)

    res.send({'proceso':'ok'})
})


router.delete('/:nombre',(req,res)=>{
const {nombre} = req.params

if (nombre){
    res.clearCookie(nombre)
    res.send('Cookie eliminada con exito')
}else{
    res.send({'error':'nombre no encontrado'})
}
}
)

export default router