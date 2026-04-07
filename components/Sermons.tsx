import Image from 'next/image';
import { Play } from 'lucide-react';
import { SectionHeader } from './ui/SectionHeader';
import { HeraldRule } from './ui/HeraldRule';

// Centralized link for easy updates in the future
const FACEBOOK_URL = 'https://web.facebook.com/ststephenscathedralksm';

const recent = [
    {
        title: 'Walking in the Light of Christ',
        preacher: 'Rev. Dr. George Samuel Okoth',
        date: 'March 9, 2025',
        scripture: 'John 8:12',
        img: '/light.jpg',
        videoUrl: FACEBOOK_URL, // Replace with specific link later
    },
    {
        title: 'Faith That Moves Mountains',
        preacher: "The Rt. Rev'd Charles Ochieng Ong'injo",
        date: 'March 2, 2025',
        scripture: 'Matthew 17:20',
        img: '/faith.jpg',
        videoUrl: FACEBOOK_URL,
    },
    {
        title: 'Called to Serve, Not to Be Served',
        preacher: "The Rev'd Janet Atieno Oyugi–Rowa",
        date: 'Feb 23, 2025',
        scripture: 'Mark 10:45',
        img: '/serve.jpg',
        videoUrl: FACEBOOK_URL,
    },
];

export function Sermons() {
    return (
        <section className='section-pad bg-cream'>
            <div className='container-main'>
                <SectionHeader
                    label='The Word'
                    title='Sermons & Messages'
                    subtitle='Receive the Word of God wherever you are. Sermons available on Facebook Live each Sunday.'
                    centered
                />

                {/* Featured video */}
                <a 
                    href={FACEBOOK_URL} 
                    target='_blank' 
                    rel='noopener noreferrer'
                    className='relative block h-64 sm:h-80 md:h-[420px] rounded-3xl overflow-hidden mb-6 group cursor-pointer shadow-xl shadow-navy/20'
                >
                    <Image
                        src='/easter.jpg'
                        alt='Cathedral sermon'
                        fill
                        className='object-cover transition-transform duration-700 group-hover:scale-[1.02]'
                        sizes='100vw'
                    />
                    <div className='absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent' />
                    <div className='absolute inset-0 bg-gradient-to-r from-navy/60 to-transparent' />
                    <div className='absolute inset-0 flex items-center justify-center'>
                        <div className='w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white/60 flex items-center justify-center bg-crimson/20 backdrop-blur-sm group-hover:bg-crimson/70 transition-all duration-300 group-hover:scale-110 shadow-lg'>
                            <Play size={24} className='text-white ml-1' />
                        </div>
                    </div>
                    <div className='absolute bottom-0 left-0 p-6 sm:p-8 md:p-12'>
                        <p className='label-tag-light'>Featured Sermon</p>
                        <h3 className='font-display text-xl sm:text-2xl md:text-4xl font-normal text-white mb-3 leading-tight max-w-2xl'>
                            He Has Risen: The Power of the Resurrection
                        </h3>
                        <div className='flex items-center gap-3 flex-wrap'>
                            <span className='font-ui text-[9px] tracking-[2px] uppercase bg-white/10 px-3 py-1 rounded-full text-white/80'>
                                Easter Sunday 2025
                            </span>
                            <span className='font-ui text-[9px] tracking-[2px] uppercase bg-white/10 px-3 py-1 rounded-full text-white/80'>
                                Romans 6:4
                            </span>
                        </div>
                    </div>
                </a>

                {/* Recent sermons */}
                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6'>
                    {recent.map((s, i) => (
                        <a
                            key={i}
                            href={s.videoUrl}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='group block cursor-pointer rounded-2xl overflow-hidden bg-white border border-parchment/60 shadow-sm hover:shadow-xl hover:shadow-crimson/10 transition-all duration-300 hover:-translate-y-1'
                        >
                            <div className='relative h-40 sm:h-48 overflow-hidden'>
                                <Image
                                    src={s.img}
                                    alt={s.title}
                                    fill
                                    className='object-cover transition-transform duration-700 group-hover:scale-105'
                                    sizes='(max-width:640px) 100vw, 33vw'
                                />
                                <div className='absolute inset-0 bg-navy/50 group-hover:bg-navy/30 transition-colors duration-300' />
                                <div className='absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                    <div className='w-12 h-12 rounded-full border border-white/60 flex items-center justify-center bg-crimson/50 shadow-md'>
                                        <Play
                                            size={16}
                                            className='text-white ml-0.5'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='p-5'>
                                <span className='font-ui text-[9px] tracking-[2px] uppercase bg-crimson/8 text-crimson px-2.5 py-1 rounded-full'>
                                    {s.scripture}
                                </span>
                                <h4 className='font-display text-lg font-medium text-navy-mid leading-snug mt-3 mb-3'>
                                    {s.title}
                                </h4>
                                <HeraldRule className='mb-3' />
                                <p className='font-body text-[0.78rem] text-muted mb-1 truncate'>
                                    {s.preacher}
                                </p>
                                <p className='font-ui text-[9px] tracking-[1.5px] uppercase text-faint'>
                                    {s.date}
                                </p>
                            </div>
                        </a>
                    ))}
                </div>

                {/* Facebook CTA */}
                <div className='bg-royal rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 shadow-md shadow-royal/20'>
                    <div className='min-w-0'>
                        <p className='label-tag-royal'>Live Streaming</p>
                        <h3 className='font-display text-xl sm:text-2xl text-white font-normal'>
                            Join Us Live Every Sunday
                        </h3>
                        <p className='font-body text-[0.85rem] text-white/55 mt-1 leading-7'>
                            We stream all our Sunday services on Facebook.
                            Follow us to never miss a message.
                        </p>
                    </div>
                    <a
                        href={FACEBOOK_URL}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='btn-crimson shrink-0 no-underline text-center w-full sm:w-auto'
                    >
                        Watch on Facebook
                    </a>
                </div>
            </div>
        </section>
    );
}