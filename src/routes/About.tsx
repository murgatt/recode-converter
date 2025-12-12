import { CoffeeIcon, GithubIcon, LinkIcon } from 'lucide-react';
import { marked } from 'marked';
import { useTranslation } from 'react-i18next';
import { Button } from 'src/components/ui/Button';
import { Separator } from 'src/components/ui/Separator';
import { Tooltip } from 'src/components/ui/Tooltip';
import { APP_WEBSITE_URL, AUTHOR_GITHUB_URL, COFFEE_URL, GITHUB_REPOSITORY_URL } from 'src/constants';
import changelog from '../../CHANGELOG.md?raw';
import { version } from '../../package.json';

marked.use({
  renderer: {
    link: ({ href, text }) => `<a href="${href}" target="_blank">${text}</a>`,
  },
});
const parsedChangelog = marked.parse(changelog);

export const About = () => {
  const { t } = useTranslation();

  return (
    <section className="flex h-screen flex-col items-center overflow-y-auto p-6">
      <img alt={t('about.appIconAlt')} className="w-48 max-w-full" src="./icon.png" />
      <div className="flex w-full flex-col items-center gap-3">
        <h1 className="w-full title-lg text-center">Recode Converter</h1>
        <p className="caption-sm">v{version}</p>
        <p className="paragraph-sm">
          {t('about.builtBy')}{' '}
          <a className="underline underline-offset-4" href={AUTHOR_GITHUB_URL} rel="noreferrer" target="_blank">
            @murgatt
          </a>
        </p>
        <div className="flex gap-1">
          <Tooltip content={t('about.githubLabel')} position="bottom">
            <Button aria-label={t('about.githubLabel')} asChild size="icon" variant="ghost">
              <a href={GITHUB_REPOSITORY_URL} rel="noreferrer" target="_blank">
                <GithubIcon size="16" />
              </a>
            </Button>
          </Tooltip>
          <Tooltip content={t('about.websiteLabel')} position="bottom">
            <Button aria-label={t('about.websiteLabel')} asChild size="icon" variant="ghost">
              <a href={APP_WEBSITE_URL} rel="noreferrer" target="_blank">
                <LinkIcon size="16" />
              </a>
            </Button>
          </Tooltip>
          <Tooltip content={t('about.buyMeACoffee')} position="bottom">
            <Button aria-label={t('about.buyMeACoffee')} asChild size="icon" variant="ghost">
              <a href={COFFEE_URL} rel="noreferrer" target="_blank">
                <CoffeeIcon size="16" />
              </a>
            </Button>
          </Tooltip>
        </div>
        <Separator />
        <div
          className="[&_a]:underline [&>h1]:title-lg [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:border-b [&>h2]:pb-2 [&>h2]:title-md [&>h3]:mt-6 [&>h3]:mb-4 [&>h3]:title-sm [&>ul]:list-disc [&>ul]:pl-8"
          dangerouslySetInnerHTML={{ __html: parsedChangelog }}
        />
      </div>
    </section>
  );
};
