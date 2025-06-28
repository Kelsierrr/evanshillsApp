import { useState, useEffect } from 'react'
import '../styles/Testimonials.css'

const testimonials = [
  {
    name: 'Sarah Mwangi',
    role: 'Registered Nurse',
    location: 'London, UK',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop&crop=face',
    quote: 'EvansHills made my dream of working in the UK a reality. Their support throughout the visa process was exceptional.'
  },
  {
    name: 'Michael Chikwanha',
    role: 'Truck Driver',
    location: 'Toronto, Canada',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop&crop=face',
    quote: 'Professional service from start to finish. I’m now earning 5 times what I made in Zimbabwe and supporting my family back home.'
  },
  {
    name: 'Grace Mutendi',
    role: 'Care Assistant',
    location: 'Dubai, UAE',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop&crop=face',
    quote: 'The training and preparation I received through EvansHills gave me confidence to excel in my new role abroad.'
  }
]

export default function Testimonials() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const t = testimonials[index]

  return (
    <section className="testimonials">
      <h2 className="testimonials-title">Success Stories</h2>
      <blockquote className="testimonial-quote">"{t.quote}"</blockquote>
      <div className="testimonial-author">
        <img src={t.image} alt={t.name} className="testimonial-img" />
        <div>
          <div className="testimonial-name">{t.name}</div>
          <div className="testimonial-role">{t.role}, {t.location}</div>
        </div>
      </div>
      <div className="testimonial-dots">
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={i === index ? 'dot active' : 'dot'}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  )
}
