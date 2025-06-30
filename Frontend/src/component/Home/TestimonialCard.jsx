import React from "react";

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-14 h-14 rounded-full object-cover border-2 border-yellow-400"
        />
        <div>
          <h3 className="text-lg font-semibold text-slate-800 dark:text-white">
            {testimonial.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {testimonial.company}
          </p>
        </div>
      </div>
      <div className="mb-2">
        <span className="badge badge-success">⭐ {testimonial.rating}</span>
      </div>
      <p className="text-gray-600 dark:text-gray-300 text-sm">{testimonial.review}</p>
    </div>
  );
}
