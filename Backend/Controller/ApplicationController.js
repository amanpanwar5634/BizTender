import Application from "../Models/ApplicationModel.js";
 import Tender from "../Models/TenderModel.js";
 import transporter from "../Config/nodemailer.js";
import Company from "../Models/CompanyModel.js";
export const checkEligibility = async ({ tenderId }) => {
  try { const tenderData = await Tender.findById(tenderId);
    if (!tenderData) { throw new Error("Tender not found"); }
    const now = new Date();
    const isEligible = tenderData.isOpen && now <= new Date(tenderData.deadline);
    return isEligible;
  } catch (err) {
    console.error("Error checking eligibility:", err);
    throw err;
  }
};

//POST/api/bokings/check-availability
// POST /api/applications/check-eligibility
export const checkEligibilityAPI = async (req, res) => {
  try { const { tender } = req.body; // tender is the ID
    const isEligible = await checkEligibility({ tenderId: tender });
    res.json({ success: true, isEligible });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
 
export const createApplication = async (req, res) => {
  try {
    const { tender, proposalAmount } = req.body;
    const user = req.user._id;

    const isEligible = await checkEligibility({ tenderId: tender });
    if (!isEligible) { return res.json({  success: false,  message: "This tender is closed or the deadline has passed.",  }); }

    // 2️⃣ Get related data (company)
    const company = await Company.findOne({ owner: user });

    if (!company) { return res.json({ success: false,  message: "No Company Found for this user.", }); }

    // 3️⃣ Create application
    const application = await Application.create({
      user,
      tender,
      company: company._id,
      proposalAmount: +proposalAmount,
      submittedAt: new Date(),
      status: "pending",
      isSubmitted: true,
    });
const specificTender=await Tender.findById(tender);
console.log(specificTender);
    const mailOptions = {
  from: process.env.SENDER_EMAIL,
  to: req.user.email,
  subject: "Tender Application Submitted",
  html: `
    <h2>Your Tender Application Details</h2>
    <p>Dear ${req.user.username},</p>
    <p>Thank you for submitting your application! Here are the details:</p>
    <ul>
      <li><strong>Tender Title:</strong> ${specificTender.title}</li>
      <li><strong>Industry:</strong> ${specificTender.industry}</li>
      <li><strong>Proposal Amount:</strong> ₹${application.proposalAmount.toLocaleString()}</li>
      <li><strong>Deadline:</strong> ${new Date(specificTender.deadline).toDateString()}</li>
      <li><strong>Submitted At:</strong> ${new Date(application.submittedAt).toDateString()}</li>
    </ul>
    <p>We appreciate your interest and will review your application soon.</p>
    <p>If you have any questions, feel free to reach out.</p>
  `
};

await transporter.sendMail(mailOptions);

    res.json({ success: true,  message: "Application submitted successfully.", data: application, });

  } catch (err) {
    console.log("Error in createApplication ->", err);
    res.json({
      success: false,
      message: "Failed to submit application.",
    });
  }
};
 
//get uuser applicaition
export const getUserApplications = async (req, res) => {
  try { const userId = req.user._id;
    const applications = await Application.find({ user: userId }) .populate("tender company").sort({ createdAt: -1 });
    res.status(200).json({ success: true, applications, });
  } catch (err) {
    console.error("Error in getUserApplications:", err);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user applications",
    });
  }
};
 
export const getCompanyApplications = async (req, res) => {
  try {
    const company = await Company.findOne({ owner: req.user._id });
    if (!company) { return res.json({ success: false,  message: "No company found for this user.", }); }
    const applications = await Application.find({ company: company._id }).populate("tender user company").sort({ createdAt: -1 });

    const totalApplications = applications.length;
    const totalProposalAmount = applications.reduce((acc, app) => acc + app.proposalAmount, 0 );
    res.json({success: true, dashboardData: { totalApplications,totalProposalAmount,applications}, });

  } catch (err) {
    console.error("Error in getCompanyApplications:", err); 
    res.status(500).json({ success: false, message: "Failed to fetch company applications", });
  }
};
export const ownerApplication = async (req, res) => {
  try {
    const ownerId = req.user._id;
    const companies = await Company.find({ owner: ownerId }).select("_id");
    if (!companies || companies.length === 0) {
      return res.json({ success: false, message: "You do not own any company yet." });
    }
    const companyIds = companies.map(c => c._id);
    const tenders = await Tender.find({ company: { $in: companyIds } }).select("_id");
    if (!tenders || tenders.length === 0) {
      return res.json({ success: false, message: "No tenders found for your companies." });
    }
    const tenderIds = tenders.map(t => t._id);
    const applications = await Application.find({ tender: { $in: tenderIds } }) .populate("tender") .populate("user").populate("company");
    res.json({ success: true, applications });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};
export const updateApplicationStatus = async (req, res) => {
  try {
    const { id, action } = req.params;
    const ownerId = req.user._id;
    if (!["approve", "reject"].includes(action)) {
      return res.status(400).json({ success: false, message: "Invalid action." });
    }
    const application = await Application.findById(id).populate("tender");
    if (!application) { return res.status(404).json({ success: false, message: "Application not found." }); }
    const tender = application.tender;
    const company = await Company.findById(tender.company);
    if (!company || company.owner !== ownerId.toString()) {
      return res.status(403).json({ success: false, message: "You are not authorized to update this application.", });
    }
    application.status = action === "approve" ? "approved" : "rejected";
    await application.save();
    res.json({ success: true,  message: `Application ${action === "approve" ? "approved" : "rejected"} successfully.`, });
  } catch (err) {
    console.error("Error updating application status:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

