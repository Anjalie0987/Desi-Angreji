import React from 'react';
import { Card, Text, Button, Stack, Flex, useToast, Label } from '@sanity/ui';
import { useFormValue } from 'sanity';

export function SocialToolkit(props: any) {
  const toast = useToast();
  
  // Read document values
  const title = useFormValue(['title']) as string;
  const slug = useFormValue(['slug', 'current']) as string;
  const excerpt = useFormValue(['excerpt']) as string;
  const socialMedia = useFormValue(['socialMedia']) as any;

  // Assuming preview URL is localhost:3000 for dev, but we should make it dynamic
  // We can just use a fixed domain or relative for now
  const baseUrl = process.env.SANITY_STUDIO_PREVIEW_URL || 'http://localhost:3000';
  const url = slug ? `${baseUrl}/story/${slug}` : baseUrl;

  const handleCopy = (text: string, label: string) => {
    if (!text) {
      toast.push({
        status: 'warning',
        title: 'Nothing to copy',
      });
      return;
    }

    navigator.clipboard.writeText(text).then(() => {
      toast.push({
        status: 'success',
        title: `Copied ${label}`,
      });
    }).catch((err) => {
      toast.push({
        status: 'error',
        title: 'Failed to copy',
      });
    });
  };

  const previewStory = `${title || 'No Title'}\n\n${excerpt || ''}\n\nRead more: ${url}`;
  const instagramCaption = socialMedia?.instagramCaption || `${title || 'No Title'}\n\nLink in bio!`;
  const facebookCaption = socialMedia?.facebookCaption || `${title || 'No Title'}\n\n${url}`;
  const threadsCaption = socialMedia?.threadsCaption || `${title || 'No Title'}\n\n${url}`;
  const whatsappCaption = socialMedia?.whatsappCaption || `*${title || 'No Title'}*\n\n${excerpt || ''}\n\n${url}`;
  const linkedinCaption = socialMedia?.linkedinCaption || `${title || 'No Title'}\n\n${url}`;
  const xCaption = socialMedia?.xCaption || `${title || 'No Title'}\n\n${url}`;

  const copyButtons = [
    { label: 'Copy Preview Story', text: previewStory },
    { label: 'Copy Share URL', text: url },
    { label: 'Copy Instagram Caption', text: instagramCaption },
    { label: 'Copy Facebook Caption', text: facebookCaption },
    { label: 'Copy Threads Caption', text: threadsCaption },
    { label: 'Copy WhatsApp Caption', text: whatsappCaption },
    { label: 'Copy LinkedIn Caption', text: linkedinCaption },
    { label: 'Copy X Caption', text: xCaption },
  ];

  return (
    <Card padding={4} radius={2} shadow={1} border>
      <Stack space={4}>
        <Label>Social Publishing Toolkit</Label>
        <Text size={1} muted>
          Use these buttons to quickly copy social media captions and share links to your clipboard.
        </Text>
        <Flex gap={2} wrap="wrap">
          {copyButtons.map((btn, idx) => (
            <Button
              key={idx}
              mode="ghost"
              text={btn.label}
              onClick={() => handleCopy(btn.text, btn.label)}
            />
          ))}
        </Flex>
      </Stack>
    </Card>
  );
}
