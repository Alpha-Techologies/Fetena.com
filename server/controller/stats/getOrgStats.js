const Organization = require("../../models/organization.model");
const OrganizationExaminer = require("../../models/organization.examiner.model");
const OrganizationFollower = require("../../models/organization.follower.model");

const catchAsync = require("../../utils/catchAsync");
const { StatusCodes } = require("http-status-codes");
const { default: mongoose } = require("mongoose");
const APIError = require("../../utils/apiError");
const APIFeatures = require("../../utils/apiFeatures");

const countVerifiedOrganizations = async (req) => {
  
  let query = new APIFeatures(Organization.countDocuments(), req.query)
  .filter()
  .field()
  .populate();

const doc = await query.query;
  console.log(doc)
    // const verifiedOrganizations = await Organization.countDocuments({ isVerified: true });
    // console.log(`Verified Organizations: ${verifiedOrganizations}`);
  };

const countOrganizationFollowers = async (organizationId) => {
  const followers = await OrganizationFollower.countDocuments({
    organization: new mongoose.Types.ObjectId(organizationId),
  })  
  return followers 
};

const countOrganizationExaminer = async (organizationId) => {

    const examinersCount = await OrganizationExaminer.countDocuments({
      organization: new mongoose.Types.ObjectId(organizationId),
    })
  
    console.log('Examiners count by organization:', examinersCount);
    return examinersCount
  };

const getActiveExaminers = async (organizationId) => {
  const activeExaminers = await OrganizationExaminer.find({
      organization: new mongoose.Types.ObjectId(organizationId),
      status: "activated",
      userType: "examiner"
  }).populate('user', 'firstName lastName email');

  console.log(`Active Examiners for Organization ${organizationId}:`, activeExaminers);
};


exports.getOrgStats = catchAsync(async (req, res, next) => {
   
    const organizationId = req.params.id;

    const organization = await Organization.findOne({ _id: organizationId });

    if (!organization) {
        next(new APIError("Organization not found", StatusCodes.BAD_REQUEST));
    }

    // countVerifiedOrganizations() 
    const orgs = await countVerifiedOrganizations(req)
    const followers = await countOrganizationFollowers(organization.id)
    const examiners = await countOrganizationExaminer(organizationId)
    const activeExaminers = await getActiveExaminers(organizationId)

    res.status(StatusCodes.ACCEPTED).send({
        orgs,
        followers,
        examiners,
        activeExaminers
    })
    
})