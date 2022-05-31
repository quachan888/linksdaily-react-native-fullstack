const Link = require('../models/link');

export const create = async (req, res) => {
    try {
        const link = await new Link({ ...req.body, postedBy: req.user._id }).save();
        res.json(link);
    } catch (err) {
        console.log(err);
    }
};

export const links = async (req, res) => {
    try {
        const perPage = 2;
        const page = req.params.page ? req.params.page : 1;

        const allLinks = await Link.find()
            .skip((page - 1) * perPage)
            .populate('postedBy', '_id name')
            .sort({ createdAt: -1 })
            .limit(perPage);

        res.json(allLinks);
    } catch (error) {
        console.log(error);
    }
};

export const viewCount = async (req, res) => {
    try {
        const link = await Link.findByIdAndUpdate(
            req.params.linkId,
            { $inc: { views: 1 } },
            { new: true }
        );
        res.json({ ok: true });
    } catch (error) {
        console.log(error);
    }
};

export const like = async (req, res) => {
    try {
        const link = await Link.findByIdAndUpdate(
            req.body.linkId,
            {
                $addToSet: { likes: req.user._id }
            },
            { new: true }
        );
        res.json(link);
    } catch (error) {
        console.log(error);
    }
};

export const unlike = async (req, res) => {
    try {
        const link = await Link.findByIdAndUpdate(
            req.body.linkId,
            {
                $pull: { likes: req.user._id }
            },
            { new: true }
        );
        res.json(link);
    } catch (error) {
        console.log(error);
    }
};

export const linkDelete = async (req, res) => {
    console.log('req.params.linkId', req.params.linkId);
    console.log('req.user._id', req.user._id);
    try {
        const link = await Link.findById(req.params.linkId).select('postedBy');
        if (link.postedBy.toString() === req.user._id.toString()) {
            const deleted = await Link.findByIdAndRemove(req.params.linkId);
            res.json({ msg: 'Link deleted successfully', deleted });
        }
    } catch (error) {
        console.log(error);
    }
};

export const linksCount = async (req, res) => {
    try {
        const count = await Link.countDocuments();
        console.log('Count... ', count);
        res.json(count);
    } catch (error) {
        console.log(error);
    }
};
