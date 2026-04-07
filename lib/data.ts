export interface Account {
  id: number
  tab: string
  bank: string
  branch: string
  name: string
  number: string
  paybill: string
  purpose: string
  swift: string
}

export interface Leader {
  name: string
  role: string
  bio: string
  img: string | null
}

export interface Ministry {
  name: string
  abbr: string
  img: string
  desc: string
}

export interface FocusItem {
  title: string
  verse: string
  desc: string
}

export const CHURCH = {
  paybill: '827450',
  phone: '0115 162 026',
  emails: ['ststephenscathedral1@gmail.com', 'ststephenskisumu@yahoo.com'],
  address: 'P.O. Box 43 – 40100, Kisumu, Kenya',
  domain: 'ststephenscathedralkisumu.org',
  facebook: 'https://www.facebook.com/ststephenscathedralksm/about',
}

export const ACCOUNTS: Account[] = [
  { id: 1, tab: 'Tithes & Offerings', bank: 'NCBA Bank', branch: 'One Kentons Square — Code 112', name: 'St. Stephens Cathedral - Central', number: '9808620016', paybill: 'Tithe/Offering', purpose: 'General tithes and Sunday offerings.', swift: 'CBAFKENX' },
  { id: 2, tab: 'Development', bank: 'Stanbic Bank', branch: 'Kisumu — Code 013', name: "St Stephen's Cathedral Development", number: '0100012658219', paybill: 'Development', purpose: 'Building projects and infrastructure.', swift: 'SBICKENX' },
  { id: 3, tab: 'Welfare', bank: 'Credit Bank', branch: 'Kisumu — Code 002', name: 'St. Stephens Cathedral - Kisumu', number: '0031006000142', paybill: 'Welfare', purpose: 'Community support and social justice.', swift: 'CRBTKENAXXX' },
  { id: 4, tab: 'Bookshop (NCBA)', bank: 'NCBA Bank', branch: 'One Kentons Square — Code 112', name: 'ACK DMS St Stephens Cathedral Bookshop', number: '9808620021', paybill: 'Bookshop', purpose: 'Literature and resource ministry.', swift: 'CBAFKENX' },
  { id: 5, tab: 'Bookshop (HFC)', bank: 'HFC Bank', branch: 'Kisumu — Code 600', name: "St. Stephens Cathedral Bookshop Account", number: '00007040002261', paybill: 'Bookshop HFC', purpose: 'Alternative bookshop account.', swift: 'HFCOKENA' },
]

export const LEADERSHIP: Leader[] = [
  { 
    name: "The Rt. Rev'd Charles Ochieng Ong'injo", 
    role: 'The Bishop', 
    bio: 'Provides spiritual oversight, pastoral care, and strategic direction to the Cathedral and the Diocese of Maseno South.', 
    img: '/Charles.jpg' 
  },
  { 
    name: 'Vacant', 
    role: 'The Provost', 
    bio: 'The Provost serves as Chief Executive Officer of the Cathedral, overseeing daily administrative and ministerial operations.', 
    img: null 
  },
  { 
    name: "The Rev'd Dr. George Samuel Okoth", 
    role: 'Minister Coordinating Music', 
    bio: 'Leads the congregation in worship, coordinates Cathedral choirs, and oversees all musical elements of services.', 
    img: '/George.jpg' 
  },
  { 
    name: "The Rev'd Janet Atieno Oyugi–Rowa", 
    role: 'Minister Coordinating Mission', 
    bio: "Drives the Cathedral's evangelism, outreach programs, and community missions to spread the Good News.", 
    img: '/Janet.jpg' 
  },
  { 
    name: "The Rev'd Mary Otega Osenah", 
    role: 'Minister Coordinating Mothers Union', 
    bio: "Empowers the Mothers Union, focusing on family life, women's ministry, and community care.", 
    img: '/Mary.jpg' 
  },
  { 
    name: "The Rev'd Andrew Buyu", 
    role: 'Minister Coordinating the Elderly', 
    bio: 'Provides dedicated pastoral care, visitation, and spiritual support for our senior members.', 
    img: '/Andrew.jpg' 
  },
  { 
    name: 'The Rev’d Emmanuel Gordon Oliech', 
    role: 'Minister Coordinating Youth', 
    bio: 'Guides the youth ministry, organises services, and mentors young people in their spiritual journey.', 
    img: '/Emmanuel.jpg' 
  },
  { 
    name: 'The Rev’d Elisha Omollo Nyambori', 
    role: 'Minister Coordinating Sunday School', 
    bio: "Oversees children's ministry in a safe, engaging environment to lay biblical foundations.", 
    img: '/Elisha.jpg' 
  },
  { 
    name: "The Rev’d Zalyneer Faith Wamalwa-Oliech", 
    role: 'Minister Coordinating the Deaf', 
    bio: 'Provides specialized spiritual support and coordinates ministry activities tailored for the Deaf community.', 
    img: null 
  },
  { 
    name: "The Rev’d Michael Ogutu", 
    role: 'Minister Coordinating KAMA', 
    bio: "Leads the Kenya Anglican Men's Association, fostering male leadership, fellowship, and church support.", 
    img: null 
  },
  { 
    name: "The Rev’d Dolly Achieng Otieno", 
    role: 'Honorary Curate', 
    bio: 'A holder of a Diploma in Theology and a renowned hotelier in Kisumu, she serves as Honorary Curate at the Cathedral supporting the ministry to the elderly.', 
    img: '/Dolly.jpg' 
  },
]

export const MINISTRIES: Ministry[] = [
  { 
    name: "Kenya Anglican Men's Association", 
    abbr: 'KAMA', 
    img: '/kama.jpg', 
    desc: 'Men of integrity leading in faith, fellowship, and service to the Cathedral community.' 
  },
  { 
    name: 'Mothers Union', 
    abbr: 'MU', 
    img: '/mothers.jpg', 
    desc: 'Christian care for families, marriage enrichment, and compassionate community service.' 
  },
  { 
    name: 'Youth & KAYO', 
    abbr: 'KAYO', 
    img: '/youth.jpg', 
    desc: 'Empowering the next generation through fellowship, discipleship, and mentorship.' 
  },
  { 
    name: 'Sunday School', 
    abbr: 'SS', 
    img: '/sunday-school.jpg', 
    desc: 'Teaching biblical foundations to children in a safe, joyful, and nurturing environment.' 
  },
  { 
    name: 'Music & Choir', 
    abbr: 'Choir', 
    img: '/choir.jpg', 
    desc: 'Orchestrating worship through traditional Anglican and contemporary African music.' 
  },
  { 
    name: 'Deaf Ministry', 
    abbr: 'Deaf', 
    img: '/deaf.jpg', 
    desc: 'Ensuring fully inclusive worship through dedicated sign language interpretation.' 
  },
  { 
    name: 'Widows Ministry', 
    abbr: 'WM', 
    img: '/faith.jpg', 
    desc: 'Bridging faith, tradition, and healing through spiritual fortitude and a focus on mental wellness.' 
  },
];

export const FOCUS: FocusItem[] = [
  { title: 'Mission & Evangelism', verse: 'Matthew 5:14', desc: 'Shining the light of Christ through outreach, digital evangelism, and mentorship.' },
  { title: 'Stewardship & Investment', verse: 'Proverbs 16:3', desc: "Dedicated to excellence in every financial plan and investment for God's glory." },
  { title: 'Governance & Management', verse: '1 Peter 5:2', desc: "Leading with a servant's heart, creating structures that prioritise well-being." },
  { title: 'Social Justice & Livelihoods', verse: 'Luke 4:18', desc: 'Advocating for justice, empowering the vulnerable, and restoring dignity for all.' },
]
