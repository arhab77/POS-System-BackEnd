const Categories = require('../model/category');

const store = async(req, res, next) => {
    try{
        let payload = req.body;
        let category = new Categories(payload);
        await category.save();
        return res.json(category);

    } catch(err) {
        if(err && err.name === 'ValidatorError'){
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            });
        }
        next(err);
    }
}

const update = async (req, res, next) => {
    try {
        let {id} = req.params;
        let payload = req.body;
        let category = await Categories.findByIdAndUpdate(id,payload, {
            new: true,
            runValidator: true
        });
        return res.json(category);
    } catch (err) {
        if(err && err.name === 'validatorError'){
            return res.json({
                error: 1,
                message: err.message,
                fields: err.error
            });
        }

        next(err);
    }
};
  

const index = async(req, res, next) => {
    try {
        let category = await Categories.find();
        return res.json(category);
    } catch (err) {
        if(err && err.name === 'validatorError'){
            return res.json({
                error: 1,
                message: err.message,
                fields: err.error
            });
        }

        next(err);
    }
}

const destroy = async(req, res, next) => {
    try {
        let category = await Categories.findByIdAndDelete(req.params.id);
        return res.json(category);
    } catch (err) {
        if(err && err.name === 'validatorError'){
            return res.json({
                error: 1,
                message: err.message,
                fields: err.error
            });
        }

        next(err);
    }
}

module.exports = {
    store,
    index,
    update,
    destroy
}