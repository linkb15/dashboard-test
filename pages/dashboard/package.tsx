import ConfirmDialog from 'components/elements/ConfirmDialog'
import UploadImageForm from 'components/forms/UploadImageForm'
import Layout from 'components/layouts/Dashboard'
import { db, storage } from 'config/firebase'
import { useAuth } from 'hooks/useAuth'
import React, { useState } from 'react'
import useSWR, { mutate } from 'swr'

const getUserAddresses = async userId => {
  try {
    const doc = await db.collection('users').doc(userId).get()

    if (doc.exists) {
      const snapshot = await db
        .collection('users')
        .doc(doc.id)
        .collection('addresses')
        .get()

      let userFiles = []
      snapshot.forEach(file => {
        let { address } = file.data()
        userFiles.push({ id: file.id, address: address })
      })
      return userFiles
    } else {
      db.collection('users').doc(userId).set({})
      return []
    }
  } catch (e) {
    console.error('getUserAddress', e)
    return []
  }
}

const getUserPackages = async userId => {
  try {
    const doc = await db.collection('users').doc(userId).get()

    if (doc.exists) {
      const snapshot = await db
        .collection('users')
        .doc(doc.id)
        .collection('packages')
        .get()

      let userFiles = []
      snapshot.forEach(file => {
        let { address, invoiceUrl, status, createdAt } = file.data()
        userFiles.push({
          id: file.id,
          address: address,
          invoiceUrl,
          status,
          createdAt,
        })
      })
      return userFiles
    } else {
      db.collection('users').doc(userId).set({})
      return []
    }
  } catch (e) {
    console.error('getUserPackage', e)
    return []
  }
}

const addUserAddresses = async (userId, address) => {
  try {
    let res = await db
      .collection('users')
      .doc(userId)
      .collection('addresses')
      .add({
        address: address,
      })
    return res
  } catch (e) {
    console.error('addUserAddresses', e)
  }
}

const DashBoardPage: React.FC = () => {
  const auth = useAuth()
  const [open, setOpen] = useState(false)
  const [openAddress, setOpenAddress] = useState(false)
  const [file, setFile] = useState(null)
  const [url, setURL] = useState('')

  function handleChange(e) {
    setFile(e.target.files[0])
  }
  const { user } = auth || {}
  const { uid } = user || {}
  const [address, setAddress] = useState('')
  const [chosenAddress, chooseAddress] = useState('')
  const { data, error } = useSWR(uid ? uid : null, getUserAddresses)
  const { data: packages, error: packagesError } = useSWR(
    uid ? uid + 'package' : null,
    () => getUserPackages(uid)
  )

  const addUserPackages = async (userId, file, address) => {
    try {
      let res = await db
        .collection('users')
        .doc(userId)
        .collection('packages')
        .add({
          invoiceImage: file.name,
          status: 'waiting for package',
          address,
          createdAt: Date.now(),
        })
      const uploadTask = await storage
        .ref()
        .child(`users/${userId}/${res.id}-${file.name}`)
        .put(file)
      const url = await uploadTask.ref.getDownloadURL()
      setFile(null)
      await db
        .collection('users')
        .doc(userId)
        .collection('packages')
        .doc(res.id)
        .update({
          invoiceUrl: url,
        })
      setURL(url)
      mutate(uid + 'package')
    } catch (e) {
      console.error('addUserPackages', e)
    }
  }

  return (
    <Layout>
      <div className="flex flex-col bg-gray-200">
        <div className="mt-2">
          <div className="my-2">
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
        {packagesError ? (
          <div>Error loading data!</div>
        ) : !packages ? (
          <div>Loading...</div>
        ) : (
          packages.map(e => (
            <div key={e.id} className="flex justify-between">
              <div>
                <img src={e.invoiceUrl} alt={e.id} height={100} width={100} />
              </div>
              <div>{!!e.createdAt && new Date(e.createdAt).toDateString()}</div>
              <div>{e.address}</div>
              <div>{e.status}</div>
            </div>
          ))
        )}
      </div>
      <ConfirmDialog
        title="Add package"
        open={open}
        onClose={() => setOpen(false)}
        onConfirm={() => {
          if (!!file) addUserPackages(uid, file, chosenAddress)
        }}
      >
        <div>
          <h4>Upload Invoice</h4>
          <input type="file" onChange={handleChange} />
        </div>
        <div>
          <h4>Select address</h4>
          <select
            name="addresses"
            id="addresses"
            className="w-full border-2 mb-2"
            value={chosenAddress}
            onChange={e => chooseAddress(e.target.value)}
          >
            {error ? (
              <option disabled>Error loading data!</option>
            ) : !data ? (
              <option disabled>Loading...</option>
            ) : (
              data.map(e => (
                <option key={e.id} value={e.address}>
                  {e.address}
                </option>
              ))
            )}
          </select>
          <button
            className="flex items-center justify-center rounded-md bg-black text-white py-2 px-3"
            onClick={() => setOpenAddress(true)}
          >
            Add address
          </button>
        </div>
      </ConfirmDialog>
      <ConfirmDialog
        title="Add address"
        open={openAddress}
        onClose={() => setOpenAddress(false)}
        onConfirm={() => {
          if (!!address) {
            setAddress('')
            addUserAddresses(uid, address)
            mutate(uid)
          }
        }}
      >
        <input
          type="text"
          className="border-black border-2"
          onChange={e => setAddress(e.target.value)}
        />
      </ConfirmDialog>
    </Layout>
  )
}
export default DashBoardPage
