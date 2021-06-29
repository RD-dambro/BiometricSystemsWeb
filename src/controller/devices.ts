import { Producer } from '../rabbit'
import { Device } from "../entity/Device";
import { myController } from "./controller";

const producer = new Producer({
    exchange: 'message',
    exchange_type: 'topic',
    queue: 'queue_name',
    key: 'uid1.state'
})

const controller = new myController(Device)


const express = require('express')

const router = express.Router()

router.route('/')
    .get(async (req, res)=>{
        res.json(await controller.getAll())
    })
    .post(async (req, res) => {
        res.send(await controller.saveNew(req.body));
    });

router.route('/all')
    .get(async (req,res) => {
        res.json(await controller.getAllWithAllRelations())
    });

router.route('/:id')
    .get(async (req, res)=>{
        res.json(await controller.getOne(req.params.id))
    })
    .put(async (req, res) => {
        res.json(await controller.updateOne(req.params.id, req.body));
    })
    .delete(async (req, res) => {
        res.json(await controller.deleteOne(req.params.id));
    });

router.route('/:id/all')
    .get(async (req,res) => {
        res.json(await controller.getOneWithAllRelations(req.params.id))
    });
router.route('/:id/:relation')
    .get(async(req, res) => {
        res.json(await controller.getOneWithOneRelation(req.params.id, req.params.relation))
    })

router.route('/:id/:relation/:rid')
    .get(async (req, res) => {
        res.json(await controller.getOneFromRelation(req.params.id, req.params.relation))
    })
    .put(async (req, res) => {
        res.json(await controller.updateRelation(req.params.id, req.params.relation, req.params.rid))

    })
    .delete(async(req, res) => {
        res.json(await controller.deleteRelation(req.params.id, req.params.relation, req.params.rid))  
    });

router.route('/state/:id')
    .post(async (req, res) => {
        const id = req.params.id;
        const device = await Device.findOne(id)
        const { state } = req.body
        producer.publish(state)
        console.log(state)
        return res.json(state)
    })

module.exports = router
