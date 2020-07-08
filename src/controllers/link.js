const express = require('express');

const { Link } = require('../models')

const router = express.Router();

router.get('/', async(req , res)=> {

    const { accountId } = req;
    const links = await Link.findOne( { where: {id, accountId } } );

    if(!links) return res.jsonNotFound();

    return res.jsonOK(links);

});

router.get('/:id', async (req, res)=> {

    const { accountId } = req;
    const { id } = req.params;
    const link = await Link.findOne( { where: {id, accountId } } );

    if(!link) return res.jsonNotFound();

    return res.jsonOK(link);

});

router.post('/', async (req, res)=> {

    const { accountId, body } = req;
    const { label, url, isSocial } = body;

    const image = 'https://pt.freeimages.com/photo/on-the-road-5-1384802';

    const link = await Link.create({ label, url, isSocial, accountId });

    return res.jsonOk(link);

});

router.put('/:id', async(req, res) => {

    const { accountId , body } = req;

    const { id } = req.params;
    
    const fields = ['label', 'url', 'isSocial'];

    const link = await Link.findOne( { where: {id, accountId } } );

    if(!link) return res.jsonNotFound();

    fields.map((fieldName) => {
        const newValue = body[fieldName];
        if (newValue) link[fieldName] = newValue;
    });

    await link.save();

    return res.jsonOK(link);


});

router.delete('/:id', async(req, res)=> {

    const accountId = req.body;
    const { id } = req.params;
    const link = await Link.findOne({ where: { id, accountId }});

    if (!link) return res.jsonNotFound();

    await link.detroy();

    return jsonOk();

})

module.exports = router;