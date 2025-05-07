import React from "react";

export type JobDescriptionProps = {
  title: string;
  company: string;
  location: string;
  employment_type: string;
  experience: string;
  postedDateTime: string;
  job_link: string;
  source: string;
  companyImageUrl: string;
  min_exp: number;
  max_exp: number;
};

const formatDate = (input: string | Date) => {
  const date = typeof input === "string" ? new Date(input) : input;
  if (isNaN(date.getTime())) return "Invalid date";

  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
};

export const JobDescription: React.FC<JobDescriptionProps> = ({
  title,
  company,
  location,
  employment_type,
  experience,
  postedDateTime,
  job_link,
  source,
  companyImageUrl,
  min_exp,
  max_exp,
}) => {
  return (
    <div className="h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent p-4 space-y-6">
    
      <div className="flex items-center gap-4">
        <img
          src={companyImageUrl}
          alt={company}
          className="w-16 h-16 rounded"
        />
        <div>
          <h2 className="text-2xl font-semibold">{title}</h2>
          <p className="text-gray-600">{company}</p>
          <p className="text-sm text-gray-500">{formatDate(postedDateTime)}</p>
        </div>
      </div>

      <div className="space-y-2">
        <p>
          <strong>Location:</strong> {location}
        </p>
        <p>
          <strong>Employment Type:</strong> {employment_type}
        </p>
        <div className="flex justify-between items-start gap-4">
         
          <div className="space-y-1">
            <p>
              <strong>Experience:</strong> {min_exp} - {max_exp} years (
              {experience})
            </p>
            <p>
              <strong>Source:</strong> {source}
            </p>
          </div>

         
          <a
            href={job_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 text-white rounded transition-colors duration-200"
            style={{ backgroundColor: "#800000" }}
          >
            Quick Apply
          </a>
        </div>
      </div>

      
      <div>
        <h3 className="text-lg font-medium mb-2">Job Description</h3>
        <p className="text-gray-700 text-sm leading-relaxed">
          {Array(100)
            .fill("Lorem ipsum dolor sit amet, consectetur adipiscing elit. ")
            .join(" ")}
        </p>
      </div>
    </div>
  );
};
