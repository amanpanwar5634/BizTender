import logo from './logo.svg'
import searchIcon from './searchIcon.svg'
import userIcon from './userIcon.svg'
import calenderIcon from './calenderIcon.svg'
import locationIcon from './locationIcon.svg'
import starIconFilled from './starIconFilled.svg'
import arrowIcon from './arrowIcon.svg'
import starIconOutlined from './starIconOutlined.svg'
import instagramIcon from './instagramIcon.svg'
import facebookIcon from './facebookIcon.svg'
import twitterIcon from './twitterIcon.svg'
import linkendinIcon from './linkendinIcon.svg'
import freeWifiIcon from './freeWifiIcon.svg'
import freeBreakfastIcon from './freeBreakfastIcon.svg'
import roomServiceIcon from './roomServiceIcon.svg'
import mountainIcon from './mountainIcon.svg'
import poolIcon from './poolIcon.svg'
import homeIcon from './homeIcon.svg'
import closeIcon from './closeIcon.svg'
import locationFilledIcon from './locationFilledIcon.svg'
import heartIcon from './heartIcon.svg'
import badgeIcon from './badgeIcon.svg'
import menuIcon from './menuIcon.svg'
import closeMenu from './closeMenu.svg'
import guestsIcon from './guestsIcon.svg'
import roomImg1 from './roomImg1.png'
import roomImg2 from './roomImg2.png'
import roomImg3 from './roomImg3.png'
import roomImg4 from './roomImg4.png'
import regImage from './regImage.png'
import exclusiveOfferCardImg1 from "./exclusiveOfferCardImg1.png";
import exclusiveOfferCardImg2 from "./exclusiveOfferCardImg2.png";
import exclusiveOfferCardImg3 from "./exclusiveOfferCardImg3.png";
import addIcon from "./addIcon.svg";
import dashboardIcon from "./dashboardIcon.svg";
import listIcon from "./listIcon.svg";
import uploadArea from "./uploadArea.svg";
import totalBookingIcon from "./totalBookingIcon.svg";
import totalRevenueIcon from "./totalRevenueIcon.svg";


export const assets = {
    logo,
    searchIcon,
    userIcon,
    calenderIcon,
    locationIcon,
    starIconFilled,
    arrowIcon,
    starIconOutlined,
    instagramIcon,
    facebookIcon,
    twitterIcon,
    linkendinIcon,
    freeWifiIcon,
    freeBreakfastIcon,
    roomServiceIcon,
    mountainIcon,
    poolIcon,
    closeIcon,
    homeIcon,
    locationFilledIcon,
    heartIcon,
    badgeIcon,
    menuIcon,
    closeMenu,
    guestsIcon,
    regImage,
    addIcon,
    dashboardIcon,
    listIcon,
    uploadArea,
    totalBookingIcon,
    totalRevenueIcon,
}

export const cities = [
    "Dubai",
    "Singapore",
    "New York",
    "London",
];

// Exclusive Offers Dummy Data
export const exclusiveOffers = [
    { _id: 1, title: "Summer Escape Package", description: "Enjoy a complimentary night and daily breakfast", priceOff: 25, expiryDate: "Aug 31", image: exclusiveOfferCardImg1 },
    { _id: 2, title: "Romantic Getaway", description: "Special couples package including spa treatment", priceOff: 20, expiryDate: "Sep 20", image: exclusiveOfferCardImg2 },
    { _id: 3, title: "Luxury Retreat", description: "Book 60 days in advance and save on your stay at any of our luxury properties worldwide.", priceOff: 30, expiryDate: "Sep 25", image: exclusiveOfferCardImg3 },
]

// Testimonials Dummy Data
export const testimonials = [
  {
    id: 1,
    name: "Emma Rodriguez",
    company: "ABC Supplies Inc.",
    image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
    rating: 5,
    review: "BizTender has helped us win more contracts by connecting us with top opportunities. The platform is clear and easy to use."
  },
  {
    id: 2,
    name: "Liam Johnson",
    company: "Tech Innovators LLC",
    image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200",
    rating: 4,
    review: "We found multiple tenders in our industry. Applying was seamless and the dashboard is super informative!"
  },
  {
    id: 3,
    name: "Sophia Lee",
    company: "BuildRight Constructions",
    image: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=200",
    rating: 5,
    review: "Our company secured a big project thanks to BizTender. Highly recommended for any B2B supplier looking for growth."
  }
];


// Facility Icon
export const requirementIcons = {
  "ISO Certified": assets.badgeIcon,
  "On-Site Support": assets.locationIcon,
  "Verified Supplier": assets.badgeIcon,
  "Quick Response": assets.arrowIcon,
};
export const platformHighlights = [
  {
    icon: assets.badgeIcon,
    title: "Verified Companies",
    description: "All companies are verified to ensure trustworthy tenders and fair bidding."
  },
  {
    icon: assets.dashboardIcon,
    title: "Easy Application Tracking",
    description: "Manage all your bids in one place with real-time updates."
  },
  {
    icon: assets.arrowIcon,
    title: "Transparent Process",
    description: "Clear deadlines, requirements, and results for every tender."
  },
  {
    icon: assets.userIcon,
    title: "Supportive Community",
    description: "Connect with other suppliers and grow your business network."
  }
];


// User Dummy Data
export const userDummyData = {
  "_id": "user_2unqyL4diJFP1E3pIBnasc7w8hP",
  "username": "Great Stack",
  "email": "user.greatstack@gmail.com",
  "image": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJ2N2c5YVpSSEFVYVUxbmVYZ2JkSVVuWnFzWSJ9",
  "role": "companyOwner",
  "createdAt": "2025-03-25T09:29:16.367Z",
  "updatedAt": "2025-04-10T06:34:48.719Z",
  "__v": 1
};

export const companyDummyData = {
  "_id": "67f76393197ac559e4089b72",
  "name": "Tech Innovators Pvt Ltd",
  "address": "45 Business Avenue, Downtown, New York",
  "contact": "+1 987-654-3210",
  "owner": userDummyData,
  "city": "New York",
  "industry": "IT Services",
  "createdAt": "2025-06-29T10:00:00.000Z",
  "updatedAt": "2025-06-29T10:00:00.000Z",
  "__v": 0
};

// Rooms Dummy Data
export const tendersDummyData = [
  {
    "_id": "67f7647c197ac559e4089b96",
    "company": companyDummyData,
    "title": "Supply of Ergonomic Office Chairs",
    "description": "Seeking bids for supplying 500 ergonomic office chairs with installation.",
    "industry": "Office Supplies",
    "budget": 15000,
    "requirements": ["Delivery & Installation", "Warranty 2 Years", "Sample Approval"],
    "documents": ["specs.pdf", "terms.pdf"],
    "isOpen": true,
    "deadline": "2025-07-31T23:59:59.000Z",
    "createdAt": "2025-04-10T06:26:04.013Z",
    "updatedAt": "2025-04-10T06:26:04.013Z",
    "__v": 0
  },
  {
    "_id": "67f76452197ac559e4089b8e",
    "company": companyDummyData,
    "title": "Website Redesign Project",
    "description": "Looking for an agency to redesign our corporate website.",
    "industry": "IT Services",
    "budget": 25000,
    "requirements": ["Responsive Design", "SEO Friendly", "CMS Integration"],
    "documents": ["RFP.pdf"],
    "isOpen": true,
    "deadline": "2025-08-15T23:59:59.000Z",
    "createdAt": "2025-04-10T06:25:22.593Z",
    "updatedAt": "2025-04-10T06:25:22.593Z",
    "__v": 0
  },
  {
    "_id": "67f76406197ac559e4089b82",
    "company": companyDummyData,
    "title": "IT Support Services",
    "description": "Provide annual IT support and maintenance for 100 workstations.",
    "industry": "IT Services",
    "budget": 12000,
    "requirements": ["24/7 Support", "Onsite Visits", "Quarterly Reviews"],
    "documents": ["SLA.pdf"],
    "isOpen": true,
    "deadline": "2025-09-05T23:59:59.000Z",
    "createdAt": "2025-04-10T06:24:06.285Z",
    "updatedAt": "2025-04-10T06:24:06.285Z",
    "__v": 0
  },
  {
    "_id": "67f763d8197ac559e4089b7a",
    "company": companyDummyData,
    "title": "Office Renovation Contract",
    "description": "Seeking contractors for complete renovation of office premises.",
    "industry": "Construction",
    "budget": 50000,
    "requirements": ["Interior Design", "Civil Work", "Compliance Approvals"],
    "documents": ["layout.pdf", "requirements.pdf"],
    "isOpen": true,
    "deadline": "2025-10-01T23:59:59.000Z",
    "createdAt": "2025-04-10T06:23:20.252Z",
    "updatedAt": "2025-04-10T06:23:20.252Z",
    "__v": 0
  }
];

export const applicationsDummyData = [
  {
    "_id": "67f76839994a731e97d3b8ce",
    "user": userDummyData,
    "tender": tendersDummyData[1],
    "company": companyDummyData,
    "proposalAmount": 24000,
    "status": "pending",
    "submittedAt": "2025-04-30T00:00:00.000Z",
    "isSubmitted": true,
    "createdAt": "2025-04-10T06:42:01.529Z",
    "updatedAt": "2025-04-10T06:43:54.520Z",
    "__v": 0
  },
  {
    "_id": "67f76829994a731e97d3b8c3",
    "user": userDummyData,
    "tender": tendersDummyData[0],
    "company": companyDummyData,
    "proposalAmount": 14500,
    "status": "pending",
    "submittedAt": "2025-04-27T00:00:00.000Z",
    "isSubmitted": true,
    "createdAt": "2025-04-10T06:41:45.873Z",
    "updatedAt": "2025-04-10T06:41:45.873Z",
    "__v": 0
  },
  {
    "_id": "67f76810994a731e97d3b8b4",
    "user": userDummyData,
    "tender": tendersDummyData[3],
    "company": companyDummyData,
    "proposalAmount": 48000,
    "status": "pending",
    "submittedAt": "2025-04-11T00:00:00.000Z",
    "isSubmitted": false,
    "createdAt": "2025-04-10T06:41:20.501Z",
    "updatedAt": "2025-04-10T06:41:20.501Z",
    "__v": 0
  }
];


export const dashboardDummyData = {
  totalTenders: tendersDummyData.length,
  totalCompanies: companyDummyData ? 1 : 0, // or an array length if you have multiple
  totalApplications: applicationsDummyData.length,
  totalBudget: tendersDummyData.reduce((sum, tender) => sum + tender.budget, 0),
  applications: applicationsDummyData
};


// --------- SVG code for Book Icon------
/* 
const BookIcon = ()=>(
    <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
</svg>
)

*/