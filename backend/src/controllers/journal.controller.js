const Journal = require("../models/journal.model");

const parentChildMap = {
  Frontend: [
    "React",
    "Vue",
    "Angular",
    "HTML5",
    "CSS",
    "JavaScript",
    "Tailwind",
    "GSAP",
    "Svelte",
    "Bootstrap",
    "Material-UI",
    "Next.js",
    "jQuery",
    "Chakra UI",
  ],
  Backend: [
    "Node.js",
    "Express",
    "Django",
    "SpringBoot",
    "FastAPI",
    "Flask",
    "Ruby on Rails",
    "Laravel",
    "ASP.NET Core",
    "Hapi.js",
  ],
  Database: [
    "MongoDB",
    "PostgreSQL",
    "MySQL",
    "Redis",
    "SQLite",
    "Firebase",
    "Cassandra",
    "Elasticsearch",
    "Oracle",
  ],
  DevOps: [
    "Docker",
    "Kubernetes",
    "AWS",
    "CI/CD",
    "Git",
    "Ansible",
    "Terraform",
    "Jenkins",
    "Azure DevOps",
    "GCP",
    "GitHub Actions",
  ],
  AI: [
    "LangChain",
    "OpenAI",
    "Hugging Face",
    "Transformers",
    "ONNX",
    "Vision AI",
  ],
  ML: [
    "Data Preprocessing",
    "Model Training",
    "Model Evaluation",
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "Pandas",
    "XGBoost",
    "Keras",
    "Feature Engineering",
    "Model Deployment",
    "Hyperparameter Tuning",
    "Data Visualization",
  ],
  Personal: [
    "Diary",
    "Travel",
    "Goals",
    "Learning",
    "Productivity",
    "Health",
    "Mindfulness",
    "Projects",
    "Books",
    "Networking",
    "Self-Review",
  ],
};

const validVisibilities = ["public", "private", "friends"];


module.exports.createJournal = async (req, res) => {
  try {
    const { title, content, date, category, visibility, tags } = req.body;

    if (!title || !content || !date || !category || !visibility || !tags) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if(!validVisibilities.includes(visibility)) {
      return res.status(400).json({ message: "Invalid visibility option" });
    }
    for (let tag of tags) {
      if (!parentChildMap[tag.parent]) {
        return res
          .status(400)
          .json({ message: `Invalid parent tag: ${tag.parent}` });
      }
      if (!parentChildMap[tag.parent].includes(tag.child)) {
        return res
          .status(400)
          .json({
            message: `Invalid child tag: ${tag.child} for parent: ${tag.parent}`,
          });
      }
    }
    const newJournal =await Journal.create({
      title,
      content,
      date,
      category,
      visibility,
      tags,
    });
    return res
      .status(201)
      .json({ message: "Journal created successfully", journal: newJournal });
  } catch (error) {
    console.log("Error in createJournal:", error);
    return res.status(400).json({ message: "Server error", error });
  }
};

module.exports.getJournals = async(req,res)=>{
  try {
    const journals = await Journal.find().sort({ createdAt: -1 });
    return res.status(200).json({journals});
  } catch (error) {
    console.log("Error in getJournals:", error);
    return res.status(400).json({ message: "Server error", error });
  }
}
