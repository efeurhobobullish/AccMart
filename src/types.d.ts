interface InputWithIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: React.ReactNode;
  type: string;
  label?: string;
  error?: string;
}
interface InputWithoutIconProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  type: string;
  label?: string;
  error?: string;
}

interface ButtonWithLoaderProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  initialText: string;
  loadingText: string;
}

interface SelectWithIconProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  icon: React.ReactNode;
  label?: string;
  error?: string;
  defaultValue?: string;
  options: {
    label: string;
    value: string;
  }[];
}

interface SelectWithoutIconProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  defaultValue?: string;
  options: {
    label: string;
    value: string;
  }[];
}

interface Credential {
  id: string
  title: string
  fields: {
    label: string
    value: string
  }[]
}

interface User {
  id: string;
  name: string;
  password: string;
  securityQuestion?: string;
  securityAnswer?: string;
}

interface PrivateNote {
  id: string;
  title: string;
  content: string;
}

interface SecretUrl {
  id: string;
  title: string;
  url: string;
}