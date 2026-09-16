/**
 * Built-in content. The website uses this whenever the CMS (Sanity) is not
 * configured or has no documents of a given type yet, so the site never
 * renders empty. Run `npm run seed` to copy all of this into the CMS.
 */
import type {
	Faq,
	GivingAccount,
	Leader,
	Ministry,
	ServiceSchedule,
	Sermon,
	SiteSettings,
} from './types';

export interface FocusItem {
	title: string;
	verse: string;
	desc: string;
}

export const SETTINGS: SiteSettings = {
	name: "ACK St. Stephen's Cathedral Kisumu",
	shortName: "St. Stephen's Cathedral",
	tagline: 'A wholesome Christian ministry for the glory of God.',
	description:
		"ACK St. Stephen's Cathedral Kisumu is the seat of the Anglican Diocese of Maseno South, worshipping since 1913. Join us for Sunday services at 7:00, 9:00 and 11:00 am, plus youth, teens, Deaf and Sunday school congregations.",
	phone: '0115 162 026',
	phoneIntl: '+254115162026',
	emails: ['ststephenscathedral1@gmail.com', 'ststephenskisumu@yahoo.com'],
	address: {
		poBox: 'P.O. Box 43',
		locality: 'Kisumu',
		region: 'Kisumu County',
		postalCode: '40100',
		country: 'KE',
	},
	mapQuery: "ACK St. Stephen's Cathedral, Kisumu, Kenya",
	social: {
		facebook: 'https://www.facebook.com/ststephenscathedralksm',
	},
	livestreamUrl: 'https://www.facebook.com/ststephenscathedralksm',
	paybill: '827450',
	hero: {
		eyebrow: 'Together in Christ · Est. 1913',
		titleLine1: 'A Wholesome',
		titleLine2: 'Christian Ministry',
		text: "ACK St. Stephen's Cathedral Kisumu — making disciples, restoring communities, and safeguarding the integrity of creation since 1913.",
		image: { src: '/church.jpg', alt: "St. Stephen's Cathedral, Kisumu" },
	},
};

export const ACCOUNTS: GivingAccount[] = [
	{ id: 'tithes', tab: 'Tithes & Offerings', bank: 'NCBA Bank', branch: 'One Kentons Square — Code 112', name: 'St. Stephens Cathedral - Central', number: '9808620016', paybill: 'Tithe/Offering', purpose: 'General tithes and Sunday offerings.', swift: 'CBAFKENX' },
	{ id: 'development', tab: 'Development', bank: 'Stanbic Bank', branch: 'Kisumu — Code 013', name: "St Stephen's Cathedral Development", number: '0100012658219', paybill: 'Development', purpose: 'Building projects and infrastructure.', swift: 'SBICKENX' },
	{ id: 'welfare', tab: 'Welfare', bank: 'Credit Bank', branch: 'Kisumu — Code 002', name: 'St. Stephens Cathedral - Kisumu', number: '0031006000142', paybill: 'Welfare', purpose: 'Community support and social justice.', swift: 'CRBTKENAXXX' },
	{ id: 'bookshop-ncba', tab: 'Bookshop (NCBA)', bank: 'NCBA Bank', branch: 'One Kentons Square — Code 112', name: 'ACK DMS St Stephens Cathedral Bookshop', number: '9808620021', paybill: 'Bookshop', purpose: 'Literature and resource ministry.', swift: 'CBAFKENX' },
	{ id: 'bookshop-hfc', tab: 'Bookshop (HFC)', bank: 'HFC Bank', branch: 'Kisumu — Code 600', name: 'St. Stephens Cathedral Bookshop Account', number: '00007040002261', paybill: 'Bookshop HFC', purpose: 'Alternative bookshop account.', swift: 'HFCOKENA' },
];

const photo = (src: string, alt: string) => ({ src, alt });

export const LEADERSHIP: Leader[] = [
	{ name: "The Rt. Rev'd Charles Ochieng Ong'injo", role: 'The Bishop', bio: 'Provides spiritual oversight, pastoral care, and strategic direction to the Cathedral and the Diocese of Maseno South.', image: photo('/Charles.jpg', "The Rt. Rev'd Charles Ochieng Ong'injo") },
	{ name: 'Vacant', role: 'The Provost', bio: 'The Provost serves as Chief Executive Officer of the Cathedral, overseeing daily administrative and ministerial operations.', image: null },
	{ name: "The Rev'd Dr. George Samuel Okoth", role: 'Minister Coordinating Music', bio: 'Leads the congregation in worship, coordinates Cathedral choirs, and oversees all musical elements of services.', image: photo('/George.jpg', "The Rev'd Dr. George Samuel Okoth") },
	{ name: "The Rev'd Janet Atieno Oyugi–Rowa", role: 'Minister Coordinating Mission', bio: "Drives the Cathedral's evangelism, outreach programs, and community missions to spread the Good News.", image: photo('/Janet.jpg', "The Rev'd Janet Atieno Oyugi–Rowa") },
	{ name: "The Rev'd Mary Otega Osenah", role: 'Minister Coordinating Mothers Union', bio: "Empowers the Mothers Union, focusing on family life, women's ministry, and community care.", image: photo('/Mary.jpg', "The Rev'd Mary Otega Osenah") },
	{ name: "The Rev'd Andrew Buyu", role: 'Minister Coordinating the Elderly', bio: 'Provides dedicated pastoral care, visitation, and spiritual support for our senior members.', image: photo('/Andrew.jpg', "The Rev'd Andrew Buyu") },
	{ name: "The Rev'd Emmanuel Gordon Oliech", role: 'Minister Coordinating Youth', bio: 'Guides the youth ministry, organises services, and mentors young people in their spiritual journey.', image: photo('/Emmanuel.jpg', "The Rev'd Emmanuel Gordon Oliech") },
	{ name: "The Rev'd Elisha Omollo Nyambori", role: 'Minister Coordinating Sunday School', bio: "Oversees children's ministry in a safe, engaging environment to lay biblical foundations.", image: photo('/Elisha.jpg', "The Rev'd Elisha Omollo Nyambori") },
	{ name: "The Rev'd Zalyneer Faith Wamalwa-Oliech", role: 'Minister Coordinating the Deaf', bio: 'Provides specialized spiritual support and coordinates ministry activities tailored for the Deaf community.', image: null },
	{ name: "The Rev'd Michael Ogutu", role: 'Minister Coordinating KAMA', bio: "Leads the Kenya Anglican Men's Association, fostering male leadership, fellowship, and church support.", image: null },
	{ name: "The Rev'd Dolly Achieng Otieno", role: 'Honorary Curate', bio: 'A holder of a Diploma in Theology and a renowned hotelier in Kisumu, she serves as Honorary Curate at the Cathedral supporting the ministry to the elderly.', image: photo('/Dolly.jpg', "The Rev'd Dolly Achieng Otieno") },
];

export const MINISTRIES: Ministry[] = [
	{ name: "Kenya Anglican Men's Association", abbr: 'KAMA', image: photo('/Kama_.png', 'Members of KAMA'), description: 'Men of integrity leading in faith, fellowship, and service to the Cathedral community.' },
	{ name: 'Mothers Union', abbr: 'MU', image: photo('/mothers-union.jpg', 'Mothers Union members'), description: 'Christian care for families, marriage enrichment, and compassionate community service.' },
	{ name: 'Youth & KAYO', abbr: 'KAYO', image: photo('/youth_.jpg', 'Cathedral youth fellowship'), description: 'Empowering the next generation through fellowship, discipleship, and mentorship.' },
	{ name: 'Sunday School', abbr: 'SS', image: photo('/sunday_school.jpg', 'Sunday School children'), description: 'Teaching biblical foundations to children in a safe, joyful, and nurturing environment.' },
	{ name: 'Music & Choir', abbr: 'Choir', image: photo('/choir2.jpg', 'Cathedral choir in worship'), description: 'Orchestrating worship through traditional Anglican and contemporary African music.' },
	{ name: 'Deaf Ministry', abbr: 'Deaf', image: photo('/deaf-ministry.jpg', 'Deaf ministry worship with sign language'), description: 'Ensuring fully inclusive worship through dedicated sign language interpretation.' },
	{ name: 'Widows Ministry', abbr: 'WM', image: photo('/1.jpeg', 'Widows ministry fellowship'), description: 'Bridging faith, tradition, and healing through spiritual fortitude and a focus on mental wellness.' },
];

export const SERVICE_SCHEDULE: ServiceSchedule = {
	adult: [
		{ label: 'First Service', time: '7:00 – 8:30 am', venue: 'Main Sanctuary' },
		{ label: 'Second Service', time: '9:00 – 10:30 am', venue: 'Main Sanctuary' },
		{ label: 'Third Service', time: '11:00 am – 12:30 pm', venue: 'Main Sanctuary' },
	],
	specialised: [
		{ label: 'Youth Service', time: '8:00 – 10:00 am', venue: 'Old Sanctuary' },
		{ label: 'Deaf Service', time: '10:30 am – 12:30 pm', venue: 'Old Sanctuary' },
		{ label: 'Sunday School', time: '7:00 / 9:00 / 11:00 am', venue: 'Provisional' },
		{ label: 'Teens Service', time: '11:00 am – 12:30 pm', venue: 'Provisional' },
	],
	communion: [
		{ label: '1st Sunday', time: '9:00 – 10:30 am', venue: 'Main Sanctuary' },
		{ label: '2nd Sunday', time: '7:00 – 8:30 am & 11:00 am – 12:30 pm', venue: 'Main Sanctuary' },
		{ label: '3rd Sunday', time: '8:00 – 10:00 am', venue: 'Old Sanctuary' },
		{ label: '4th Sunday', time: '10:30 am – 12:30 pm', venue: 'Old Sanctuary' },
		{ label: 'Wednesday Mid-Week', time: '8:00 – 9:00 am & 5:00 – 6:00 pm', venue: 'Old / Main' },
	],
};

export const SERMONS: Sermon[] = [
	{ id: 'resurrection-2025', title: 'He Has Risen: The Power of the Resurrection', preacher: "The Rt. Rev'd Charles Ochieng Ong'injo", date: '2025-04-20', scripture: 'Romans 6:4', series: 'Easter Sunday 2025', image: photo('/easter.jpg', 'Easter Sunday worship at the Cathedral'), videoUrl: SETTINGS.livestreamUrl, featured: true },
	{ id: 'light-of-christ', title: 'Walking in the Light of Christ', preacher: "The Rev'd Dr. George Samuel Okoth", date: '2025-03-09', scripture: 'John 8:12', image: photo('/light.jpg', 'Candle light in the sanctuary'), videoUrl: SETTINGS.livestreamUrl },
	{ id: 'faith-moves-mountains', title: 'Faith That Moves Mountains', preacher: "The Rt. Rev'd Charles Ochieng Ong'injo", date: '2025-03-02', scripture: 'Matthew 17:20', image: photo('/faith.jpg', 'Congregation in prayer'), videoUrl: SETTINGS.livestreamUrl },
	{ id: 'called-to-serve', title: 'Called to Serve, Not to Be Served', preacher: "The Rev'd Janet Atieno Oyugi–Rowa", date: '2025-02-23', scripture: 'Mark 10:45', image: photo('/serve.jpg', 'Serving the community'), videoUrl: SETTINGS.livestreamUrl },
];

export const FAQS: Faq[] = [
	{ question: "What time are Sunday services at St. Stephen's Cathedral Kisumu?", answer: 'There are three adult services every Sunday in the Main Sanctuary: 7:00–8:30 am, 9:00–10:30 am and 11:00 am–12:30 pm. The Youth Service runs 8:00–10:00 am and the Deaf Service 10:30 am–12:30 pm in the Old Sanctuary, with Teens and Sunday School congregations alongside.' },
	{ question: 'Is there a mid-week service?', answer: 'Yes. A Wednesday mid-week service with Holy Communion is held from 8:00 to 9:00 am and from 5:00 to 6:00 pm.' },
	{ question: 'When is Holy Communion celebrated?', answer: 'Holy Communion rotates between congregations: the 9:00 am service on the 1st Sunday, the 7:00 am and 11:00 am services on the 2nd Sunday, the 8:00 am Youth Service on the 3rd Sunday, the 10:30 am Deaf Service on the 4th Sunday, and at the Wednesday mid-week services.' },
	{ question: 'Is there a service for Deaf worshippers?', answer: 'Yes. The Deaf Service is held every Sunday from 10:30 am to 12:30 pm in the Old Sanctuary, with dedicated sign language ministry.' },
	{ question: 'Do you have a Sunday School for children?', answer: 'Yes. Sunday School runs during the 7:00, 9:00 and 11:00 am services, so children learn in a safe, joyful environment while parents worship.' },
	{ question: 'Can I watch services online?', answer: "Sunday services are streamed live on the Cathedral's Facebook page, facebook.com/ststephenscathedralksm." },
	{ question: 'How can I give tithes and offerings?', answer: 'Use M-Pesa Paybill 827450 with the account name for your gift (for example "Tithe/Offering", "Development" or "Welfare"), or make a bank transfer to the accounts listed on our Give page.' },
	{ question: 'How do I arrange a baptism, wedding or pastoral visit?', answer: 'Please contact the Cathedral office by phone on 0115 162 026 or email ststephenscathedral1@gmail.com, or send a message through our Contact page, and a member of the clergy will get back to you.' },
	{ question: 'How do I join a ministry or fellowship?', answer: "Everyone is welcome to join a ministry — KAMA, Mothers Union, Youth & KAYO, Sunday School, Music & Choir, the Deaf Ministry or the Widows Ministry. Speak to the coordinating minister after a service or contact the Cathedral office." },
	{ question: "Why is the Cathedral called \"Komulo\"?", answer: "St. Stephen's Cathedral was first built in 1913 by Anglican missionaries. It is known locally as \"Komulo\" in honour of its pioneer priest, Rev. Reuben Omulo, and today it is the seat of the Diocese of Maseno South." },
	{ question: 'Which Anglican church can I attend in Kisumu?', answer: "ACK St. Stephen's Cathedral is the Anglican cathedral in Kisumu and the mother church of the Diocese of Maseno South. Visitors are welcome at any Sunday service — 7:00, 9:00 and 11:00 am in the Main Sanctuary, the 8:00 am Youth Service, or the 10:30 am Deaf Service in the Old Sanctuary." },
	{ question: 'Is St. Stephen’s Cathedral part of the Anglican Church of Kenya (ACK)?', answer: "Yes. St. Stephen's Cathedral Kisumu is a parish of the Anglican Church of Kenya and is the cathedral church of the Diocese of Maseno South, which it has served since the diocese was formed. The Cathedral itself dates back to 1913." },
];

export const FOCUS: FocusItem[] = [
	{ title: 'Mission & Evangelism', verse: 'Matthew 5:14', desc: 'Shining the light of Christ through outreach, digital evangelism, and mentorship.' },
	{ title: 'Stewardship & Investment', verse: 'Proverbs 16:3', desc: "Dedicated to excellence in every financial plan and investment for God's glory." },
	{ title: 'Governance & Management', verse: '1 Peter 5:2', desc: "Leading with a servant's heart, creating structures that prioritise well-being." },
	{ title: 'Social Justice & Livelihoods', verse: 'Luke 4:18', desc: 'Advocating for justice, empowering the vulnerable, and restoring dignity for all.' },
];

export const VALUES = ['Prayerfulness', 'Integrity', 'Trustworthiness', 'Compassion', 'Servanthood', 'Excellence'];

const album = (id: string, title: string, category: string, description: string, photos: [string, string][]): import('./types').Album => {
	const images = photos.map(([src, alt]) => ({ src, alt }));
	return { id, slug: id, title, category, description, cover: images[0], images };
};

/** Shown on the Gallery page until albums are added in the admin dashboard. */
export const FALLBACK_ALBUMS = [
	album('worship-and-sacraments', 'Worship & Sacraments', 'Worship', 'Sunday worship, Holy Communion, ordinations and Easter at the Cathedral.', [
		['/interior.jpg', 'Inside the Cathedral sanctuary'],
		['/sunday-service.jpg', 'Congregation at a Sunday service'],
		['/sacrament.jpg', 'Celebration of Holy Communion'],
		['/ordination.jpg', 'Ordination service at the Cathedral'],
		['/easter.jpg', 'Easter Sunday worship'],
		['/church.jpg', "St. Stephen's Cathedral building"],
	]),
	album('community-and-ministries', 'Community & Ministries', 'Community', 'Our choirs, youth, Mothers Union, Sunday School and Deaf ministry.', [
		['/choir2.jpg', 'Cathedral choir leading worship'],
		['/choir3.jpg', 'Choir members in robes'],
		['/choir.jpg', 'Choir singing during a service'],
		['/mothers-union.jpg', 'Mothers Union members'],
		['/youth_.jpg', 'Cathedral youth fellowship'],
		['/sunday_school.jpg', 'Sunday School children'],
		['/deaf-ministry.jpg', 'Deaf ministry worship with sign language'],
		['/group.jpg', 'Cathedral members gathered together'],
		['/community.jpg', 'The Cathedral community'],
	]),
	album('clergy', 'Clergy & Leadership', 'Clergy', 'The Bishop and clergy of the Cathedral.', [
		['/clergy.jpg', 'Cathedral clergy'],
		['/bishop.jpg', 'The Bishop of Maseno South'],
		['/certificates.jpg', 'Presentation of certificates'],
	]),
];
