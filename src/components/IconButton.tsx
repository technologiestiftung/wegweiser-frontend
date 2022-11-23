import classNames from '@lib/classNames'
import { useUrlState } from '@lib/UrlStateContext'
import Link from 'next/link'
import { FC } from 'react'

interface IconButtonCommonProps {
  className?: string
  'aria-label'?: string
  tabIndex?: number
}

interface IconButtonLinkPropsType extends IconButtonCommonProps {
  pathName: string
}

interface IconButtonPropsType extends IconButtonCommonProps {
  onClick: () => void
}

const commonClasses = [
  `h-12 w-12 border border-black bg-white`,
  `justify-center items-center shrink-0`,
  `hover:bg-red hover:text-white transition-colors`,
  `focus:outline-none focus:ring-2 focus:ring-red`,
  `focus:ring-offset-2 focus:ring-offset-white focus:z-30`,
]

export const IconButton: FC<IconButtonPropsType> = ({
  className = '',
  onClick,
  children,
  'aria-label': ariaLabel,
  tabIndex = 1,
}) => {
  return (
    <button
      tabIndex={tabIndex}
      onClick={onClick}
      className={classNames(className, ...commonClasses)}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  )
}

export const IconButtonLink: FC<IconButtonLinkPropsType> = ({
  className = '',
  pathName,
  children,
  'aria-label': ariaLabel,
  tabIndex = 0,
}) => {
  const [urlState] = useUrlState()
  return (
    <Link href={{ pathname: pathName, query: { ...urlState } }}>
      <a
        tabIndex={tabIndex}
        className={classNames(className, ...commonClasses)}
        aria-label={ariaLabel}
      >
        {children}
      </a>
    </Link>
  )
}