import { Job } from '../Models/Job.js'
import { Company } from '../Models/Company.js'
export const postjob = async (req, res) => {
    try {
        const { title,
            description,
            requirements,
            salary,
            location,
            jobtype,
            position,
            experiencelevel,
            CompanyName,
            applications } = req.body
        const userId = req.user
        console.log(CompanyName)
        console.log(userId)

        let Companydetail = await Company.find({ userId })
        let jobdetail = await Job.findOne({ title })
        if (jobdetail && jobdetail.CompanyName == CompanyName) {
            return res.status(400).json({ message: "You cannot Create Same job Twice" })
        }
        console.log(jobdetail)
        console.log(Companydetail)



        if (Companydetail.length == 0) {
            return res.status(200).json("No Company Found With This User")
        }
        else {
            let companyindex = Companydetail.findIndex((item) => item.name == CompanyName)
            console.log(companyindex)

            {
                if (companyindex == -1) {
                    return res.status(200).json({ message: "No Such Company name FOund" })
                }
                let job = await Job.create(
                    {
                        title,
                        description,
                        requirements: Array.isArray(requirements) ? requirements.flatMap((r) => r.split(",")).map((i) => i.trim()).filter(Boolean) : requirements.split(",").map((j) => j.trim()).filter(Boolean),
                        salary,
                        location,
                        jobtype,
                        position,
                        experiencelevel,
                        company: Companydetail[companyindex]._id, userId,
                        companyLogo:Companydetail[companyindex].logo,
                        CompanyName

                    }
                )

                return res.status(200).json({ message: "Job Created successfully", job, success: true })
            }
        }

    } catch (error) {
        console.log(error)

    }

}
//student
export const getjobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        console.log("Searching for jobs with keyword:", keyword);

        // If no keyword, get all jobs
        const query = keyword
            ? {
                $or: [
                    { title: { $regex: keyword, $options: "i" } },
                    { description: { $regex: keyword, $options: "i" } }
                ]
            }
            : {}; // Get all jobs if no keyword

        console.log("Query:", query);
        const jobs = await Job.find(query).populate({ path: "company" }).sort({ createdAt: -1 });
        console.log("Found jobs:", jobs.length);

        if (!jobs || jobs.length === 0) {
            return res.status(200).json({ message: "No jobs Found With your Matching Keyword", jobs: [], success: true })
        }
        return res.status(200).json({ message: "Here Are Some Matching Results", jobs, success: true })


    } catch (error) {
        console.log("Error in getjobs:", error)
        return res.status(500).json({ message: "Server error", success: false })
    }
}
//student
export const getJobsById = async (req, res) => {
    try {
        const id = req.params.id
        let jobs = await Job.findById(id).populate(
            {
                path:"applications"
            }
        )
        if (!jobs) {
            return res.status(200).json({ message: "No jobs Found With this Id", success: true })
        }
        return res.status(200).json({ message: "The Jobs Your Searched for is ", jobs, success: true })

    } catch (error) {
        console.log(error)

    }
}
//recruiter
export const adminjob = async (req, res) => {
    const userId = req.user
    let job = await Job.find({ userId }).populate(
        {path:"company",
            createdBy:-1
        }
    )
    if (!job || job.length === 0) {
        return res.status(200).json({ message: "No jobs Found", jobs: [], success: true })
    }
    return res.json({ message: "The job You Searched For is ", job, success: true })
}
