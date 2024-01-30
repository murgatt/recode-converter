import { GithubIcon, LinkIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { ExternalLink } from 'src/components/ExternalLink';
import { Button } from 'src/components/ui/Button';
import { Tooltip } from 'src/components/ui/Tooltip';
import { APP_WEBSITE_URL, AUTHOR_GITHUB_URL, GITHUB_REPOSITORY_URL } from 'src/constants';
import { version } from '../../package.json';

export const About = () => {
  const { t } = useTranslation();

  return (
    <section className="flex h-screen flex-col items-center overflow-y-auto p-6">
      <img alt={t('about.appIconAlt')} className="w-48 max-w-full" src="/icon.png" />
      <div className="flex w-full flex-col items-center gap-3">
        <h1 className="title-lg w-full text-center">Recode Converter</h1>
        <p className="caption-sm">v{version}</p>
        <p className="paragraph-sm">
          {t('about.developedBy')}{' '}
          <ExternalLink className="underline underline-offset-4" href={AUTHOR_GITHUB_URL}>
            @murgatt
          </ExternalLink>
        </p>
        <div className="flex gap-1">
          <Tooltip content={t('about.githubLabel')} position="bottom">
            <Button aria-label={t('about.githubLabel')} asChild size="icon" variant="ghost">
              <ExternalLink href={GITHUB_REPOSITORY_URL}>
                <GithubIcon size="16" />
              </ExternalLink>
            </Button>
          </Tooltip>
          <Tooltip content={t('about.websiteLabel')} position="bottom">
            <Button aria-label={t('about.websiteLabel')} asChild size="icon" variant="ghost">
              <ExternalLink href={APP_WEBSITE_URL}>
                <LinkIcon size="16" />
              </ExternalLink>
            </Button>
          </Tooltip>
        </div>
      </div>
    </section>
  );
};
