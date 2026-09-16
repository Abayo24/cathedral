import {
  AddIcon,
  BellIcon,
  CalendarIcon,
  DocumentPdfIcon,
  EnvelopeIcon,
  ImagesIcon,
  LaunchIcon,
  PlayIcon,
} from '@sanity/icons'
import { Badge, Box, Card, Container, Flex, Grid, Heading, Spinner, Stack, Text } from '@sanity/ui'
import { type ComponentType, type ReactNode, useEffect, useState } from 'react'
import { useClient, useCurrentUser } from 'sanity'
import { IntentLink } from 'sanity/router'

import { apiVersion } from '../env'

interface DashboardData {
  upcoming: { _id: string; title?: string; start?: string; repeat?: string; cancelled?: boolean }[]
  messages: { _id: string; name?: string; kind?: string; receivedAt?: string }[]
  newMessages: number
  activeNotices: number
  albums: number
  sermons: number
  latestBulletin: { _id: string; title?: string; date?: string } | null
}

const DASHBOARD_QUERY = `{
  "upcoming": *[_type == "event" && !(_id in path("drafts.**")) && (
    coalesce(end, start) >= now() || coalesce(recurrence.frequency, "none") != "none"
  )] | order(start asc)[0...6]{ _id, title, start, "repeat": recurrence.frequency, cancelled },
  "messages": *[_type == "contactMessage" && coalesce(status, "new") == "new"] | order(receivedAt desc)[0...5]{ _id, name, kind, receivedAt },
  "newMessages": count(*[_type == "contactMessage" && coalesce(status, "new") == "new"]),
  "activeNotices": count(*[_type == "announcement" && !(_id in path("drafts.**")) && (!defined(expiresAt) || expiresAt > now())]),
  "albums": count(*[_type == "galleryItem" && !(_id in path("drafts.**"))]),
  "sermons": count(*[_type == "sermon" && !(_id in path("drafts.**"))]),
  "latestBulletin": *[_type == "bulletin" && !(_id in path("drafts.**"))] | order(date desc)[0]{ _id, title, date }
}`

const formatWhen = (iso?: string) =>
  iso
    ? new Date(iso).toLocaleString('en-GB', { timeZone: 'Africa/Nairobi', weekday: 'short', day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' })
    : ''

const linkStyle = { color: 'inherit', textDecoration: 'none', display: 'block' }

function CreateTile({ type, title, description, icon: Icon }: { type: string; title: string; description: string; icon: ComponentType }) {
  return (
    <IntentLink intent="create" params={{ type }} style={linkStyle}>
      <Card padding={4} radius={3} shadow={1} tone="primary" style={{ height: '100%' }}>
        <Flex gap={3} align="flex-start">
          <Text size={3}>
            <Icon />
          </Text>
          <Stack space={2}>
            <Text weight="semibold">
              <AddIcon /> {title}
            </Text>
            <Text size={1} muted>
              {description}
            </Text>
          </Stack>
        </Flex>
      </Card>
    </IntentLink>
  )
}

function Stat({ label, value, icon: Icon, tone = 'default' }: { label: string; value: ReactNode; icon: ComponentType; tone?: 'default' | 'caution' }) {
  return (
    <Card padding={4} radius={3} shadow={1} tone={tone}>
      <Stack space={3}>
        <Text size={1} muted>
          <Icon /> {label}
        </Text>
        <Heading size={3} as="p">
          {value}
        </Heading>
      </Stack>
    </Card>
  )
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Card padding={4} radius={3} shadow={1}>
      <Stack space={4}>
        <Heading size={1} as="h2">
          {title}
        </Heading>
        {children}
      </Stack>
    </Card>
  )
}

export function Dashboard() {
  const client = useClient({ apiVersion })
  const user = useCurrentUser()
  const [data, setData] = useState<DashboardData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = () =>
      client
        .fetch<DashboardData>(DASHBOARD_QUERY, {}, { perspective: 'raw' })
        .then(setData)
        .catch((err: Error) => setError(err.message))
    load()
    const subscription = client
      .listen('*[_type in ["event", "announcement", "contactMessage", "bulletin", "sermon", "galleryItem"]]', {}, { visibility: 'query' })
      .subscribe(() => load())
    return () => subscription.unsubscribe()
  }, [client])

  const firstName = user?.name?.split(' ')[0]

  return (
    <Box padding={[3, 4, 5]} style={{ overflowY: 'auto', height: '100%' }}>
      <Container width={3}>
        <Stack space={5}>
          <Flex justify="space-between" align="center" wrap="wrap" gap={3}>
            <Stack space={3}>
              <Heading size={4} as="h1">
                {firstName ? `Welcome, ${firstName}` : 'Welcome'}
              </Heading>
              <Text muted>St. Stephen&apos;s Cathedral website admin. Changes you publish appear on the website within a minute.</Text>
            </Stack>
            <a href="/" target="_blank" rel="noreferrer" style={{ ...linkStyle, display: 'inline-block' }}>
              <Card padding={3} radius={2} border>
                <Text size={1} weight="semibold">
                  View website <LaunchIcon />
                </Text>
              </Card>
            </a>
          </Flex>

          <Stack space={3}>
            <Heading size={1} as="h2">
              Quick actions
            </Heading>
            <Grid columns={[1, 2, 3]} gap={3}>
              <CreateTile type="event" title="Add an event" description="Services, conferences, fellowships — one-off or repeating." icon={CalendarIcon} />
              <CreateTile type="announcement" title="Post a notice" description="Short announcements, optionally shown as a site-wide banner." icon={BellIcon} />
              <CreateTile type="bulletin" title="Upload a bulletin" description="This week's bulletin PDF and key points." icon={DocumentPdfIcon} />
              <CreateTile type="galleryItem" title="New photo album" description="Drag in photos from a service or celebration." icon={ImagesIcon} />
              <CreateTile type="sermon" title="Add a sermon" description="Link to the Facebook or YouTube recording." icon={PlayIcon} />
              <IntentLink intent="edit" params={{ id: 'serviceSchedule', type: 'serviceSchedule' }} style={linkStyle}>
                <Card padding={4} radius={3} shadow={1} style={{ height: '100%' }}>
                  <Stack space={2}>
                    <Text weight="semibold">Update service times</Text>
                    <Text size={1} muted>
                      Sunday, youth, Deaf and Holy Communion schedules.
                    </Text>
                  </Stack>
                </Card>
              </IntentLink>
            </Grid>
          </Stack>

          {error && (
            <Card padding={4} radius={3} tone="critical">
              <Text>Could not load dashboard data: {error}</Text>
            </Card>
          )}

          {!data && !error ? (
            <Flex justify="center" padding={5}>
              <Spinner muted />
            </Flex>
          ) : data ? (
            <>
              <Grid columns={[2, 2, 4]} gap={3}>
                <Stat label="New messages" value={data.newMessages} icon={EnvelopeIcon} tone={data.newMessages ? 'caution' : 'default'} />
                <Stat label="Active notices" value={data.activeNotices} icon={BellIcon} />
                <Stat label="Photo albums" value={data.albums} icon={ImagesIcon} />
                <Stat label="Sermons" value={data.sermons} icon={PlayIcon} />
              </Grid>

              <Grid columns={[1, 1, 2]} gap={3}>
                <Panel title="Coming up">
                  {data.upcoming.length === 0 ? (
                    <Text muted size={1}>
                      No upcoming events. Add one so visitors know what&apos;s on.
                    </Text>
                  ) : (
                    <Stack space={2}>
                      {data.upcoming.map((e) => (
                        <IntentLink key={e._id} intent="edit" params={{ id: e._id, type: 'event' }} style={linkStyle}>
                          <Card padding={3} radius={2} border>
                            <Flex justify="space-between" align="center" gap={3}>
                              <Stack space={2}>
                                <Text weight="semibold" textOverflow="ellipsis">
                                  {e.title || 'Untitled event'}
                                </Text>
                                <Text size={1} muted>
                                  {e.repeat && e.repeat !== 'none' ? `Repeating · first ${formatWhen(e.start)}` : formatWhen(e.start)}
                                </Text>
                              </Stack>
                              {e.cancelled && <Badge tone="critical">Cancelled</Badge>}
                            </Flex>
                          </Card>
                        </IntentLink>
                      ))}
                    </Stack>
                  )}
                </Panel>

                <Panel title="New messages & prayer requests">
                  {data.messages.length === 0 ? (
                    <Text muted size={1}>
                      You&apos;re all caught up.
                    </Text>
                  ) : (
                    <Stack space={2}>
                      {data.messages.map((m) => (
                        <IntentLink key={m._id} intent="edit" params={{ id: m._id, type: 'contactMessage' }} style={linkStyle}>
                          <Card padding={3} radius={2} border>
                            <Flex justify="space-between" align="center" gap={3}>
                              <Stack space={2}>
                                <Text weight="semibold">{m.name || 'Anonymous'}</Text>
                                <Text size={1} muted>
                                  {formatWhen(m.receivedAt)}
                                </Text>
                              </Stack>
                              <Badge tone={m.kind === 'prayer' ? 'primary' : 'default'}>{m.kind === 'prayer' ? 'Prayer' : 'Message'}</Badge>
                            </Flex>
                          </Card>
                        </IntentLink>
                      ))}
                    </Stack>
                  )}
                  <Text size={1} muted>
                    Latest bulletin:{' '}
                    {data.latestBulletin ? `${data.latestBulletin.title} (${data.latestBulletin.date})` : 'none uploaded yet'}
                  </Text>
                </Panel>
              </Grid>
            </>
          ) : null}

          <Card padding={4} radius={3} tone="transparent" border>
            <Stack space={3}>
              <Heading size={1} as="h2">
                Tips
              </Heading>
              <Text size={1} muted>
                • Nothing appears on the website until you press <strong>Publish</strong>.
              </Text>
              <Text size={1} muted>
                • Always fill in &quot;Describe the photo&quot; — it helps blind visitors and Google Images.
              </Text>
              <Text size={1} muted>
                • For weekly activities (Bible study, choir practice) create one event and set &quot;Repeats&quot;.
              </Text>
              <Text size={1} muted>
                • Notices hide themselves automatically after their &quot;Hide after&quot; date.
              </Text>
            </Stack>
          </Card>
        </Stack>
      </Container>
    </Box>
  )
}
