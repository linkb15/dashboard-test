import Dialog from './Dialog'
import Button from 'components/elements/Button'
interface Props {
  title: string
  children: React.ReactNode
  open: boolean
  onClose: Function
  onConfirm: Function
}
export default function Confirm(props: Props) {
  const { open, onClose, title, children, onConfirm } = props
  if (!open) {
    return <></>
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <h2 className="text-xl">{title}</h2>
      <div className="py-5">{children}</div>
      <div className="flex justify-end">
        <div className="p-1">
          <Button
            onClick={() => onClose()}
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-secondary hover:bg-secondary-light hover:bg-indigo-500 hover:text-white focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
          >
            No
          </Button>
        </div>
        <div className="p-1">
          <Button
            onClick={() => {
              onClose()
              onConfirm()
            }}
          >
            Yes
          </Button>
        </div>
      </div>
    </Dialog>
  )
}
