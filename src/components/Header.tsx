import logo from '@/assets/logo.svg'

export function Header() {
  return (
    <header className="flex justify-between">
      <img src={logo} alt="" />
      <img
        src="https://github.com/MatheusGCM.png"
        alt=""
        className="size-10 rounded-full border-2 border-gray-2"
      />
    </header>
  )
}
