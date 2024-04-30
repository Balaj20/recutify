import React, { useEffect, useState } from "react";
import Banner from "../components/Banner";
import Sidebar from "../Sidebar/Sidebar";
import Jobs from "./Jobs";
import Card from "../components/Card";
import Newsletter from "../components/Newsletter";
import { collection, doc, getDoc, getFirestore, onSnapshot, setDoc } from "firebase/firestore";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import { auth } from "../firebase/firebase.config";
import { FiCalendar, FiClock, FiDollarSign, FiMapPin } from "react-icons/fi";
import moment from "moment";
import { useNavigate } from "react-router";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const firestore = getFirestore()
  const userId = localStorage.getItem("token")
  const user = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate()

  const [query, setQuery] = useState("");
  const [query2, setQuery2] = useState("");

  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  const handleInputChange2 = (event) => {
    setQuery2(event.target.value);
  };

  const filteredItems = jobs?.filter((job) => job.jobTitle.toLowerCase().indexOf(query.toLowerCase()) !== -1);

  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  };

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems?.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // const filteredData = (selected, query, query2) => {
  //   if (jobs?.length > 0) {
  //     return filteredJobs.map((data, i) => <Card key={i} data={data} />);
  //   }
  // };

  // const result = filteredData(selectedCategory, query, query2);

  const getJobs = async () => {
    setIsLoading(true)
    try {
      const collectionRef = collection(firestore, "jobs")
      onSnapshot(collectionRef, (snapshot) => {
        const data = snapshot.docs.map((doc) => {
          return { docId: doc.id, ...doc.data() }
        })
        if (user.role === "company") {
          setJobs(data.filter(f => f.jobPostId === user.companyId))
        }
        else {
          setJobs(data)
        }
        setIsLoading(false)
      })
    }
    catch (error) {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getJobs()
  }, [])

  // console.log(jobs);
  // console.log(user);

  return (
    <div>
      <Banner query={query} handleInputChange={handleInputChange} query2={query2} handleInputChange2={handleInputChange2} />

      {/* main content */}
      <div className="bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12">
        <div className="bg-white p-4 rounded">
          <Sidebar handleChange={handleChange} handleClick={handleClick} />
        </div>
        <div className={`${user === "candidate" ? "col-span-2" : "col-span-3"} bg-white p-4 rounded`}>
          {isLoading ? ( // Loading indicator
            <>
              <Skeleton width="100%" height="200px" />
              <Skeleton width="100%" height="200px" />
              <Skeleton width="100%" height="200px" />
              <Skeleton width="100%" height="200px" />
            </>
          ) : jobs?.length > 0 ? (
            jobs?.map((job) => {
              const { docId, jobId, jobCompanyLogo, jobTitle, jobCompany, jobCompanyAddress, employmentType, jobMinimumSalary, jobMaximumSalary, postingDate, jobDescription, jobPostedAt } = job;
              return (
                <section className="card">
                  <div className="flex gap-4 flex-col sm:flex-row items-start" onClick={() => navigate(`/jobs/${docId}`)}>
                    <img src={jobCompanyLogo} alt="" className="w-16 h-16 mb-4" />
                    <div className="card-details">
                      <h3 className="text-lg font-semibold">{jobTitle}</h3>
                      <h4 className="text-primary mb-1">{jobCompany}</h4>

                      <div className="text-primary/70 text-base flex flex-wrap gap-2 mb-2">
                        <span className="flex items-center gap-2"><FiMapPin /> {jobCompanyAddress}</span>
                        <span className="flex items-center gap-2"><FiClock /> {employmentType}</span>
                        <span className="flex items-center gap-2"><FiDollarSign /> {jobMinimumSalary}-{jobMaximumSalary}k</span>
                        <span className="flex items-center gap-2"><FiCalendar /> {postingDate}</span>
                      </div>

                      <p className="text-base text-primary/70">{jobDescription}</p>
                      <h4 className="text-primary mb-1 font-semibold mt-3">Posted {moment(jobPostedAt?.toDate()).fromNow()}</h4>

                    </div>
                    {user?.role === "candidate" && (
                      <button
                        type="submit"
                        className="bg-blue py-2 px-8 text-white rounded"
                      >
                        Apply Now
                      </button>
                    )}
                  </div>
                </section>
              )
            })
          ) : (
            <>
              <h3 className="text-lg font-bold mb-2">{jobs?.jobs?.length} Jobs</h3>
              <p>No data found</p>
            </>
          )}

          {/* pagination block here */}

          {/* {result?.length > 0 ? (
            <div className="flex justify-center mt-4 space-x-8">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className="hover:underline"
              >
                Previous
              </button>
              <span className="mx-2">
                Page {currentPage} of{" "}
                {Math.ceil(filteredItems?.length / itemsPerPage)}
              </span>
              <button
                onClick={nextPage}
                disabled={
                  currentPage === Math.ceil(filteredItems?.length / itemsPerPage)
                }
                className="hover:underline"
              >
                Next
              </button>
            </div>
          ) : (
            ""
          )} */}
        </div>
        {user.role === "candidate" && <div className="bg-white p-4 rounded">
          <Newsletter />
        </div>}
      </div>
    </div>
  );
};

export default Home;
