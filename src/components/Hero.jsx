import Hero from "../components/Hero";

export default function Home() {
  return (
    <div>
      <Hero />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
      </div>
    </div>
  );
}