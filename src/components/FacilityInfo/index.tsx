import { FC } from 'react'
import { TableRowType } from '@common/types/gristData'
import { useDistanceToUser } from '@lib/hooks/useDistanceToUser'
import { useIsFacilityOpened } from '@lib/hooks/useIsFacilityOpened'
import { useTexts } from '@lib/TextsContext'
import { mapRecordToMinimum } from '@lib/mapRecordToMinimum'
import { BackButton } from '@components/BackButton'
import { useRecordLabels } from '@lib/hooks/useRecordLabels'
import { getLabelRenderer } from '@lib/getLabelRenderer'
import { Phone } from '@components/icons/Phone'
import classNames from '@lib/classNames'
import { Globe } from '@components/icons/Globe'
import { Email } from '@components/icons/Email'
import { TextLink } from '@components/TextLink'
import { Geopin } from '@components/icons/Geopin'
import { getTodayKey } from '@lib/getTodayKey'
import { useUrlState } from '@lib/UrlStateContext'
import { Accessible } from '@components/icons/Accessible'

interface FacilityInfoType {
  facility: TableRowType
}

interface OpenDaysType {
  day: string
  hours: string
  isActive: boolean
}

const OpenDaysItem: FC<OpenDaysType> = ({ day, hours, isActive }) => {
  return (
    <div
      className={classNames(
        `flex justify-between gap-4 py-2 px-5 -mt-1`,
        isActive && `bg-red text-white`
      )}
    >
      <div>{day}</div>
      {hours}
    </div>
  )
}

export const FacilityInfo: FC<FacilityInfoType> = ({ facility }) => {
  const [urlState] = useUrlState()
  const texts = useTexts()
  const parsedFacilty = mapRecordToMinimum(facility)
  const isOpened = useIsFacilityOpened(parsedFacilty)
  const { getDistanceToUser } = useDistanceToUser()
  const distance = getDistanceToUser({
    latitude: facility.fields.lat,
    longitude: facility.fields.long,
  })
  const { allLabels, topicsLabels, targetAudienceLabels } = useRecordLabels(
    facility.fields.Schlagworte
  )

  const renderLabel = getLabelRenderer({
    activeFilters: urlState.tags || [],
    withInteractiveLabels: false,
  })

  const { Strasse, Hausnummer, PLZ } = facility.fields
  const addressOneLiner =
    Strasse && Hausnummer && PLZ
      ? `${Strasse} ${Hausnummer}, ${PLZ} Berlin`
      : undefined

  const accessibility = facility.fields.Barrierefreiheit.trim().toLowerCase()

  const infoList = [
    {
      icon: <Geopin />,
      text: addressOneLiner,
    },
    accessibility !== 'nein' &&
      accessibility !== 'keine angabe' && {
        icon: <Accessible />,
        text: facility.fields.Barrierefreiheit.trim().split(';').join(', '),
      },
    {
      icon: <Globe />,
      text: facility.fields.Website,
      href: facility.fields.Website,
    },
    {
      icon: <Email />,
      text: facility.fields.EMail,
      href: `mailto:${facility.fields.EMail}`,
    },
    {
      icon: <Phone />,
      text: facility.fields.Telefonnummer,
      href: `tel:${facility.fields.Telefonnummer}`,
    },
  ].filter((info) => typeof info === 'object' && !!info.text) as {
    icon: JSX.Element
    text: string
    href?: string
  }[]

  const todayKey = getTodayKey()

  return (
    <>
      <BackButton href={{ pathname: `/map`, query: { ...urlState } }} />
      <article className="flex flex-col h-full gap-8">
        <div className="px-5 pt-5">
          <h1 className="mb-2 text-3xl normal-case break-words hyphens-auto">
            {facility.fields.Einrichtung}
          </h1>
          {(distance || isOpened) && (
            <div className="flex text-lg gap-4">
              {isOpened && (
                <span className="flex items-center text-mittelgruen gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-mittelgruen"></span>
                  {texts.opened}
                </span>
              )}
              {distance && <span>{distance} km</span>}
            </div>
          )}
          <p className="mt-4">{facility.fields.Uber_uns}</p>
        </div>
        {allLabels.length > 0 && (
          <div className="w-full">
            <div className="overflow-x-auto">
              {topicsLabels.length > 0 && (
                <div className="float-left flex gap-2 p-5 whitespace-nowrap">
                  {topicsLabels.map(renderLabel)}
                </div>
              )}
            </div>
            {targetAudienceLabels.length > 0 && (
              <>
                <h2 className="px-5 mt-2 text-lg font-bold">
                  {texts.filtersSearchTargetLabelOnCard}
                </h2>
                <div className="overflow-x-auto">
                  <div className="float-left flex gap-2 p-5 gap-2 pt-1 whitespace-nowrap">
                    {targetAudienceLabels.map(renderLabel)}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
        {infoList.length > 0 && (
          <ul className="text-lg">
            {infoList.map(({ icon, text, href }, idx) => (
              <li
                key={idx}
                className={classNames(
                  `flex gap-4 px-5 py-3 odd:bg-gray-10`,
                  `items-center`
                )}
              >
                <span className="text-red">{icon}</span>
                {href && (
                  <TextLink className="no-underline" href={href}>
                    {text}
                  </TextLink>
                )}
                {!href && <span>{text}</span>}
              </li>
            ))}
          </ul>
        )}
        {facility.fields.Montag && (
          <div className="pb-8">
            <h4 className="flex justify-between px-5 mb-5 text-lg font-bold">
              Öffnungszeiten
              {isOpened && !parsedFacilty.open247 && (
                <span className="flex items-center font-normal text-mittelgruen gap-2">
                  <span className="inline-block w-2 h-2 rounded-full bg-mittelgruen"></span>
                  {texts.opened}
                </span>
              )}
            </h4>
            {parsedFacilty.open247 && (
              <div className="px-5">
                <p
                  className={classNames(
                    'flex items-center gap-2 justify-center',
                    'border border-mittelgruen text-mittelgruen font-bold ',
                    'px-5 py-2'
                  )}
                >
                  <span
                    className={classNames(
                      'inline-block w-2 h-2 rounded-full bg-mittelgruen'
                    )}
                  ></span>
                  {texts.alwaysOpened}
                </p>
              </div>
            )}
            {!parsedFacilty.open247 && (
              <>
                <OpenDaysItem
                  isActive={todayKey === 'Montag'}
                  day={texts.weekdayMonday}
                  hours={facility.fields.Montag}
                />
                <OpenDaysItem
                  isActive={todayKey === 'Dienstag'}
                  day={texts.weekdayTuesday}
                  hours={facility.fields.Dienstag}
                />
                <OpenDaysItem
                  isActive={todayKey === 'Mittwoch'}
                  day={texts.weekdayWednesday}
                  hours={facility.fields.Mittwoch}
                />
                <OpenDaysItem
                  isActive={todayKey === 'Donnerstag'}
                  day={texts.weekdayThursday}
                  hours={facility.fields.Donnerstag}
                />
                <OpenDaysItem
                  isActive={todayKey === 'Freitag'}
                  day={texts.weekdayFriday}
                  hours={facility.fields.Freitag}
                />
                <OpenDaysItem
                  isActive={todayKey === 'Samstag'}
                  day={texts.weekdaySaturday}
                  hours={facility.fields.Samstag}
                />
                <OpenDaysItem
                  isActive={todayKey === 'Sonntag'}
                  day={texts.weekdaySunday}
                  hours={facility.fields.Sonntag}
                />
              </>
            )}
          </div>
        )}
      </article>
    </>
  )
}
