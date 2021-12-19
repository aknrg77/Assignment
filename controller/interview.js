const shortid = require("shortid");
const Interview = require("../models/interview");
const { clashinginterviewHelper ,sendMail} = require("../helper/interviewHelper");
const user = require("../models/user");

const createInterview = async (req, res) => {

  let interview;
  const msg = {
    to: '',
    from: 'notification@interview.com', // Use the email address or domain you verified above
    subject: '',
    text: '',
  };
  if (req.method == "POST") {
    interview = new Interview();
    msg.subject = "Interview Scheduled";
    
  } else {
    try {
      msg.subject = "Interview Recheduled";

      interview = await Interview.findOne({ uid: req.params.uid });
      if(!interview){
        return res.status(404).json({ Message: "Interview not found"});
      }
    } catch (err) {
      return res.status(500).json({ Message: err.message });
    }
  }

  interview.uid = interview.uid ? interview.uid : shortid.generate();

  interview.startDate = req.body.startDate
    ? req.body.startDate
    : interview.startDate;

  interview.endDate = req.body.endDate ? req.body.endDate : interview.endDate;

  let parti = [];
  if(req.body.participants.length >=2){
    req.body.participants.forEach(element => {
      parti.push(element.value);
    });

  interview.participants = parti;

  msg.text = `Your Interview timing is from ${interview.startDate} to ${interview.endDate}`;

  
  //check clashing interview if any
  const checkClashingInterview = await clashinginterviewHelper(
    interview.participants , interview.startDate , interview.endDate
);
  if (checkClashingInterview) {
    return res
      .status(400)
      .json({ Message: "Participants have already interview scheduled" });
  }

  try {
    msg.to = await user.find({uid: {$in : interview.participants}});
    await interview.save();
    sendMail(msg);
  } catch (err) {
    return res.status(500).json({ Message: err.message });
  }

  return res.status(200).json({ Message: "Interview Scheduled Succesfully" });


  }else{
    return res.status(400).json({ Message: "Less Than 2 Participants not allowed" });
  }
  



};

const getAllUpcomingInterviews = async (req, res) => {
  
  let AllInterviews;

  try {
    AllInterviews = await Interview.find({
      startDate: { $gte: new Date() },
      $orderby: { startDate: 1 },
    });
  } catch (err) {
    return res.status(500).json({ Message: err.message });
  }

  return res.status(200).json(AllInterviews);
};

const listInterviewById = async(req,res) =>{
  
  let uid  = req.params.uid

  let showInterview;
  try{
    showInterview = await Interview.find({uid : uid});

  }catch(err){
      return res.status(500).json({"Message" : err.message});
  }

  return res.status(200).json(showInterview[0]);
}

module.exports = {
  createInterview,
  getAllUpcomingInterviews,
  listInterviewById
};
