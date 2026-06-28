import { DocumentActionProps } from 'sanity'
import { useToast } from '@sanity/ui'

export function CopyUrlAction(props: DocumentActionProps) {
  const { published, draft } = props
  const doc = draft || published
  const toast = useToast()

  const baseUrl = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000'
  const slug = (doc?.slug as any)?.current
  const url = slug ? `${baseUrl}/story/${slug}` : baseUrl

  return {
    label: 'Copy Story URL',
    onHandle: () => {
      if (!slug) {
        toast.push({
          status: 'warning',
          title: 'Cannot copy URL',
          description: 'Document must have a slug first.'
        })
        return
      }
      
      navigator.clipboard.writeText(url).then(() => {
        toast.push({
          status: 'success',
          title: 'Story URL Copied!'
        })
      }).catch(() => {
        toast.push({
          status: 'error',
          title: 'Failed to copy URL'
        })
      })
      
      // Tell Sanity we are done
      props.onComplete()
    }
  }
}
