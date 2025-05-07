
import React from "react";

export type JobProps = {
  title: string;
  company: string;
  location: string;
  employment_type: string;
  experience: string;
  postedDateTime: string;
  job_link: string;
  source: string;
  min_exp: number;
  max_exp: number;
  companyImageUrl?: string;
  onClick: () => void;
  isSelected?: boolean;
};

const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
};

export const Card = ({
  title,
  company,
  location,
  employment_type,
  postedDateTime,
  source,
  min_exp,
  max_exp,
  companyImageUrl,
  isSelected,
  onClick,
}: JobProps) => {
  const loremIpsum =
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. `.repeat(30);

  return (
    <div
      className={`border cursor-pointer rounded-xl shadow-sm p-4 mb-4 ${
        isSelected ? "bg-gray-200" : "bg-white"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center gap-3 mb-2">
        {companyImageUrl && (
          <img
            src={companyImageUrl}
            alt={company}
            className="w-10 h-10 object-contain rounded"
          />
        )}
        <div>
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-600">{company}</p>
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-1">{location}</p>
      <p className="text-sm text-gray-600 mb-2 line-clamp-5">{loremIpsum}</p>

      <div className="text-sm text-gray-700 space-y-1">
        <p>
          <span className="font-medium">Employment Type:</span>{" "}
          {employment_type}
        </p>
        <p>
          <span className="font-medium">Experience:</span> {min_exp}-{max_exp}{" "}
          years
        </p>
        <p>
          <span className="font-medium">Source:</span> {source}
        </p>
        <p>
          <span className="font-medium">Posted:</span>{" "}
          {formatDate(postedDateTime)}
        </p>
      </div>
    </div>
  );
};
