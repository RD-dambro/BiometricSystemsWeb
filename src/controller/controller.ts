import { getConnection } from "typeorm"

export class myController{
    entity

    constructor(entity){
        this.entity = entity
    }

    getRelationType = (relation: string) => this.entity.getRepository().metadata.relations.filter(r => r.propertyName == relation).map(r => r.relationType.toString()).reduce(r => r)

    getDeviceRelations = () => this.entity.getRepository().metadata.ownColumns.filter(col => col.relationMetadata).map(c => c.propertyName) 

    // controller stuff
    getAll = () => this.entity.find()
    saveNew = (item) => this.entity.save(this.entity.create(item))
    getOne = (id) => this.entity.findOne(id)
    updateOne = async (id, body) => this.entity.save(this.entity.merge(await this.entity.findOne(id), body))
    deleteOne = (id) => this.entity.delete(id)
    getAllWithAllRelations = () => this.entity.find({relations: this.getDeviceRelations()})
    getOneWithAllRelations = (id) => this.entity.findOne(id, {relations: this.getDeviceRelations()})
    getOneWithOneRelation = (id, relation) => this.entity.findOne(id, {relations: [relation]})
    getOneFromRelation = (id, relation) => {
        let t = this.getRelationType(relation)
        if ( t === 'one-to-one' || t=== 'many-to-one' ){
            return getConnection().createQueryBuilder().relation(this.entity, relation).of(id).loadOne()
        }
        else if (t === 'one-to-many' || t=== 'many-to-many') {
            return getConnection().createQueryBuilder().relation(this.entity, relation).of(id).loadMany()
        }
    }
    updateRelation = (id, relation, rid) => {
        let t = this.getRelationType(relation)
        if ( t === 'one-to-one' || t=== 'many-to-one' ){
            return getConnection().createQueryBuilder().relation(this.entity, relation).of(id).set(rid)
        }
        else if (t === 'one-to-many' || t=== 'many-to-many') {
            return getConnection().createQueryBuilder().relation(this.entity, relation).of(id).add(rid)
        }
    }
    deleteRelation = (id, relation, rid) => {
        let t = this.getRelationType(relation)
        if ( t === 'one-to-one' || t=== 'many-to-one' ){
            return getConnection().createQueryBuilder().relation(this.entity, relation).of(id).set(null)
        }
        else if (t === 'one-to-many' || t=== 'many-to-many') {
            return getConnection().createQueryBuilder().relation(this.entity, relation).of(id).remove(rid)
        }
    }
}