import { useTexts } from '@lib/TextsContext'
import { FC } from 'react'
import Link from 'next/link'
import classNames from '@lib/classNames'

export const LegalFooter: FC = () => {
  const texts = useTexts()
  return (
    <>
      <footer className={classNames(`border-t border-gray-20`)}>
        <div
          className={classNames(
            'md:container mx-auto md:max-w-7xl',
            'py-5 px-5 md:py-8 lg:px-8',
            'flex gap-x-4 gap-y-3 flex-wrap justify-between'
          )}
        >
          <p className="text-sm text-gray-60">
            <b>{texts.disclaimerPrefix}</b> {texts.disclaimerContent}
          </p>
          <section
            className={classNames(
              `flex gap-x-6 gap-y-4 flex-wrap text-gray-40`
            )}
          >
            <Link href="/info">
              <a
                className={classNames(
                  `underline transition-colors hover:text-primary`,
                  `focus:outline-none focus:ring-2 focus:ring-primary`,
                  `focus:ring-offset-2 focus:ring-offset-white`
                )}
              >
                {texts.footerInfoPageLinkText}
              </a>
            </Link>
            <a
              className={classNames(
                `underline transition-colors hover:text-primary`,
                `focus:outline-none focus:ring-2 focus:ring-primary`,
                `focus:ring-offset-2 focus:ring-offset-white`
              )}
              href={texts.footerImprintLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {texts.footerImprintLinkText}
            </a>
            <a
              className={classNames(
                `underline transition-colors hover:text-primary`,
                `focus:outline-none focus:ring-2 focus:ring-primary`,
                `focus:ring-offset-2 focus:ring-offset-white`
              )}
              href={texts.footerPrivacyLinkUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {texts.footerPrivacyLinkText}
            </a>
          </section>
        </div>
      </footer>
    </>
  )
}
