"use client";

import { Card, JobProps } from "@/components/Card";
import { JobDescription, JobDescriptionProps } from "@/components/JD";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [jobs, setJobs] = useState<JobProps[]>([]);
  const [page, setPage] = useState(1);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [selectedJob, setSelectedJob] = useState<JobProps | null>(null);

  const fetchJobs = async (pageNum = 1) => {
    const location = inputRef.current?.value?.trim();
    const endpoint = location
      ? `https://mployeebackend-production.up.railway.app/byLocation?location=${location}&page=${pageNum}`
      : `https://mployeebackend-production.up.railway.app/all?page=${pageNum}`;

    try {
      const response = await axios.get(endpoint);
      if (pageNum === 1) {
        setJobs(response.data.data);
      } else {
        setJobs((prev) => [...prev, ...response.data.data]);
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs(1);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, []);
  useEffect(() => {
    if (page > 1) fetchJobs(page);
  }, [page]);

  return (
    <div className="w-screen h-screen flex">
      <div className="w-[40%] flex flex-col h-full bg-white p-4">
        <div className="flex items-center w-full gap-2 mb-4">
          <input
            ref={inputRef}
            placeholder="Location"
            className="flex-1 p-2 rounded border"
          />
          <button
            className="px-4 py-2 bg-blue-500 cursor-pointer text-white rounded"
            onClick={() => fetchJobs()}
          >
            Search
          </button>
        </div>

        <div className="w-full overflow-y-scroll h-full pr-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent">
          {jobs.map((job, index) => {
            const isSelected = selectedJob?.job_link === job.job_link;
            return (
              <Card
                key={index}
                {...(job as JobProps)}
                onClick={() => setSelectedJob(job)}
                isSelected={isSelected}
              />
            );
          })}

          <div ref={loaderRef} className="h-10"></div>
        </div>
      </div>
      <div className="w-[60%] h-full bg-white p-4 border-l border-gray-300 flex items-center justify-center">
        {selectedJob ? (
          <JobDescription {...(selectedJob as JobDescriptionProps)} />
        ) : (
          <p className="text-gray-500 text-lg font-medium text-center">
            Select a job to see details
          </p>
        )}
      </div>
    </div>
  );
}
