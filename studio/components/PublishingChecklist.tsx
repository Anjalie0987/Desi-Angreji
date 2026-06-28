import React from 'react';
import { Card, Text, Stack, Flex, Label, Badge } from '@sanity/ui';
import { useFormValue } from 'sanity';

export function PublishingChecklist(props: any) {
  // Read document values
  const title = useFormValue(['title']) as string;
  const category = useFormValue(['category']) as any;
  const author = useFormValue(['author']) as any;
  const content = useFormValue(['content']) as any[];
  const featuredImage = useFormValue(['featuredImage']) as any;
  const seo = useFormValue(['seo']) as any;
  const socialMedia = useFormValue(['socialMedia']) as any;
  const status = useFormValue(['status']) as string;

  const checks = [
    { label: 'Title', passed: !!title },
    { label: 'Category', passed: !!category },
    { label: 'Author', passed: !!author },
    { label: 'Story Content', passed: content && content.length > 0 },
    { label: 'Featured Image', passed: !!featuredImage },
    { label: 'SEO Settings', passed: seo?.metaTitle && seo?.metaDescription },
    { label: 'Social Captions', passed: socialMedia?.instagramCaption || socialMedia?.facebookCaption },
    { label: 'Status Published', passed: status === 'published' },
  ];

  const allPassed = checks.every(c => c.passed);
  const requiredPassed = checks.slice(0, 5).every(c => c.passed);

  return (
    <Card padding={4} radius={2} shadow={1} border tone={allPassed ? 'positive' : (requiredPassed ? 'caution' : 'critical')}>
      <Stack space={4}>
        <Flex justify="space-between" align="center">
          <Label>Publishing Checklist</Label>
          <Badge mode="outline" tone={allPassed ? 'positive' : (requiredPassed ? 'caution' : 'critical')}>
            {allPassed ? 'Ready to Publish' : (requiredPassed ? 'Missing Optimizations' : 'Missing Requirements')}
          </Badge>
        </Flex>
        <Stack space={3}>
          {checks.map((check, idx) => (
            <Flex key={idx} gap={2} align="center">
              <Text size={1} style={{ color: check.passed ? 'var(--card-badge-positive-fg-color)' : 'var(--card-badge-critical-fg-color)' }}>
                {check.passed ? '✓' : '✗'}
              </Text>
              <Text size={1} muted={!check.passed}>
                {check.label}
              </Text>
            </Flex>
          ))}
        </Stack>
      </Stack>
    </Card>
  );
}
