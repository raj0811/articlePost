const Article = require('../models/article')


module.exports.showPost = async (req, res, next) => {
    try {
        // Find all articles and sort them by the 'postedAt' field in descending order (newest first)
        const articles = await Article.find().sort({ postedAt: -1 });

        console.log(articles);
        res.render('show',{
            articles
        });
    } catch (err) {
        next(err);
    }
};
