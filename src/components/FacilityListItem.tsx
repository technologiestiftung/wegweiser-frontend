import classNames from '@lib/classNames'
import { useDistanceToUser } from '@lib/hooks/useDistanceToUser'
import { useIsFacilityOpened } from '@lib/hooks/useIsFacilityOpened'
import { useRecordLabels } from '@lib/hooks/useRecordLabels'
import { MinimalRecordType } from '@lib/mapRecordToMinimum'
import { useTexts } from '@lib/TextsContext'
import Link from 'next/link'
import { FC } from 'react'

interface FacilityListItemPropsType extends MinimalRecordType {
  className?: string
}

export const FacilityListItem: FC<FacilityListItemPropsType> = ({
  className = ``,
  ...record
}) => {
  const { id, title, latitude, longitude, labels } = record
  const texts = useTexts()
  const distance = useDistanceToUser({
    latitude,
    longitude,
  })
  const isOpened = useIsFacilityOpened(record)

  const { allLabels, topicsLabels, targetAudienceLabels } =
    useRecordLabels(labels)

  return (
    <li className={classNames(className)}>
      <Link href={`/${id}`}>
        <a
          className={classNames(
            `border-b border-b-black block`,
            `flex flex-col gap-1 bg-white group`,
            `transition-colors hover:bg-gray-10/50`,
            `focus:ring-inset focus:ring-2 focus:ring-red`,
            `focus:outline-none focus:border-b-red`
          )}
        >
          <header
            className={classNames(
              `border-b border-gray-10 p-5`,
              allLabels.length > 0 && `pb-3`
            )}
          >
            <h2
              className={classNames(
                `font-bold text-xl`,
                `group-hover:text-red transition-colors`,
                `group-focus:text-red`
              )}
            >
              {title}
            </h2>
            {(distance || isOpened) && (
              <div className="flex gap-4 text-lg">
                {isOpened && (
                  <small className="text-mittelgruen flex gap-2 items-center">
                    <span className="w-2 h-2 inline-block bg-mittelgruen rounded-full"></span>
                    {texts.opened}
                  </small>
                )}
                {distance && <small>{distance} km</small>}
              </div>
            )}
          </header>
          {allLabels.length > 0 && (
            <footer className="px-5 pt-4 pb-7">
              {topicsLabels.length > 0 && (
                <div className="flex gap-1 flex-wrap">
                  {topicsLabels.map((label) => (
                    <span
                      className={classNames(
                        `inline-block px-1.5 py-0.5 border border-gray-20 leading-4`,
                        `text-sm bg-white`
                      )}
                      key={label?.id}
                    >
                      {label.fields.text}
                    </span>
                  ))}
                </div>
              )}
              {targetAudienceLabels.length > 0 && (
                <div className="text-sm mt-4 leading-4">
                  {texts.filtersSearchTargetLabelOnCard}:{' '}
                  <strong>
                    {targetAudienceLabels
                      .map(({ fields }) => fields.text)
                      .join(', ')}
                  </strong>
                </div>
              )}
            </footer>
          )}
        </a>
      </Link>
    </li>
  )
}
