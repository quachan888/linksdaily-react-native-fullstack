import express from 'express';
const router = express.Router();

const {
    create,
    links,
    viewCount,
    like,
    unlike,
    linkDelete,
    linksCount
} = require('../controllers/link');
const { requireSignin } = require('../controllers/auth');

router.post('/create', requireSignin, create);
router.get('/links/:page', links);
router.put('/view-count/:linkId', viewCount);
router.put('/like', requireSignin, like);
router.put('/unlike', requireSignin, unlike);
router.delete('/link-delete/:linkId', requireSignin, linkDelete);
router.get('/links-count', linksCount);

export default router;
