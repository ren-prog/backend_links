const express = require('express');

const { Link } = require('../models')

const router = express.Router();

router.get('/', async(req , res)=> {

    const accountId = 1;
    const links = await Link.findOne( { where: {id, accountId } } );

    if(!links) return res.jsonNotFound();

    return res.jsonOK(links);

});

router.get('/:id', async (req, res)=> {
    const accountId = 1;
    const { id } = req.params;
    const link = await Link.findOne( { where: {id, accountId } } );

    if(!link) return res.jsonNotFound();

    return res.jsonOK(link);

});

router.post('/', async (req, res)=> {

    const account = 1;
    const { label, url, isSocial } = req.body;

    const image = 'https://pt.freeimages.com/photo/on-the-road-5-1384802';

    const link = await Link.create({ label, url, isSocial });

    return res.jsonOk(link);

});

router.put('/:id', async(req, res) => {

    const accountId = 1;
    const { id } = req.params;
    const { body } = req;
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

    const accountId = 1;
    const { id } = req.params;
    const link = await Link.findOne({ where: { id, accountId }});

    if (!link) return res.jsonNotFound();

    await link.detroy();

    return jsonOk();

})

module.exports = router;