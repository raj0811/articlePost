const Admin = require('../models/admin');
const Article = require('../models/article')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const JWT_SECRET = 'mykey';

module.exports.renderRegister = async (req,res,next)=>{
    return res.render('adminreg')
}
module.exports.renderlogin = async (req,res,next)=>{
    return res.render('adminlogin')
}

module.exports.register = async (req, res, next) => {
    try {
        const { email, password, name } = req.body;
        const admin = await Admin.create({ email, password, name });
        res.redirect('/admin/renderlogin')
    } catch (error) {
        console.error("Error registering admin:", error);
        next(error);
    }
};

module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        const isPasswordMatch = await bcrypt.compare(password, admin.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        
        // Generate a JWT token
        const token = jwt.sign({ userId: admin._id }, JWT_SECRET);

        // save in cookies
        res.cookie('token', token, { httpOnly: true });
        
        res.redirect('/admin/rendercreate');
    } catch (error) {
        console.error("Error logging in admin:", error);
        next(error);
    }
};


module.exports.rendercreate = async (req,res,next)=>{
    return res.render('createPost')
}

module.exports.createPost = async (req, res, next) => {
  try {
    const { title, description, auther,} = req.body;

    // Create a new post
    const article = new Article({
      title,
      description,
      auther,
      admin: req.user.userId, // Assuming you store adminId in req.adminId after authentication
    });

    await article.save();
    
    res.redirect('back');
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
