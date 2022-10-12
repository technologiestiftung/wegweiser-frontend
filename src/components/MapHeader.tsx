import classNames from '@lib/classNames'
import { FeatureType } from '@lib/requests/geocode'
import { useTexts } from '@lib/TextsContext'
import { useUrlState } from '@lib/UrlStateContext'
import { FC } from 'react'
import { IconButton } from './IconButton'
import { House } from './icons/House'
import { Search } from './Search'

interface MapHeaderPropsType {
  filterSidebarIsOpened: boolean
  listViewOpen: boolean
  setFilterSidebarIsOpened: (newState: boolean) => void
  handleSearchResult: ((place: FeatureType) => void) | undefined
}

export const MapHeader: FC<MapHeaderPropsType> = ({
  filterSidebarIsOpened,
  setFilterSidebarIsOpened,
  handleSearchResult,
  listViewOpen,
}) => {
  const [urlState] = useUrlState()
  const texts = useTexts()

  return (
    <>
      <div
        className={classNames(
          `fixed inset-0 z-30 bottom-auto h-20`,
          listViewOpen ? `opacity-100` : `opacity-0`,
          `lg:opacity-0 transition-opacity`,
          `bg-white border-b border-black`
        )}
      ></div>
      <IconButton
        pathName="/"
        className={classNames(
          'flex border-r-0 md:border-r',
          `fixed lg:left-sidebarW ml-4 top-4 z-30`
        )}
        aria-label={texts.backToHome}
      >
        <House />
      </IconButton>
      <div
        className={classNames(
          `flex fixed top-4 right-4 transition-transform z-30`,
          `w-full max-w-[calc(100vw-2rem)] md:max-w-xs lg:max-w-sm justify-between`,
          filterSidebarIsOpened
            ? `2xl:-translate-x-sidebarW`
            : `2xl:translate-x-0`
        )}
      >
        <IconButton
          pathName="/"
          className="flex md:hidden border-r-0 md:border-r"
          aria-label={texts.backToHome}
        >
          <House />
        </IconButton>
        <Search onSelectResult={handleSearchResult} />
        <button
          onClick={() => setFilterSidebarIsOpened(!filterSidebarIsOpened)}
          className={classNames(
            `flex items-center group relative`,
            `focus:border-l focus:z-20`,
            `focus:outline-none focus:ring-2 focus:ring-red`,
            `focus:ring-offset-2 focus:ring-offset-white`
          )}
        >
          <span
            className={classNames(
              `border border-black border-l-0`,
              `px-4 py-2 h-12 text-xl font-bold`,
              `bg-white text-left whitespace-nowrap`,
              `transition-colors group-hover:bg-red group-hover:text-white`
            )}
          >
            {texts.filterLabel}
          </span>
          {urlState.tags && urlState.tags.length > 0 && (
            <span
              className={classNames(
                `border border-black border-l-0`,
                `flex items-center h-12 w-12 text-lg justify-center`,
                `bg-red text-white font-bold text-center leading-4`
              )}
            >
              {urlState.tags.length}
            </span>
          )}
        </button>
      </div>
    </>
  )
}
