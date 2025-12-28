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
            className="h-full w-full object-cover scale-110 object-top brightness-[0.80] contrast-[0.95]"
          />
        </div>

        <h1 className="m-0 text-[1.1rem] uppercase tracking-[0.08em]">
          Hyunji Cho
        </h1>

        <p className="mt-[0.2rem] mb-[0.7rem] text-[0.85rem] opacity-85">
          Sustainability Data & Analytics Specialist
        </p>

        <p className="text-[0.8rem] leading-relaxed opacity-85">
          I build data-driven sustainability systems that integrate impact
          measurement, AI/ML workflows and governance insights.
        </p>
      </div>
    </section>
  );
}
