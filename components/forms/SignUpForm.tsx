import { useForm } from 'react-hook-form'
import { useAuth } from 'hooks/useAuth'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Button from 'components/elements/Button'
interface SignUpData {
  name: string
  email: string
  password: string
}
const SignUpForm: React.FC = () => {
  const { register, errors, handleSubmit } = useForm()
  const auth = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const onSubmit = async (data: SignUpData) => {
    setIsLoading(true)
    setError(null)
    return auth.signUp(data).then(response => {
      setIsLoading(false)
      response.error ? setError(response.error) : router.push('/login')
    })
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-md shadow-sm">
        <label
          htmlFor="name"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Name
        </label>
        <input
          id="name"
          className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
          type="text"
          name="name"
          ref={register({
            required: 'Please enter an name',
          })}
        />
        {errors.password && (
          <div className="mt-2 text-xs text-red-600">
            {errors.password.message}
          </div>
        )}
      </div>
      <div className="mt-6">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Email address
        </label>
        <div className="mt-1 rounded-md shadow-sm">
          <input
            id="email"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            type="email"
            name="email"
            ref={register({
              required: 'Please enter an email',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Not a valid email',
              },
            })}
          />
          {errors.email && (
            <div className="mt-2 text-xs text-red-600">
              {errors.email.message}
            </div>
          )}
        </div>
      </div>
      <div className="mt-6">
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-5 text-gray-700"
        >
          Password
        </label>
        <div className="mt-1 rounded-md shadow-sm">
          <input
            id="password"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
            type="password"
            name="password"
            ref={register({
              required: 'Please enter a password',
              minLength: {
                value: 6,
                message: 'Should have at least 6 characters',
              },
            })}
          />
          {errors.password && (
            <div className="mt-2 text-xs text-red-600">
              {errors.password.message}
            </div>
          )}
        </div>
      </div>
      <div className="mt-6">
        <span className="block w-full rounded-md shadow-sm">
          <Button title="Sign Up" type="submit" isLoading={isLoading} />
        </span>
      </div>
      {error?.message && (
        <div className="mb-4 text-red-500 text-center border-dashed border border-red-600 p-2 rounded">
          <span>{error.message}</span>
        </div>
      )}
    </form>
  )
}

export default SignUpForm
