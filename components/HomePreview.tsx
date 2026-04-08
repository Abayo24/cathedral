import Image from 'next/image';
import Link from 'next/link';
import {
    ChevronRight,
    Clock,
    Users,
    Heart,
    BookOpen,
    Music,
    Play,
} from 'lucide-react';
import { SectionHeader } from './ui/SectionHeader';

const previews = [
    {
        href: '/services',
        label: 'Worship',
        title: 'Sunday Services',
        desc: 'Five services every Sunday — from 7:00 am. Find your congregation.',
        img: '/interior.jpg',
        icon: Clock,
        accent: 'crimson' as const,
    },
    {
        href: '/about',
        label: 'Heritage',
        title: 'Our Story',
        desc: 'A century of faith rooted in Kisumu. Meet the clergy and discover our mission.',
        img: '/group.jpg',
        icon: Users,
        accent: 'royal' as const,
    },
    {
        href: '/ministries',
        label: 'Community',
        title: 'Ministries',
        desc: 'KAMA, Mothers Union, Youth, Sunday School, Choir, Deaf Ministry — find your place.',
        img: '/choir2.jpg',
        icon: Music,
        accent: 'crimson' as const,
    },
    {
        href: '/sermons',
        label: 'The Word',
        title: 'Sermons',
        desc: 'Watch and listen to messages from our clergy, live and on demand.',
        img: '/bishop.jpg',
        icon: Play,
        accent: 'royal' as const,
    },
    {
        href: '/gallery',
        label: 'Gallery',
        title: 'Life at the Cathedral',
        desc: 'Worship, sacraments, community — captured in photographs.',
        img: '/choir3.jpg',
        icon: BookOpen,
        accent: 'crimson' as const,
    },
    {
        href: '/give',
        label: 'Stewardship',
        title: 'Give & Support',
        desc: 'Tithes, offerings, and development — M-Pesa and bank transfer available.',
        img: '/give.jpg',
        icon: Heart,
        accent: 'royal' as const,
    },
];

export function HomePreview() {
    return (
        <section className='section-pad bg-ivory'>
            <div className='container-main'>
                <SectionHeader
                    label='Explore the Cathedral'
                    title='Everything You Need'
                    subtitle='Plan your visit, join a ministry, watch sermons, or give — all in one place.'
                    centered
                />

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
                    {previews.map(
                        ({
                            href,
                            label,
                            title,
                            desc,
                            img,
                            icon: Icon,
                            accent,
                        }) => (
                            <Link
                                key={href}
                                href={href}
                                className={`group relative overflow-hidden rounded-3xl bg-white border border-parchment/60 shadow-sm hover:shadow-xl hover:shadow-navy/12 transition-all duration-300 hover:-translate-y-1 no-underline block ${
                                    accent === 'crimson'
                                        ? 'hover:border-crimson'
                                        : 'hover:border-royal'
                                }`}
                            >
                                {/* Image */}
                                <div className='relative h-56 overflow-hidden rounded-t-3xl'>
                                    <Image
                                        src={img}
                                        alt={title}
                                        fill
                                        className='object-cover transition-transform duration-700 group-hover:scale-105'
                                        sizes='(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw'
                                    />
                                    <div className='absolute inset-0 bg-gradient-to-t from-navy/70 to-transparent' />
                                    {/* Icon badge */}
                                    <div
                                        className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center shadow-md ${
                                            accent === 'crimson' ? 'bg-crimson' : 'bg-royal'
                                        }`}
                                    >
                                        <Icon
                                            size={17}
                                            className='text-white'
                                        />
                                    </div>
                                </div>
                                {/* Content */}
                                <div className='p-6'>
                                    <p
                                        className={`font-ui text-[9px] tracking-[3px] uppercase font-semibold mb-2 ${
                                            accent === 'crimson' ? 'text-crimson' : 'text-royal'
                                        }`}
                                    >
                                        {label}
                                    </p>
                                    <h3 className='font-display text-xl font-medium text-navy-mid mb-2 leading-snug'>
                                        {title}
                                    </h3>
                                    <p className='font-body text-[0.82rem] text-muted leading-7 mb-4'>
                                        {desc}
                                    </p>
                                    <div
                                        className={`flex items-center gap-1.5 font-ui text-[9px] tracking-[2px] uppercase font-semibold ${
                                            accent === 'crimson' ? 'text-crimson' : 'text-royal'
                                        }`}
                                    >
                                        <span>Explore</span>
                                        <ChevronRight
                                            size={13}
                                            className='transition-transform duration-200 group-hover:translate-x-1'
                                        />
                                    </div>
                                </div>
                            </Link>
                        ),
                    )}
                </div>
            </div>
        </section>
    );
}