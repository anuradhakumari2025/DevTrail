const mongoose = require("mongoose");

const jounrnalSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    tags: [
      {
        parent: {
          type: String,
          enum: [
            "Frontend",
            "Backend",
            "Database",
            "DevOps",
            "AI",
            "ML",
            "Personal",
          ],
          required: true,
        },
        child: {
          type: String,
          enum: [
            // ---- Frontend ----
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

            // ---- Backend ----
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

            // ---- Database ----
            "MongoDB",
            "PostgreSQL",
            "MySQL",
            "Redis",
            "SQLite",
            "Firebase",
            "Cassandra",
            "Elasticsearch",
            "Oracle",

            // ---- DevOps ----
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

            // ---- AI ----
            "LangChain",
            "OpenAI",
            "Hugging Face",
            "Transformers",
            "ONNX",
            "Vision AI",

            // ML
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

            // ---- Personal ----
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
          required: true,
        },
      },
    ],

    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Personal",
        "Frontend",
        "Backend",
        "Database",
        "DevOps",
        "AI",
        "ML",
        "Learning",
        "Project",
        "Bug",
        "Issue",
        "Improvement",
        "Task",
        "Achievement",
      ],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    visibility: {
      type: String,
      enum: ["public", "private"],
      default: "private",
    },
  },
  { timestamps: true }
);

const Journal = mongoose.model("Journal", jounrnalSchema);
module.exports = Journal;
