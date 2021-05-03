import express from 'express';
import Student from "../models/Student.js";
import Group from "../models/Group.js";

const router = express.Router();

router.route('/student')
    .get(async (req, res) => {
        try {
            const students = await Student.find({})
            res.status(200).json(students)
        } catch (e) {
            res.status(500).send('Something went wrong')
        }
    })
    .post(async (req, res) => {
        try {
            const {name, groupId} = req.body
            const student = await Student.create({name, groupId})
            res.status(201).json(student)
        } catch (e) {
            res.status(500).send('Something went wrong')
        }
    })

router.route('/student/:id')
    .delete(async (req, res) => {
        try {
            await Student.findOneAndDelete({_id: req.params.id})
            res.status(204).end()
        } catch (e) {
            res.status(500).send('Something went wrong')
        }
    })
    .put(async (req, res) => {
        try {
            const student = await Student.findOneAndUpdate({_id: req.params.id}, {name: req.body.name}, {new: true})
            res.status(200).json(student)
        } catch (e) {
            res.status(500).send('Something went wrong')
        }
    })

router.route('/group')
    .get(async (req, res) => {
        try {
            const groups = await Group.find({}).sort({updatedAt: -1}).lean();
            const students = await Student.find({}).sort({updatedAt: -1}).lean()
            const data = groups.map(group => ({
                ...group,
                students: students.filter(student => student.groupId.toString() === group._id.toString())
            }))
            res.json(data)
        } catch (e) {
            res.status(500).send('Something went wrong')
        }
    })
    .post(async (req, res) => {
        try {
            const newGroup = await Group.create({name: req.body.name})
            res.status(201).json({...newGroup._doc, students: []})
        } catch (e) {
            console.log(e)
            res.status(500).send('Something went wrong')
        }
    })

router.route('/group/:id')
    .delete(async (req, res) => {
        try {
            await Group.findOneAndDelete({_id: req.params.id})
            await Student.find({groupId: req.params.id}).deleteMany();
            res.status(204).end()
        } catch (e) {
            res.status(500).send('Something went wrong')
        }
    })
    .put(async (req, res) => {
        try {
            const group = await Group.findOneAndUpdate({_id: req.params.id}, {name: req.body.name}, {new: true})
            res.status(200).json(group)
        } catch (e) {
            res.status(500).send('Something went wrong')
        }
    })

router.route('/searchByName/:name')
    .get(async (req, res) => {
        try {
            const students = await Student.find({name: {$regex: new RegExp(req.params.name, "i")}})
                .sort({updatedAt: -1})
                .populate('groupId')
                .lean().exec()
            const data = students.reduce((acc, student) => {
                if (acc[student.groupId._id]) {
                    acc[student.groupId._id].students.push(student)
                } else {
                    acc[student.groupId._id] = {
                        ...student.groupId,
                        students: [student]
                    }
                }
                return acc
            },{})
            res.json(Object.values(data))
        } catch (e) {
            console.log(e)
            res.status(500).send('Something went wrong')
        }
    })
export default router;