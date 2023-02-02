import classNames from '@lib/classNames'
import { FC, HTMLAttributes, ReactNode } from 'react'
import { Arrow } from './icons/Arrow'

interface SecondaryButtonPropType extends HTMLAttributes<HTMLButtonElement> {
  icon?: ReactNode
}

export const SecondaryButton: FC<SecondaryButtonPropType> = ({
  children,
  onClick,
  className,
  icon = <Arrow />,
}) => (
  <button
    onClick={onClick}
    className={classNames(
      className,
      `rounded border border-gray-20 group leading-7`,
      `font-medium text-left text-2xl font-bold`,
      `grid grid-cols-[1fr,auto] items-center`,
      `hover:bg-primary hover:text-white transition-colors`,
      `focus:outline-none focus:ring-2 focus:ring-primary`,
      `focus:ring-offset-2 focus:ring-offset-white`
    )}
  >
    <span className="inline-block px-5 py-3">{children}</span>
    <span
      className={classNames(
        `w-14 h-14 inline-flex items-center`,
        `justify-center text-primary group-hover:text-white`
      )}
    >
      {icon}
    </span>
  </button>
)
