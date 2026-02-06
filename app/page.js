import HomeScene from "./components/HomeScene";
import NotesPanel from "./components/NotesPanel";

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div>
          <span className="status-pill">Personal 3D Home</span>
          <h1>Design your immersive home space.</h1>
          <p>
            This Next.js home pairs Three.js with a calm control hub. Explore
            the 3D scene, then keep your design ideas and daily notes right
            beside it.
          </p>
        </div>
        <div className="panel">
          <h2>What you can do</h2>
          <ul style={{ marginTop: "1rem", lineHeight: 1.8 }}>
            <li>Preview the Three.js-powered home environment.</li>
            <li>Track inspiration, tasks, or reminders.</li>
            <li>Keep everything saved in your browser.</li>
          </ul>
        </div>
      </section>

      <HomeScene />
      <NotesPanel />

      <footer>Built with Next.js and Three.js.</footer>
    </main>
  );
}
