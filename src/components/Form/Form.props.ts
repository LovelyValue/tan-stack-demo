export interface FormProps {
  textButton: string
  textLink: string
  URLLink: string
  validateEmail: (value: string) => string | Array<string> | undefined
  validatePassword: (value: string) => string | Array<string> | undefined
}
