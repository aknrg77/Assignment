const { string } = require("joi");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30)
    .regex(/^[a-zA-Z]*$/)
    .required(),

  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),

  type: Joi.string().valid("admin", "interviewee", "interviewer").required(),
});

const interviewSchema = Joi.object({
  startDate: Joi.date().required(),

  endDate: Joi.date().greater(Joi.ref("startDate")).required(),

  participants: Joi.array().items(Joi.object()).min(2).required(),
});

const interviewUpdateSchema = Joi.object({
  startDate: Joi.date(),

  endDate: Joi.date().greater(Joi.ref("startDate")),
  participants: Joi.array().items(Joi.object()).min(2).required(),
});

const userValidation = async (req, res, next) => {
  try {
    await userSchema.validateAsync(req.body);
  } catch (err) {
    return res.status(500).json({ Message: err.message });
  }

  return next();
};

const interviewValidation = async (req, res, next) => {
  try {
    await interviewSchema.validateAsync(req.body);
  } catch (err) {
    return res.status(500).json({ Message: err.message });
  }

  return next();
};

const interviewUpdateValidation = async (req,res,next) =>{
    try{
        await interviewUpdateSchema.validateAsync(req.body);
    }catch(err){
        return res.status(500).json({ Message: err.message });
    }
    return next();
}

//token decode

const tokenDecode = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.uid;

    const user = await User.findOne({ uid: userId });

    if (!user) {
      return res.status(404).json({ Message: "User Not Found!" });
    } else {
      req.user = user;
    }
  } catch (err) {
    return res.status(500).json({ Message: err.message });
  }

  return next();
};

//type check

const typeCheck = async (req, res, next) => {
  if (req.user.type != "admin" && req.user.type != "interviewer") {
    return res.status(500).json({ Message: "UnAuthorized for this route" });
  }

  return next();
};


//type check for admin

const typeCheckForAdmin = async (req, res, next) => {
  if (req.user.type != "admin") {
    return res.status(500).json({ Message: "Not Allowed to create interview" });
  }

  return next();
};

module.exports = {
  userValidation,
  tokenDecode,
  typeCheck,
  typeCheckForAdmin,
  interviewValidation,
  interviewUpdateValidation
};
