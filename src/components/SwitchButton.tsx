import classNames from '@lib/classNames'
import { FC } from 'react'

interface SwitchButtonPropsType {
  value: boolean
  onToggle?: (isOn: boolean) => void
  disabled?: boolean
  className?: string
  tooltip?: string
}

export const SwitchButton: FC<SwitchButtonPropsType> = ({
  children,
  value,
  className = '',
  onToggle = () => undefined,
  disabled = false,
  tooltip,
}) => (
  <button
    onClick={() => !disabled && onToggle(!value)}
    className={classNames(
      className,
      `mb-8 flex w-full gap-5 text-lg items-center`,
      `transition-colors relative text-left`,
      `focus:outline-none group`,
      !disabled && `hover:text-red`,
      disabled && `cursor-not-allowed text-gray-40`
    )}
  >
    <span
      className={classNames(
        `rounded-full p-1 flex relative w-[61px]`,
        !disabled && [
          `border-black`,
          `group-focus:outline-none group-focus:ring-2 group-focus:ring-red`,
          `group-focus:ring-offset-2 group-focus:ring-offset-white`,
        ],
        value ? 'bg-blau' : `bg-gray-10`
      )}
    >
      <span className="w-6 h-6 inline-block" />
      <span className="w-6 h-6 inline-block" />
      <span
        className={classNames(
          `absolute top-0 left-0 m-1 w-6 h-6 inline-block`,
          `transition rounded-full`,
          value && 'translate-x-[28px]',
          !disabled && [
            !disabled && value
              ? `bg-white`
              : `bg-gray-20 group-hover:bg-gray-40`,
          ],
          disabled && `bg-gray-20`
        )}
      />
    </span>
    {children}
    {tooltip && (
      <span
        className={classNames(
          `absolute -top-2 left-0 text-left -translate-y-full w-full`,
          `px-2 py-1 text-white bg-black/70 opacity-0 pointer-events-none`,
          `group-hover:opacity-100 transition-colors text-sm leading-tight`
        )}
      >
        {tooltip}
      </span>
    )}
  </button>
)