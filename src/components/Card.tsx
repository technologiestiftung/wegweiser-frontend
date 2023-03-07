import classNames from '@lib/classNames'
import { FC, ReactNode } from 'react'

interface CardPropsType {
  title: string
  header?: ReactNode
  footer?: ReactNode
  className?: string
}

export const Card: FC<CardPropsType> = ({
  className = '',
  title,
  header: headerContent,
  footer,
  children,
}) => {
  return (
    <div
      className={classNames(
        'block',
        'flex flex-col gap-1 bg-white',
        'px-5 py-5',
        'border border-gray-20',
        className
      )}
    >
      <h2 className={classNames(`font-bold text-xl`)}>{title}</h2>
      {headerContent && <header>{headerContent}</header>}
      {children}
      {footer && <footer className="mt-6 w-full">{footer}</footer>}
    </div>
  )
}
