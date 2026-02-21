import profileImg from "../assets/profile.jpg";

export default function BioPanel() {
  return (
    <section className="flex items-start relative z-10">
      <div
        className="
          rounded-xl
          border border-white/10
          p-6
          bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent)]
        "
      >
        <div
          className="
            mb-4
            h-24 w-24
            rounded-full
            overflow-hidden
            border border-white/30
          "
        >
          <img
            src={profileImg}
            alt="Hyunji Cho"
            className="h-full w-full object-cover scale-110 object-top brightness-[0.90] contrast-[0.95]"
          />
        </div>

        <h1 className="m-0 text-[1.1rem] uppercase tracking-[0.08em] leading-none">
          Hyunji Cho
        </h1>

        <p className="mt-[0.35rem] mb-[1.1rem] text-[0.85rem] opacity-85 leading-tight">
          Analytics Engineer
        </p>

        <p className="mb-[1.4rem] text-[0.8rem] leading-[1.45] opacity-85">
          I design data systems that turn fragmented information into
          decision-ready structures — combining data modelling, automated
          pipelines, and LLM-based classification at scale.
        </p>

        <div className="mb-[1.4rem] grid grid-cols-[72px_1fr] gap-y-[0.25rem] text-[0.75rem] leading-[1.3] opacity-85">
          <div className="opacity-60 tabular-nums">2024–Now</div>
          <div>
            <div className="leading-tight">
              Lead Analytics Engineer (Sharing Solutions)
            </div>
            <div className="opacity-60 leading-tight">
              Trinity College Dublin
            </div>
          </div>

          <div className="opacity-60 tabular-nums">2021–2024</div>
          <div>
            <div className="leading-tight">Senior Data Analytics Engineer</div>
            <div className="opacity-60 leading-tight">EcoWise, London</div>
          </div>

          <div className="opacity-60 tabular-nums">2019–2021</div>
          <div>
            <div className="leading-tight">Policy Consultant</div>
            <div className="opacity-60 leading-tight">
              University College London
            </div>
          </div>

          <div className="opacity-60 tabular-nums">2014–2019</div>
          <div>
            <div className="leading-tight">
              PhD Researcher (Network Analysis & Spatial Data Modelling)
            </div>
            <div className="opacity-60 leading-tight">
              University College London
            </div>
          </div>
        </div>

        <p className="text-[0.75rem] opacity-100 leading-none">
          Based in Dublin | github.com/HCHODUBLIN | linkedin.com/in/hyunjic
        </p>
        <div className="mt-6 border-t border-white/10 pt-4 text-[0.75rem] leading-relaxed text-white/45">
          <p className="m-0">
            © {new Date().getFullYear()} Hyunji Cho. Built with React and
            TypeScript.
          </p>
        </div>
      </div>
    </section>
  );
}
