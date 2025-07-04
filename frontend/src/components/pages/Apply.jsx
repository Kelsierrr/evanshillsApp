import React, { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useMutation } from '@tanstack/react-query'
import { createApplication } from '../../services/applications'
import Header from '../Header'
import Footer from '../Footer'
import Button from '../ui/Button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { applicationSchema } from '../../schemas/applicationSchema'
import '../../styles/Apply.css'

export default function Apply() {
  const { id: jobId } = useParams()
  const mutation = useMutation({
    mutationFn: (data) => createApplication(data)
  })

  useEffect(() => {
    if (mutation.isSuccess || mutation.isError) {
      const timer = setTimeout(() => {
        mutation.reset()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [mutation.isSuccess, mutation.isError, mutation])

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting }
  } = useForm({
    resolver: zodResolver(applicationSchema),
    mode: 'onChange'
  })

  const onSubmit = (data) => {
    const fd = new FormData()
    fd.append('jobId', jobId)
    fd.append('name', data.name)
    fd.append('email', data.email)
    fd.append('phone', data.phone)
    fd.append('coverLetter', data.coverLetter)
    if (data.resume && data.resume.length > 0) {
      fd.append('resume', data.resume[0])
    }
    mutation.mutate(fd)
  }

  return (
    <>
      <Header />
      <main className="apply-page">
        <Link to={`/jobs/${jobId}`}>
          <Button variant="outline" size="sm">← Back to Job</Button>
        </Link>

        <h1>Apply for This Job</h1>

        {mutation.isSuccess && (
          <div className="apply-success">Your application has been submitted!</div>
        )}
        {mutation.isError && (
          <div className="apply-error">{mutation.error.message}</div>
        )}

        <form className="apply-form" onSubmit={handleSubmit(onSubmit)}>
          <label>
            Name
            <input {...register('name')} />
            {errors.name && <p className="form-error">{errors.name.message}</p>}
          </label>

          <label>
            Email
            <input type="email" {...register('email')} />
            {errors.email && <p className="form-error">{errors.email.message}</p>}
          </label>

          <label>
            Phone
            <input type="tel" {...register('phone')} />
            {errors.phone && <p className="form-error">{errors.phone.message}</p>}
          </label>

          <label>
            Cover Letter
            <textarea rows={6} {...register('coverLetter')} />
            {errors.coverLetter && <p className="form-error">{errors.coverLetter.message}</p>}
          </label>

          <label>
            Upload Resume (PDF or DOCX)
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              {...register('resume')}
            />
            {errors.resume && <p className="form-error">{errors.resume.message}</p>}
          </label>

          <Button
            type="submit"
            variant="default"
            size="md"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? 'Submitting…' : 'Submit Application'}
          </Button>
        </form>
      </main>
      <Footer />
    </>
  )
}
