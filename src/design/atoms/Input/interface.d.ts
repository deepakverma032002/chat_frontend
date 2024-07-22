interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  isIcon?: boolean
  icon?: ReactNode
  wrapperClassName?: string
  labelClassName?: string
  iconClassName?: string
  error?: string
  type?: HTMLInputElement['type'] | 'select'
  options?: { value: string; label: string }[]
  inputBorderRadius?: string
  inputWrapperClassName?: string
}
