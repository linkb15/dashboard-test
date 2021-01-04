import ConfirmDialog from 'components/elements/ConfirmDialog'
import Layout from 'components/layouts/Dashboard'
import { useAuth } from 'hooks/useAuth'
import React, { useState } from 'react'
const DashBoardPage: React.FC = () => {
  const auth = useAuth()
  const [open, setOpen] = useState(false)
  return (
    <Layout>
      <div className="flex bg-gray-200">
        <div className="mt-2">
          <div className="mt-2">
            <h2 className="mt-6 mb-2 text-3xl font-extrabold text-gray-900">
              Package
            </h2>
            <button
              className="flex items-center justify-center rounded-md bg-black text-white py-2 px-3"
              onClick={() => setOpen(true)}
            >
              Add package
            </button>
          </div>
        </div>
      </div>
      <ConfirmDialog
        title="Add package"
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => console.log('add')}
      >
        <div>
          Upload Invoice
          <input type="file" />
        </div>
        <div>
          Select address
          <input type="select" />
        </div>
      </ConfirmDialog>
    </Layout>
  )
}
export default DashBoardPage
