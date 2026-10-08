// Memory Data Store & Database Seed for FindIt Woxsen University
import bcrypt from 'bcryptjs';

export const USER_PASSWORDS = {
  student: 'Woxsen#Student2026!',
  priya: 'Priya@Woxsen987!',
  security: 'Woxsen#SecurityHQ99!',
  admin: 'Woxsen#AdminDean2026*'
};

const studentPasswordHash = bcrypt.hashSync(USER_PASSWORDS.student, 10);
const priyaPasswordHash = bcrypt.hashSync(USER_PASSWORDS.priya, 10);
const securityPasswordHash = bcrypt.hashSync(USER_PASSWORDS.security, 10);
const adminPasswordHash = bcrypt.hashSync(USER_PASSWORDS.admin, 10);

export const categoriesData = [
  { id: 'electronics', name: 'Electronics', icon: 'Cpu', count: 18, image: '/images/item_smartphone_1791181014540.jpg' },
  { id: 'mobile-phones', name: 'Mobile Phones', icon: 'Smartphone', count: 12, image: '/images/item_smartphone_1791181014540.jpg' },
  { id: 'laptops', name: 'Laptops', icon: 'Laptop', count: 6, image: '/images/item_smartphone_1791181014540.jpg' },
  { id: 'tablets', name: 'Tablets', icon: 'Tablet', count: 4, image: '/images/item_smartphone_1791181014540.jpg' },
  { id: 'earbuds', name: 'Earbuds / Headphones', icon: 'Headphones', count: 15, image: '/images/item_smartphone_1791181014540.jpg' },
  { id: 'chargers', name: 'Chargers & Cables', icon: 'Zap', count: 22, image: '/images/item_smartphone_1791181014540.jpg' },
  { id: 'id-cards', name: 'ID Cards / Student IDs', icon: 'CreditCard', count: 35, image: '/images/item_wallet_1791180978617.jpg' },
  { id: 'wallets', name: 'Wallets & Purses', icon: 'Wallet', count: 14, image: '/images/item_wallet_1791180978617.jpg' },
  { id: 'bags', name: 'Bags & Backpacks', icon: 'Briefcase', count: 19, image: '/images/item_wallet_1791180978617.jpg' },
  { id: 'watches', name: 'Watches & Wearables', icon: 'Watch', count: 12, image: '/images/item_smartphone_1791181014540.jpg' },
  { id: 'jewellery', name: 'Jewellery', icon: 'Gem', count: 5, image: '/images/item_wallet_1791180978617.jpg' },
  { id: 'keys', name: 'Keys & Keychains', icon: 'Key', count: 27, image: '/images/item_wallet_1791180978617.jpg' },
  { id: 'books', name: 'Books & Notebooks', icon: 'BookOpen', count: 16, image: '/images/item_wallet_1791180978617.jpg' },
  { id: 'clothing', name: 'Clothing & Jackets', icon: 'Shirt', count: 11, image: '/images/item_wallet_1791180978617.jpg' },
  { id: 'sports', name: 'Sports Equipment', icon: 'Dumbbell', count: 9, image: '/images/woxsen_campus_hero_1791180691115.jpg' },
  { id: 'water-bottles', name: 'Water Bottles', icon: 'GlassWater', count: 31, image: '/images/item_smartphone_1791181014540.jpg' },
  { id: 'glasses', name: 'Glasses & Eyewear', icon: 'Glasses', count: 7, image: '/images/item_smartphone_1791181014540.jpg' },
  { id: 'umbrellas', name: 'Umbrellas', icon: 'Umbrella', count: 13, image: '/images/woxsen_campus_hero_1791180691115.jpg' },
  { id: 'documents', name: 'Documents & Files', icon: 'FileText', count: 6, image: '/images/item_wallet_1791180978617.jpg' },
  { id: 'other', name: 'Other Accessories', icon: 'Box', count: 10, image: '/images/smart_matching_nodes_1791180753977.jpg' }
];

export const woxsenLocationsData = [
  { id: 'main-entrance', name: 'Main Entrance', type: 'Security' },
  { id: 'security-office', name: 'Security Office / Main Gate Desk', type: 'Security' },
  { id: 'reception', name: 'University Reception & Visitor Desk', type: 'Admin' },
  { id: 'academic-block', name: 'Academic Block', floors: ['Ground Floor', 'Floor 1', 'Floor 2', 'Floor 3', 'Floor 4'] },
  { id: 'lecture-complex', name: 'Lecture Complex & Seminar Halls', floors: ['Ground Floor', 'Floor 1', 'Floor 2'] },
  { id: 'auditorium', name: 'University Auditorium', type: 'Events' },
  { id: 'amphitheatre', name: 'Open Air Amphitheatre', type: 'Events' },
  { id: 'central-library', name: 'Vithal Gandhi Centre / Central Library', floors: ['Ground Floor', 'Floor 1', 'Floor 2', 'Digital Lab'] },
  { id: 'admin-block', name: 'Admin Block & Deans Office', floors: ['Ground Floor', 'Floor 1', 'Floor 2'] },
  { id: 'trade-tower', name: 'Trade Tower & Incubation Center', floors: ['Ground Floor', 'Floor 1', 'Floor 2', 'Floor 3'] },
  { id: 'gateway', name: 'The Gateway Arch', type: 'Landmark' },
  { id: 'cup-of-joe', name: 'A Cup of Joe (Cafe)', type: 'Dining' },
  { id: 'ink-and-water', name: 'Ink & Water Stationer', type: 'Store' },
  { id: 'care-and-cure', name: 'Care & Cure Campus Health Center', type: 'Medical' },
  { id: 'rise-cafe', name: 'Rise Cafe & Bistro', type: 'Dining' },
  { id: 'oval-dining', name: 'Oval Dining Hall', floors: ['Ground Floor', 'First Floor Mezzanine'] },
  { id: 'hostel-a', name: 'Hostel A (Boys)', floors: ['Floor 1', 'Floor 2', 'Floor 3', 'Floor 4'] },
  { id: 'hostel-b', name: 'Hostel B (Boys)', floors: ['Floor 1', 'Floor 2', 'Floor 3', 'Floor 4'] },
  { id: 'hostel-c', name: 'Hostel C (Girls)', floors: ['Floor 1', 'Floor 2', 'Floor 3', 'Floor 4'] },
  { id: 'hostel-d', name: 'Hostel D (Girls)', floors: ['Floor 1', 'Floor 2', 'Floor 3', 'Floor 4'] },
  { id: 'hostel-e', name: 'Hostel E (Executive)', floors: ['Floor 1', 'Floor 2', 'Floor 3'] },
  { id: 'hostel-f', name: 'Hostel F (International)', floors: ['Floor 1', 'Floor 2', 'Floor 3'] },
  { id: 'race', name: 'R.A.C.E Sports Arena', type: 'Sports' },
  { id: 'the-league', name: 'The League Gaming Lounge', type: 'Recreation' },
  { id: 'sportx', name: 'SportX Complex & Indoor Courts', type: 'Sports' },
  { id: 'icc-ground', name: 'ICC Standard Cricket Ground', type: 'Sports' },
  { id: 'swimming-pool', name: 'Olympic Swimming Pool', type: 'Sports' },
  { id: 'blue-embers', name: 'Blue Embers Restaurant', type: 'Dining' },
  { id: 'womens-gym', name: 'Women Fitness Center & Gym', type: 'Sports' },
  { id: 'cafeteria', name: 'Central Food Court & Cafeteria', type: 'Dining' },
  { id: 'football-field', name: 'Football Pitch', type: 'Sports' },
  { id: 'play-courts', name: 'Tennis & Basketball Courts', type: 'Sports' },
  { id: 'golf-course', name: 'Mini Golf Greens', type: 'Sports' },
  { id: 'community-park', name: 'Community Park & Botanical Walkway', type: 'Outdoor' },
  { id: 'community-market', name: 'Community Market & Express Mart', type: 'Store' },
  { id: 'faculty-housing', name: 'Faculty Housing Quarter', type: 'Residential' },
  { id: 'staff-housing', name: 'Staff Housing & Guest Villas', type: 'Residential' },
  { id: 'executive-villas', name: 'Executive Villas', type: 'Residential' },
  { id: 'parking-areas', name: 'Visitor & Student Parking Areas', type: 'Parking' }
];

export const initialUsers = [
  {
    _id: 'usr_student_1',
    name: 'Aarav Sharma',
    email: 'student@woxsen.edu.in',
    password: studentPasswordHash,
    plainPassword: USER_PASSWORDS.student,
    role: 'student',
    gender: 'male',
    studentId: 'WX2024ST091',
    course: 'B.Tech Computer Science',
    year: '3rd Year',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=250',
    itemsLostCount: 4,
    itemsFoundCount: 2,
    itemsReturnedCount: 3
  },
  {
    _id: 'usr_student_2',
    name: 'Priya Reddy',
    email: 'priya.reddy@woxsen.edu.in',
    password: priyaPasswordHash,
    plainPassword: USER_PASSWORDS.priya,
    role: 'student',
    gender: 'female',
    studentId: 'WX2024BA114',
    course: 'BBA Business Analytics',
    year: '2nd Year',
    phone: '+91 98123 76543',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250',
    itemsLostCount: 2,
    itemsFoundCount: 5,
    itemsReturnedCount: 4
  },
  {
    _id: 'usr_security_1',
    name: 'Officer R. K. Verma',
    email: 'security@woxsen.edu.in',
    password: securityPasswordHash,
    plainPassword: USER_PASSWORDS.security,
    role: 'security',
    studentId: 'WX-SEC-004',
    course: 'Campus Security Desk Chief',
    year: 'Staff',
    phone: '+91 84488 11000',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250',
    itemsLostCount: 0,
    itemsFoundCount: 24,
    itemsReturnedCount: 248
  },
  {
    _id: 'usr_admin_1',
    name: 'Dr. S. Mukherjee',
    email: 'admin@woxsen.edu.in',
    password: adminPasswordHash,
    plainPassword: USER_PASSWORDS.admin,
    role: 'admin',
    studentId: 'WX-ADM-001',
    course: 'Dean of Student Affairs',
    year: 'Administration',
    phone: '+91 84488 11001',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=250',
    itemsLostCount: 0,
    itemsFoundCount: 0,
    itemsReturnedCount: 310
  }
];

export const initialItems = [
  {
    _id: 'item_101',
    reportId: 'WX-LOST-1048',
    type: 'lost',
    name: 'Black Leather Wallet',
    category: 'Wallets & Purses',
    description: 'Black genuine leather bi-fold wallet containing student ID card, HDFC debit card, and cash. Has a small gold embossed logo inside.',
    color: 'Black',
    brand: 'WildHorn',
    distinctiveFeatures: 'Small scratch on bottom left corner, contains silver coin inside zipper coin pouch',
    location: {
      building: 'Vithal Gandhi Centre / Central Library',
      floor: 'Floor 1',
      roomArea: 'Quiet Study Zone / Table 14',
      specificLocation: 'Left near desk 14 after 4 PM study session'
    },
    date: '2026-10-04',
    time: '16:15',
    postedBy: { _id: 'usr_student_1', name: 'Aarav Sharma', email: 'student@woxsen.edu.in', role: 'student' },
    images: ['/images/item_wallet_1791180978617.jpg'],
    status: 'Looking for Owner',
    matchPercentage: 94,
    isWithFinder: false,
    handedToSecurity: false,
    collectionDetails: { isCollected: false },
    historyTimeline: [
      { date: '2026-10-04 16:30', title: 'Item Reported', description: 'Lost report filed by Aarav Sharma', actor: 'Aarav Sharma' },
      { date: '2026-10-04 17:00', title: 'Possible Match Detected', description: 'Smart Match engine flagged 94% compatibility with WX-FOUND-2048', actor: 'FindIt AI System' }
    ],
    createdAt: '2026-10-04T16:30:00Z'
  },
  {
    _id: 'item_102',
    reportId: 'WX-FOUND-2048',
    type: 'found',
    name: 'Blue Smartphone',
    category: 'Mobile Phones',
    description: 'Deep blue Google Pixel smartphone with a clear transparent silicone cover and screen guard. Found left on table at Academic Block.',
    color: 'Deep Blue',
    brand: 'Google Pixel',
    distinctiveFeatures: 'Wallpaper is a mountain sunset. Has a Woxsen wifi connection notice on lock screen.',
    location: {
      building: 'Academic Block',
      floor: 'Floor 2',
      roomArea: 'Room 204',
      specificLocation: 'On second row bench near podium'
    },
    date: '2026-10-05',
    time: '09:30',
    postedBy: { _id: 'usr_student_2', name: 'Priya Reddy', email: 'priya.reddy@woxsen.edu.in', role: 'student' },
    images: ['/images/item_smartphone_1791181014540.jpg'],
    status: 'Collected',
    matchPercentage: 88,
    isWithFinder: false,
    handedToSecurity: true,
    collectionDetails: {
      isCollected: true,
      collectedBy: 'Woxsen Security Desk (Officer R. K. Verma)',
      collectionLocation: 'Main Entrance / Security Office Desk',
      collectionDate: '2026-10-05T10:00:00Z',
      lockerNumber: 'Security Locker 04'
    },
    historyTimeline: [
      { date: '2026-10-05 09:35', title: 'Item Reported', description: 'Found report created by Priya Reddy', actor: 'Priya Reddy' },
      { date: '2026-10-05 10:00', title: 'Collected by Security Desk', description: 'Handed over to Officer Verma at Main Entrance Desk. Logged into Security Locker 04', actor: 'Officer R. K. Verma' }
    ],
    createdAt: '2026-10-05T09:35:00Z'
  },
  {
    _id: 'item_110',
    reportId: 'WX-FOUND-2053',
    type: 'found',
    name: 'Apple Watch Series 9 Space Black Smartwatch',
    category: 'Watches & Wearables',
    description: 'Apple Watch Series 9 45mm GPS Smartwatch in Space Black Aluminum with dark blue sport loop strap.',
    color: 'Space Black / Blue Band',
    brand: 'Apple',
    distinctiveFeatures: 'Display screen shows battery charging icon and digital clock with red seconds circle',
    location: {
      building: 'SportX Complex & Indoor Courts',
      floor: 'Floor 1',
      roomArea: 'Locker Room 03 Bench',
      specificLocation: 'Found on bench near gym locker 14'
    },
    date: '2026-10-05',
    time: '14:00',
    postedBy: { _id: 'usr_security_1', name: 'Officer R. K. Verma', email: 'security@woxsen.edu.in', role: 'security' },
    images: ['/images/item_smartphone_1791181014540.jpg'],
    status: 'Collected',
    matchPercentage: 92,
    isWithFinder: false,
    handedToSecurity: true,
    collectionDetails: {
      isCollected: true,
      collectedBy: 'Woxsen Security Desk',
      collectionLocation: 'Main Security HQ Office',
      collectionDate: '2026-10-05T14:15:00Z',
      lockerNumber: 'Security Locker 02'
    },
    historyTimeline: [
      { date: '2026-10-05 14:15', title: 'Smartwatch Logged at Security', description: 'Apple Watch Series 9 secured in Locker 02', actor: 'Officer R. K. Verma' }
    ],
    createdAt: '2026-10-05T14:15:00Z'
  },
  {
    _id: 'item_103',
    reportId: 'WX-LOST-1049',
    type: 'lost',
    name: 'Silver MacBook Pro 14"',
    category: 'Laptops',
    description: 'Apple MacBook Pro 14-inch M2 Pro in Silver color. Kept inside a dark grey felt sleeve with an anchor sticker.',
    color: 'Silver / Grey Sleeve',
    brand: 'Apple',
    distinctiveFeatures: 'Small sticker of GitHub Mona Cat and Trade Tower logo on sleeve',
    location: {
      building: 'Trade Tower',
      floor: 'Floor 2',
      roomArea: 'Incubation Lab 202',
      specificLocation: 'Right beside charging station 3'
    },
    date: '2026-10-04',
    time: '18:00',
    postedBy: { _id: 'usr_student_1', name: 'Aarav Sharma', email: 'student@woxsen.edu.in', role: 'student' },
    images: ['/images/item_smartphone_1791181014540.jpg'],
    status: 'Claim Under Review',
    matchPercentage: 91,
    isWithFinder: false,
    handedToSecurity: true,
    collectionDetails: {
      isCollected: true,
      collectedBy: 'Woxsen Security Desk',
      collectionLocation: 'Security Office Desk',
      collectionDate: '2026-10-04T19:30:00Z',
      lockerNumber: 'Security Vault A-01'
    },
    historyTimeline: [
      { date: '2026-10-04 18:15', title: 'Item Reported Lost', description: 'Reported lost by Aarav Sharma', actor: 'Aarav Sharma' },
      { date: '2026-10-04 19:30', title: 'Secured at Security HQ', description: 'Found by lab assistant and safely stored at Security Vault A-01', actor: 'Security HQ' },
      { date: '2026-10-05 08:30', title: 'Claim Submitted', description: 'Aarav submitted detailed security proof answers', actor: 'Aarav Sharma' },
      { date: '2026-10-05 09:00', title: 'Verification Pending', description: 'Security Staff reviewing ownership verification answers', actor: 'Officer R. K. Verma' }
    ],
    createdAt: '2026-10-04T18:15:00Z'
  },
  {
    _id: 'item_111',
    reportId: 'WX-FOUND-2054',
    type: 'found',
    name: 'Silver Key Ring with 3 Hostel Keys & Leather Tag',
    category: 'Keys & Keychains',
    description: 'Set of 3 hostel door keys on a heavy stainless steel ring with a brown leather keychain tag.',
    color: 'Silver / Brown Leather',
    brand: 'Godrej Keys',
    distinctiveFeatures: 'Leather tag stamped with letter "A" and Hostel B room code',
    location: {
      building: 'Open Air Amphitheatre',
      floor: 'Ground Level',
      roomArea: 'Tier 3 Bench Seats',
      specificLocation: 'Center row seating step near sound booth'
    },
    date: '2026-10-05',
    time: '08:15',
    postedBy: { _id: 'usr_security_1', name: 'Officer R. K. Verma', email: 'security@woxsen.edu.in', role: 'security' },
    images: ['/images/item_wallet_1791180978617.jpg'],
    status: 'Collected',
    matchPercentage: 90,
    isWithFinder: false,
    handedToSecurity: true,
    collectionDetails: {
      isCollected: true,
      collectedBy: 'Woxsen Security Desk',
      collectionLocation: 'Main Entrance Security Office',
      collectionDate: '2026-10-05T08:30:00Z',
      lockerNumber: 'Security Locker 07'
    },
    historyTimeline: [
      { date: '2026-10-05 08:30', title: 'Keys Logged at Security', description: 'Keys handed to security by maintenance staff and stored in Locker 07', actor: 'Officer R. K. Verma' }
    ],
    createdAt: '2026-10-05T08:30:00Z'
  },
  {
    _id: 'item_112',
    reportId: 'WX-LOST-1052',
    type: 'lost',
    name: 'Fundamentals of Machine Learning Hardcover Textbook',
    category: 'Books & Notebooks',
    description: 'Heavy hardcover AI/ML university textbook by OReilly Press. Contains handwritten margin notes and yellow highlighter marks.',
    color: 'Blue & White Cover',
    brand: 'OReilly Media',
    distinctiveFeatures: 'Has a blue sticky note bookmark on page 142 and student name on inside cover',
    location: {
      building: 'Vithal Gandhi Centre / Central Library',
      floor: 'Floor 2',
      roomArea: 'Computer Lab Desk 18',
      specificLocation: 'Left beside desktop workstation 18'
    },
    date: '2026-10-05',
    time: '13:00',
    postedBy: { _id: 'usr_student_1', name: 'Aarav Sharma', email: 'student@woxsen.edu.in', role: 'student' },
    images: ['/images/item_wallet_1791180978617.jpg'],
    status: 'Looking for Owner',
    matchPercentage: 84,
    isWithFinder: false,
    handedToSecurity: false,
    collectionDetails: { isCollected: false },
    historyTimeline: [
      { date: '2026-10-05 13:15', title: 'Textbook Reported Lost', description: 'Report filed by Aarav Sharma', actor: 'Aarav Sharma' }
    ],
    createdAt: '2026-10-05T13:15:00Z'
  },
  {
    _id: 'item_104',
    reportId: 'WX-FOUND-2049',
    type: 'found',
    name: 'Woxsen University Student ID Card',
    category: 'ID Cards / Student IDs',
    description: 'Official Woxsen University student identity card attached to a blue Woxsen lanyard.',
    color: 'Blue Lanyard / White Card',
    brand: 'Woxsen University',
    distinctiveFeatures: 'Name: Rohan Mehta, Roll No: WX2023CS042',
    location: {
      building: 'Oval Dining Hall',
      floor: 'Ground Floor',
      roomArea: 'Near Juice Counter',
      specificLocation: 'On dining table 8'
    },
    date: '2026-10-05',
    time: '12:30',
    postedBy: { _id: 'usr_student_2', name: 'Priya Reddy', email: 'priya.reddy@woxsen.edu.in', role: 'student' },
    images: ['/images/item_wallet_1791180978617.jpg'],
    status: 'Handover Scheduled',
    matchPercentage: 98,
    isWithFinder: false,
    handedToSecurity: true,
    collectionDetails: {
      isCollected: true,
      collectedBy: 'Woxsen Security Desk',
      collectionLocation: 'Main Entrance / Security Desk',
      collectionDate: '2026-10-05T12:45:00Z',
      lockerNumber: 'Locker 02'
    },
    handoverDetails: {
      handoverId: 'WX-HO-1024',
      scheduledDate: '2026-10-05',
      scheduledTime: '16:30',
      location: 'Woxsen Security Desk (Main Entrance)',
      returnedTo: 'Rohan Mehta',
      verifiedBy: 'Officer R. K. Verma'
    },
    historyTimeline: [
      { date: '2026-10-05 12:30', title: 'ID Card Found', description: 'Reported by Priya Reddy', actor: 'Priya Reddy' },
      { date: '2026-10-05 12:45', title: 'Handed to Security', description: 'Stored in Locker 02', actor: 'Security Staff' },
      { date: '2026-10-05 13:10', title: 'Claim Approved', description: 'Verified via student record lookup', actor: 'Officer R. K. Verma' },
      { date: '2026-10-05 13:15', title: 'Handover Scheduled', description: 'Handover code WX-HO-1024 issued for 4:30 PM collection', actor: 'FindIt System' }
    ],
    createdAt: '2026-10-05T12:30:00Z'
  },
  {
    _id: 'item_105',
    reportId: 'WX-LOST-1050',
    type: 'lost',
    name: 'AirPods Pro Gen 2 in Clear Case',
    category: 'Earbuds / Headphones',
    description: 'Apple AirPods Pro in white wireless charging case with a transparent Spigen protective case.',
    color: 'White',
    brand: 'Apple',
    distinctiveFeatures: 'Has a small red lanyard loop attached to case',
    location: {
      building: 'SportX Complex & Indoor Courts',
      floor: 'Floor 1',
      roomArea: 'Badminton Court 2 Bench',
      specificLocation: 'Left on spectator bench during afternoon match'
    },
    date: '2026-10-03',
    time: '17:00',
    postedBy: { _id: 'usr_student_1', name: 'Aarav Sharma', email: 'student@woxsen.edu.in', role: 'student' },
    images: ['/images/item_smartphone_1791181014540.jpg'],
    status: 'Returned',
    matchPercentage: 96,
    isWithFinder: false,
    handedToSecurity: true,
    collectionDetails: {
      isCollected: true,
      collectedBy: 'Woxsen Security Desk',
      collectionLocation: 'Main Security HQ',
      collectionDate: '2026-10-03T18:00:00Z',
      lockerNumber: 'Locker 09'
    },
    handoverDetails: {
      handoverId: 'WX-HO-1019',
      scheduledDate: '2026-10-03',
      scheduledTime: '19:00',
      location: 'Security Main Entrance Desk',
      returnedTo: 'Aarav Sharma',
      verifiedBy: 'Officer R. K. Verma',
      completedAt: '2026-10-03T19:05:00Z'
    },
    historyTimeline: [
      { date: '2026-10-03 17:15', title: 'AirPods Reported Lost', description: 'Report filed by Aarav Sharma', actor: 'Aarav Sharma' },
      { date: '2026-10-03 18:00', title: 'Collected at Security', description: 'Badminton court manager handed over items', actor: 'Security Staff' },
      { date: '2026-10-03 18:30', title: 'Claim Verified', description: 'SerialNumber matched invoice screenshot', actor: 'Officer R. K. Verma' },
      { date: '2026-10-03 19:05', title: 'Returned Successfully', description: 'Item handed over in person. Status closed.', actor: 'Officer R. K. Verma' }
    ],
    createdAt: '2026-10-03T17:15:00Z'
  },
  {
    _id: 'item_106',
    reportId: 'WX-FOUND-2050',
    type: 'found',
    name: 'Black Tech Backpack (Nike)',
    category: 'Bags & Backpacks',
    description: 'Black Nike utility backpack containing notebooks, water bottle, and calculator.',
    color: 'Black',
    brand: 'Nike',
    distinctiveFeatures: 'Has a silver carabiner clip on right strap',
    location: {
      building: 'Vithal Gandhi Centre / Central Library',
      floor: 'Ground Floor',
      roomArea: 'Reading Hall Desk 05',
      specificLocation: 'Under table 05 near main entrance'
    },
    date: '2026-10-05',
    time: '08:00',
    postedBy: { _id: 'usr_security_1', name: 'Officer R. K. Verma', email: 'security@woxsen.edu.in', role: 'security' },
    images: ['/images/item_wallet_1791180978617.jpg'],
    status: 'Collected',
    matchPercentage: 75,
    isWithFinder: false,
    handedToSecurity: true,
    collectionDetails: {
      isCollected: true,
      collectedBy: 'Woxsen Security Desk',
      collectionLocation: 'Main Security Office',
      collectionDate: '2026-10-05T08:15:00Z',
      lockerNumber: 'Security Locker 12'
    },
    historyTimeline: [
      { date: '2026-10-05 08:15', title: 'Found & Logged by Security', description: 'Discovered during morning campus patrol and placed in Locker 12', actor: 'Officer R. K. Verma' }
    ],
    createdAt: '2026-10-05T08:15:00Z'
  },
  {
    _id: 'item_107',
    reportId: 'WX-FOUND-2051',
    type: 'found',
    name: '65W Anker USB-C Fast Charger',
    category: 'Chargers & Cables',
    description: 'Black Anker 65W GaN fast charging brick with 2-meter braided C-to-C cable.',
    color: 'Black',
    brand: 'Anker',
    distinctiveFeatures: 'Has a small blue tape ring around cable end',
    location: {
      building: 'A Cup of Joe (Cafe)',
      floor: 'Ground Floor',
      roomArea: 'Outdoor Patio Desk 4',
      specificLocation: 'Plugged into patio wall socket'
    },
    date: '2026-10-05',
    time: '11:20',
    postedBy: { _id: 'usr_student_2', name: 'Priya Reddy', email: 'priya.reddy@woxsen.edu.in', role: 'student' },
    images: ['/images/item_smartphone_1791181014540.jpg'],
    status: 'Reported',
    matchPercentage: 82,
    isWithFinder: true,
    handedToSecurity: false,
    collectionDetails: { isCollected: false },
    historyTimeline: [
      { date: '2026-10-05 11:25', title: 'Found Report Created', description: 'Charger found at Cafe patio', actor: 'Priya Reddy' }
    ],
    createdAt: '2026-10-05T11:25:00Z'
  },
  {
    _id: 'item_108',
    reportId: 'WX-LOST-1051',
    type: 'lost',
    name: 'Hydro Flask Insulated Blue Water Bottle',
    category: 'Water Bottles',
    description: 'Stainless steel 32oz Hydro Flask in Pacific Blue color with flex cap.',
    color: 'Pacific Blue',
    brand: 'Hydro Flask',
    distinctiveFeatures: 'Woxsen R.A.C.E sports logo sticker on bottle side',
    location: {
      building: 'ICC Standard Cricket Ground',
      floor: 'Ground',
      roomArea: 'Players Dugout Area',
      specificLocation: 'Left on dugout bench after practice'
    },
    date: '2026-10-04',
    time: '17:30',
    postedBy: { _id: 'usr_student_1', name: 'Aarav Sharma', email: 'student@woxsen.edu.in', role: 'student' },
    images: ['/images/item_smartphone_1791181014540.jpg'],
    status: 'Looking for Owner',
    matchPercentage: 70,
    isWithFinder: false,
    handedToSecurity: false,
    collectionDetails: { isCollected: false },
    historyTimeline: [
      { date: '2026-10-04 18:00', title: 'Water Bottle Reported Lost', description: 'Report filed by Aarav', actor: 'Aarav Sharma' }
    ],
    createdAt: '2026-10-04T18:00:00Z'
  },
  {
    _id: 'item_113',
    reportId: 'WX-LOST-1053',
    type: 'lost',
    name: 'Ray-Ban Black Aviator Sunglasses',
    category: 'Glasses & Eyewear',
    description: 'Classic Ray-Ban black metal frame aviator sunglasses inside a black leather case.',
    color: 'Black Metal / Dark Lenses',
    brand: 'Ray-Ban',
    distinctiveFeatures: 'Ray-Ban G-15 logo etched on top corner of left lens',
    location: {
      building: 'Rise Cafe & Bistro',
      floor: 'Ground Floor',
      roomArea: 'Window Counter Table 2',
      specificLocation: 'Left beside espresso machine counter'
    },
    date: '2026-10-05',
    time: '15:10',
    postedBy: { _id: 'usr_student_2', name: 'Priya Reddy', email: 'priya.reddy@woxsen.edu.in', role: 'student' },
    images: ['/images/item_smartphone_1791181014540.jpg'],
    status: 'Looking for Owner',
    matchPercentage: 78,
    isWithFinder: false,
    handedToSecurity: false,
    collectionDetails: { isCollected: false },
    historyTimeline: [
      { date: '2026-10-05 15:30', title: 'Sunglasses Reported Lost', description: 'Report created by Priya', actor: 'Priya Reddy' }
    ],
    createdAt: '2026-10-05T15:30:00Z'
  },
  {
    _id: 'item_114',
    reportId: 'WX-FOUND-2055',
    type: 'found',
    name: 'Automatic Black Windproof Umbrella',
    category: 'Umbrellas',
    description: 'Compact 8-rib automatic open-close umbrella in solid matte black.',
    color: 'Black',
    brand: 'Repel',
    distinctiveFeatures: 'Has a wrist strap and small silver button on handle',
    location: {
      building: 'Academic Block',
      floor: 'Ground Floor Entrance',
      roomArea: 'Umbrella Stand near elevator 1',
      specificLocation: 'Left in blue umbrella holder'
    },
    date: '2026-10-05',
    time: '16:00',
    postedBy: { _id: 'usr_security_1', name: 'Officer R. K. Verma', email: 'security@woxsen.edu.in', role: 'security' },
    images: ['/images/woxsen_campus_hero_1791180691115.jpg'],
    status: 'Collected',
    matchPercentage: 60,
    isWithFinder: false,
    handedToSecurity: true,
    collectionDetails: {
      isCollected: true,
      collectedBy: 'Woxsen Security Desk',
      collectionLocation: 'Main Gate Security Office',
      collectionDate: '2026-10-05T16:15:00Z',
      lockerNumber: 'Security Locker 10'
    },
    historyTimeline: [
      { date: '2026-10-05 16:15', title: 'Umbrella Logged', description: 'Logged into Locker 10', actor: 'Officer R. K. Verma' }
    ],
    createdAt: '2026-10-05T16:15:00Z'
  }
];

export const initialClaims = [
  {
    _id: 'claim_201',
    claimId: 'WX-CLM-501',
    itemId: 'item_103',
    itemReportId: 'WX-LOST-1049',
    itemName: 'Silver MacBook Pro 14"',
    claimant: {
      _id: 'usr_student_1',
      name: 'Aarav Sharma',
      email: 'student@woxsen.edu.in',
      studentId: 'WX2024ST091'
    },
    verificationAnswers: [
      { question: 'What sticker or unique mark is on the laptop case?', answer: 'GitHub Mona Cat sticker and Trade Tower logo sticker' },
      { question: 'What is the serial number or wallpaper background?', answer: 'Serial ends in 492X, wallpaper is default MacOS Sonoma Sonoma blue' },
      { question: 'What was inside the laptop bag/sleeve pocket?', answer: 'Anker 65W GaN charger and USB-C braided cable' }
    ],
    proofImages: ['/images/item_smartphone_1791181014540.jpg'],
    status: 'Claim Under Review',
    submittedAt: '2026-10-05T08:30:00Z'
  }
];

export const initialMatches = [
  {
    _id: 'match_301',
    lostItemId: 'item_101',
    foundItemId: 'item_102',
    matchScore: 94,
    reasons: [
      'Same campus area (Vithal Gandhi / Academic Block)',
      'Similar date reported (Oct 4 & Oct 5)',
      'High compatibility profile'
    ],
    status: 'Suggested'
  }
];

export const initialMessages = [
  {
    _id: 'msg_401',
    conversationId: 'conv_101_102',
    itemId: 'item_101',
    sender: { _id: 'usr_student_2', name: 'Priya Reddy', role: 'student' },
    recipient: { _id: 'usr_student_1', name: 'Aarav Sharma', role: 'student' },
    text: 'Hi Aarav, I saw your post for the lost black wallet. I handed a similar wallet to the Security Desk at Main Gate around 10 AM.',
    timestamp: '2026-10-05T10:15:00Z'
  },
  {
    _id: 'msg_402',
    conversationId: 'conv_101_102',
    itemId: 'item_101',
    sender: { _id: 'usr_student_1', name: 'Aarav Sharma', role: 'student' },
    recipient: { _id: 'usr_student_2', name: 'Priya Reddy', role: 'student' },
    text: 'Thank you so much Priya! Did you notice if there was a Woxsen ID inside?',
    timestamp: '2026-10-05T10:18:00Z'
  }
];

export const initialNotifications = [
  {
    _id: 'notif_501',
    userId: 'usr_student_1',
    title: '✨ Smart Match Found! (94%)',
    message: 'A 94% match was detected for your lost Black Leather Wallet near Central Library.',
    type: 'match',
    link: '/smart-matches',
    read: false,
    createdAt: '2026-10-05T10:00:00Z'
  },
  {
    _id: 'notif_502',
    userId: 'usr_student_1',
    title: '📦 Item Collected by Security Desk',
    message: 'Your reported item WX-FOUND-2048 has been logged into Security Locker 04.',
    type: 'collection',
    link: '/security-desk',
    read: true,
    createdAt: '2026-10-05T10:05:00Z'
  },
  {
    _id: 'notif_503',
    userId: 'usr_student_1',
    title: '🔐 Claim Under Review',
    message: 'Security staff Officer Verma is currently reviewing your claim WX-CLM-501.',
    type: 'claim',
    link: '/my-reports',
    read: false,
    createdAt: '2026-10-05T09:00:00Z'
  }
];
