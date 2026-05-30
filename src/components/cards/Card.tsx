import React from "react";

export interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  image?: string;
  footer?: React.ReactNode;
  hover?: boolean;
  className?: string;
}

export default function Card({
  children,
  title,
  subtitle,
  image,
  footer,
  hover = true,
  className = "",
}: CardProps) {
  return (
    <div
      className={`
        overflow-hidden rounded-lg border border-neutral-200 bg-white
        ${hover ? "transition-shadow duration-200 hover:shadow-md" : ""}
        ${className}
      `}
    >
      {image && (
        <div className="h-48 overflow-hidden">
          <img
            src={image}
            alt={title || "Card image"}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <div className="p-6">
        {(title || subtitle) && (
          <div className="mb-4">
            {title && (
              <h3 className="mb-1 text-lg font-semibold text-neutral-900">
                {title}
              </h3>
            )}
            {subtitle && (
              <p className="text-sm text-neutral-500">{subtitle}</p>
            )}
          </div>
        )}
        <div className="text-neutral-600">{children}</div>
      </div>
      {footer && (
        <div className="border-t border-neutral-100 bg-neutral-50 px-6 py-4">
          {footer}
        </div>
      )}
    </div>
  );
}
