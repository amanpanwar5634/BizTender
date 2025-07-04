import React from "react";

export default function TestimonialCard({ testimonial }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6">
      <div className="flex items-center gap-4 mb-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-14 h-14 rounded-full object-cover border-2 border-emerald-500"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {testimonial.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {testimonial.company}
          </p>
        </div>
      </div>
      <div className="mb-3">
        <span className="inline-block text-emerald-600 font-semibold">
          ⭐ {testimonial.rating}
        </span>
      </div>
      <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
        "{testimonial.review}"
      </p>
    </div>
  );
}
