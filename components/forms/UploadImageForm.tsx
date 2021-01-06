import React from 'react'
import { useDropzone, FileWithPath, FileError } from 'react-dropzone'

function Accept(props) {
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: 'image/jpeg, image/png',
  })

  const acceptedFileItems = acceptedFiles.map((file: FileWithPath) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ))

  const fileRejectionItems = fileRejections.map(
    ({ file, errors }: { file: FileWithPath; errors: FileError[] }) => (
      <li key={file.path}>
        {file.path} - {file.size} bytes
        <ul>
          {errors.map(e => (
            <li key={e.code}>{e.message}</li>
          ))}
        </ul>
      </li>
    )
  )

  return (
    <section className="container">
      <div
        {...getRootProps({
          className:
            'flex-col p-5 border-2 border-dashed rounded-sm border-gray-500 focus:border-gray-500 outline-0 transition duration-300 ease-in-out',
        })}
      >
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
        <em>(Only *.jpeg and *.png images will be accepted)</em>
      </div>
      <aside>
        <h4>Accepted files</h4>
        <ul>{acceptedFileItems}</ul>
        <h4>Rejected files</h4>
        <ul>{fileRejectionItems}</ul>
      </aside>
    </section>
  )
}
export default Accept
