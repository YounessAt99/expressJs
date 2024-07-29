const express= require('express')
const router = express.Router()
const Student = require('../Model/student')

//Read
router.get('/',async(req,res)=>{
    try {
        const allStudent = await Student.find()
        allStudent.length > 0 ?
            res.status(201).json(allStudent)
        :   res.status(404).json("listes vide!")
    } catch (error) {
        res.status(400).json({'erreur':error.message})
    }
})

router.post('/add/',async(req,res)=>{
    try {
        const data =req.body
        const newCode = data.code
        const code = await Student.findOne({code:newCode})
        if (code) {
            res.json({'message':"student deja existe"})
        } else {
            std = new Student(data)
            const stdsave = await std.save()
            res.status(201).json({
                'message':'Saved',
                'data':stdsave
            })
        }
       
    } catch (error) {
        res.status(400).json({'error':error.message})
    }
})

router.get('/:code',async(req,res)=>{
    try {
        const code = req.params.code
        const student = await Student.findOne({ code }).select({nom:1,prenom:1,_id:0})//ou .select('nom') //.select('nom prenom') //.select(nom:1, _id:0)
        student ?
            res.status(201).json({
                code_student:code,
                data_student:student
            })
        :   res.status(404).json("pas trouvé!")
    } catch (error) {
        res.status(400).json({'erreur':error.message})
    }
})

router.put('/:code/edit',async(req,res)=>{
    try {
        const code = req.params.code
        const student = await Student.findOne({code})
        const data = req.body
        if (student) {
            if (data.nom) student.nom = data.nom
            if (data.prenom) student.prenom = data.prenom
            if (data.dateNaissance) student.dateNaissance = data.dateNaissance
            if (data.image) student.image = data.image
            if (data.class) student.class = data.class
        }
        await student.save()
        res.status(201).json({
            'message':'Updated',
            'data':student
        })
    } catch (error) {
        res.status(400).json({'erroeur':error.message})
    }
})

router.delete('/:code',async(req,res)=>{
    try {
        const cod = req.params.code
        const student = await Student.findOneAndDelete({code:cod})
        student ?
            res.status(201).json({
                'message':'Deleted',
                'data':student
            })
        :   res.status(201).json("Student n'existe pas")
    } catch (error) {
        res.status(400).json({'erreur':error.message})
    }
})

module.exports = router;