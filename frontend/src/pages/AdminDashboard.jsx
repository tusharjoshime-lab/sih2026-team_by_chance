import Navbar from "../components/Navbar";

function AdminDashboard() {
  const departments = [
    { name: "Citizen Services", employees: 42, score: 74, icon: "🤝" },
    { name: "Data for Governance", employees: 35, score: 68, icon: "📊" },
    { name: "Digital Governance", employees: 28, score: 61, icon: "🏛️" },
    { name: "Administration", employees: 31, score: 79, icon: "👥" },
  ];

  const skills = [
    { name: "Citizen-Centric Service", score: 74, icon: "🤝" },
    { name: "Data-Driven Decision Making", score: 68, icon: "📊" },
    { name: "Digital Governance", score: 61, icon: "🏛️" },
    { name: "Ethics & Leadership", score: 79, icon: "⚖️" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* HEADER */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-orange-800 to-amber-800 p-8 md:p-10 mb-8 shadow-xl">

          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-white/5" />
          <div className="absolute right-20 -bottom-32 w-72 h-72 rounded-full bg-orange-400/10" />

          <div className="relative z-10">

            <div className="inline-flex items-center gap-2 bg-white/10 text-orange-100 px-3 py-1.5 rounded-full text-sm mb-4">
              <span>⚡</span>
              Admin Intelligence Center
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-stone-900">
              Organization Overview
            </h2>

            <p className="text-stone-600 mt-3 max-w-2xl">
              Monitor public-service competencies, capacity gaps and learning progress
              across departments.
            </p>

          </div>

        </section>


        {/* STATS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">

          {/* Employees */}
          <div className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm text-stone-500">
                  Total Employees
                </p>

                <h3 className="text-4xl font-bold text-slate-900 mt-2">
                  136
                </h3>
              </div>

              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-2xl group-hover:scale-110 transition">
                👥
              </div>

            </div>

            <p className="text-sm text-green-600 font-medium mt-5">
              ● Active employees
            </p>

          </div>


          {/* Average */}
          <div className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm text-stone-500">
                  Average Skill Score
                </p>

                <h3 className="text-4xl font-bold text-slate-900 mt-2">
                  70%
                </h3>
              </div>

              <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-2xl group-hover:scale-110 transition">
                📈
              </div>

            </div>

            <div className="mt-5 h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"
                style={{ width: "70%" }}
              />
            </div>

            <p className="text-xs text-orange-600 font-medium mt-2">
              Across organization
            </p>

          </div>


          {/* Skill gaps */}
          <div className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm text-stone-500">
                  Skill Gaps
                </p>

                <h3 className="text-4xl font-bold text-slate-900 mt-2">
                  87
                </h3>
              </div>

              <div className="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center text-2xl group-hover:scale-110 transition">
                ⚠️
              </div>

            </div>

            <p className="text-sm text-orange-600 font-medium mt-5">
              Areas requiring training
            </p>

          </div>


          {/* Courses */}
          <div className="group bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">

            <div className="flex items-start justify-between">

              <div>
                <p className="text-sm text-stone-500">
                  Courses Completed
                </p>

                <h3 className="text-4xl font-bold text-slate-900 mt-2">
                  324
                </h3>
              </div>

              <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-2xl group-hover:scale-110 transition">
                🎓
              </div>

            </div>

            <p className="text-sm text-orange-600 font-medium mt-5">
              This year
            </p>

          </div>

        </section>


        {/* DEPARTMENT + COMPETENCY */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

          {/* Department Performance */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

            <div className="flex items-center justify-between mb-7">

              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Department Performance
                </h3>

                <p className="text-sm text-stone-500 mt-1">
                  Average competency score by department
                </p>
              </div>

              <span className="text-2xl">
                🏢
              </span>

            </div>


            <div className="space-y-6">

              {departments.map((department) => (

                <div key={department.name}>

                  <div className="flex justify-between mb-2">

                    <div className="flex items-center gap-3">

                      <div className="w-9 h-9 rounded-lg bg-slate-50 flex items-center justify-center">
                        {department.icon}
                      </div>

                      <div>

                        <p className="text-sm font-semibold text-slate-800">
                          {department.name}
                        </p>

                        <p className="text-xs text-stone-500">
                          {department.employees} employees
                        </p>

                      </div>

                    </div>

                    <span className="text-sm font-bold text-slate-900">
                      {department.score}%
                    </span>

                  </div>


                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">

                    <div
                      className="bg-gradient-to-r from-orange-500 to-amber-500 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${department.score}%` }}
                    />

                  </div>

                </div>

              ))}

            </div>

          </section>


          {/* Organization Competencies */}
          <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

            <div className="flex items-center justify-between mb-7">

              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Organization Competencies
                </h3>

                <p className="text-sm text-stone-500 mt-1">
                  Current competency levels
                </p>
              </div>

              <span className="text-2xl">
                🧠
              </span>

            </div>


            <div className="space-y-6">

              {skills.map((skill) => (

                <div key={skill.name}>

                  <div className="flex justify-between mb-2">

                    <div className="flex items-center gap-2">

                      <span>
                        {skill.icon}
                      </span>

                      <span className="text-sm font-medium text-slate-700">
                        {skill.name}
                      </span>

                    </div>

                    <span className="text-sm font-bold text-slate-900">
                      {skill.score}%
                    </span>

                  </div>


                  <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">

                    <div
                      className="bg-orange-50 h-3 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.score}%` }}
                    />

                  </div>

                </div>

              ))}

            </div>


            {/* Insight */}
            <div className="mt-7 p-4 rounded-xl bg-orange-50 border border-orange-100">

              <p className="text-sm font-semibold text-orange-900">
                🤖 AI Insight
              </p>

              <p className="text-sm text-orange-700 mt-1">
                Digital Governance currently has the lowest competency
                score and should be prioritized for training.
              </p>

            </div>

          </section>

        </div>


        {/* TRAINING PRIORITIES */}
        <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

          <div className="flex items-center justify-between mb-7">

            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Training Priorities
              </h3>

              <p className="text-sm text-stone-500 mt-1">
                Areas where employees need additional learning
              </p>
            </div>

            <span className="text-2xl">
              🎯
            </span>

          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {/* High */}
            <div className="group border border-slate-200 rounded-xl p-5 hover:border-orange-300 hover:shadow-md transition-all duration-300">

              <span className="inline-flex text-xs font-semibold bg-orange-50 text-orange-700 px-3 py-1.5 rounded-full">
                High Priority
              </span>

              <h4 className="font-semibold text-slate-900 text-lg mt-4">
                Digital Governance
              </h4>

              <p className="text-sm text-stone-500 mt-2 leading-6">
                Employees need stronger understanding of digital governance
                processes.
              </p>

              <div className="flex items-center justify-between mt-5">

                <p className="text-sm font-semibold text-slate-700">
                  43 employees
                </p>

                <span className="text-orange-500 group-hover:translate-x-1 transition">
                  →
                </span>

              </div>

            </div>


            {/* Medium */}
            <div className="group border border-slate-200 rounded-xl p-5 hover:border-yellow-300 hover:shadow-md transition-all duration-300">

              <span className="inline-flex text-xs font-semibold bg-yellow-50 text-yellow-700 px-3 py-1.5 rounded-full">
                Medium Priority
              </span>

              <h4 className="font-semibold text-slate-900 text-lg mt-4">
                Data-Driven Decision Making
              </h4>

              <p className="text-sm text-stone-500 mt-2 leading-6">
                Focus on evidence-based decisions, dashboard interpretation and data quality.
              </p>

              <div className="flex items-center justify-between mt-5">

                <p className="text-sm font-semibold text-slate-700">
                  31 employees
                </p>

                <span className="text-yellow-500 group-hover:translate-x-1 transition">
                  →
                </span>

              </div>

            </div>


            {/* Good */}
            <div className="group border border-slate-200 rounded-xl p-5 hover:border-green-300 hover:shadow-md transition-all duration-300">

              <span className="inline-flex text-xs font-semibold bg-green-50 text-green-700 px-3 py-1.5 rounded-full">
                Good
              </span>

              <h4 className="font-semibold text-slate-900 text-lg mt-4">
                Behavioural Skills
              </h4>

              <p className="text-sm text-stone-500 mt-2 leading-6">
                Overall performance is strong in this competency area.
              </p>

              <div className="flex items-center justify-between mt-5">

                <p className="text-sm font-semibold text-slate-700">
                  79% average
                </p>

                <span className="text-green-500 group-hover:translate-x-1 transition">
                  →
                </span>

              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}

export default AdminDashboard;