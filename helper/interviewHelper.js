const sgMail = require('@sendgrid/mail');
const Interview = require("../models/interview");
sgMail.setApiKey(process.env.API_KEY);

const clashinginterviewHelper = async (
  inputParticipants,
  inputstartDate,
  inputendDate
) => {
  try {
    const clashedInterviews = await Interview.aggregate([
      {
        $match: {
          $and: [
            {
              participants: { $in: inputParticipants },
            },
            // {
            //   $or: [
            //     {
            //       $and: [
            //         {
            //           startDate: { $gte: inputstartDate },
            //         },
            //         {
            //           startDate: { $lte: inputendDate },
            //         },
            //       ],
            //     },

            //     {
            //       $and: [
            //         {
            //           endDate: { $gte: inputstartDate },
            //         },
            //         {
            //           endDate: { $lte: Date(inputendDate) },
            //         },
            //       ],
            //     },
            //   ],
            // },
          ],
        },
      },
    ]);


    if (clashedInterviews.length) {
      let a = new Date(Math.max.apply(Math, clashedInterviews.map(function(o) { return o.startDate; })));
      let b = new Date(Math.min.apply(Math, clashedInterviews.map(function(o) { return o.endDate; })));

      if(Math.max(inputstartDate,a)<=Math.min(inputendDate,b)){
        return true;
      }
    } else {
      return false;
    }
  } catch (err) {
    throw err;
  }
};

const sendMail = (msg) =>{
  


//ES6
sgMail
  .send(msg)
  .then(() => {}, error => {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  });
}

module.exports = {
  clashinginterviewHelper,
  sendMail
};
