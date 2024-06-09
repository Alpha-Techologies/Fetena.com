const Organization = require("../../models/organization.model");
const OrganizationExaminer = require("../../models/organization.examiner.model");
const OrganizationFollower = require("../../models/organization.follower.model");

const catchAsync = require("../../utils/catchAsync");
const { StatusCodes } = require("http-status-codes");
const { default: mongoose } = require("mongoose");
const APIError = require("../../utils/apiError");

const countVerifiedOrganizations = async () => {
    const verifiedOrganizations = await Organization.countDocuments({ isVerified: true });
    console.log(`Verified Organizations: ${verifiedOrganizations}`);

    return verifiedOrganizations
  };

const countOrganizationFollowers = async (organizationId) => {
  const followers = await OrganizationFollower.aggregate([
      { $match: { organization: new mongoose.Types.ObjectId(organizationId) } },
      { $unwind: "$follower" },
      { $count: "totalFollowers" }
  ]);

  const totalFollowers = followers.length > 0 ? followers[0].totalFollowers : 0;
  console.log(`Total Followers for Organization ${organizationId}: ${totalFollowers}`);
  return totalFollowers
};

const countExaminersByOrganization = async (organizationId) => {
    const examinersCount = await OrganizationExaminer.aggregate([
      { $match: { organization: new mongoose.Types.ObjectId(organizationId), userType: "examiner", status: "activated" } },
      { $group: { _id: "$organization", totalExaminers: { $sum: 1 } } },
      { $lookup: { from: "organizations", localField: "_id", foreignField: "_id", as: "organizationDetails" } },
      { $unwind: "$organizationDetails" },
      { $project: { organizationName: "$organizationDetails.name", totalExaminers: 1 } }
    ]);
  
    console.log('Examiners count by organization:', examinersCount);

    return examinersCount.length
  };

const getActiveExaminers = async (organizationId) => {
const activeExaminers = await OrganizationExaminer.find({
    organization: new mongoose.Types.ObjectId(organizationId),
    status: "activated",
    userType: "examiner"
}).populate('user', 'firstName lastName email');

console.log(`Active Examiners for Organization ${organizationId}:`, activeExaminers);

return activeExaminers.length
};


exports.getOrgStats = catchAsync(async (req, res, next) => {
   
    const organizationId = req.params.id;

    const organization = await Organization.findOne({ _id: organizationId });

    if (!organization) {
        next(new APIError("Organization not found", StatusCodes.BAD_REQUEST));
    }

    const followers = await countOrganizationFollowers(organization.id)
    const examiners = await countExaminersByOrganization(organizationId)
    const activeExaminers = await getActiveExaminers(organizationId)
    const orgs = await countVerifiedOrganizations()

    res.status(StatusCodes.ACCEPTED).send({
        orgs,
        followers,
        examiners,
        activeExaminers
    })

})