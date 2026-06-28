import { DocumentActionProps } from 'sanity'

export function PreviewAction(props: DocumentActionProps) {
  const { published, draft } = props
  const doc = draft || published

  // Assuming standard Next.js local setup
  const baseUrl = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'
  const slug = (doc?.slug as any)?.current
  const url = slug ? `${baseUrl}/story/${slug}` : baseUrl

  return {
    label: 'Preview Story',
    onHandle: () => {
      window.open(url, '_blank')
    }
  }
}
