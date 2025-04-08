import CardDeck from "@/components/card-deck"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 bg-[url('/wizard-bg.png')] bg-cover bg-center relative">
      {/* Magical overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/70 via-purple-900/60 to-indigo-950/80 z-0"></div>

      {/* Floating magical particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-blue-300/40 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center mb-12">
        <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200 mb-2 font-serif">
          Academia de Wizards
        </h1>
        <p className="text-blue-200 italic">Escoje una baraja mágica</p>
      </div>

      <div className="flex flex-col md:flex-row gap-12 items-center justify-center w-full relative z-10">
        <CardDeck
          type="common"
          title="Aprendiz"
          cardImages={[
            "/cards/comun1.png",
            "/cards/comun2.png",
            "/cards/comun3.png",
            "/cards/comun4.png",
            "/cards/comun5.png",
          ]}
        />
        <CardDeck
          type="epic"
          title="Conjurador"
          cardImages={[
            "/cards/Epico1.png",
            "/cards/Epico2.png",
            "/cards/Epico3.png",
            "/cards/Epico4.png",
          ]}
        />
        <CardDeck
          type="legendary"
          title="Wizard"
          cardImages={[
            "/cards/legendaria1.jpg",
            "/cards/legendaria2.jpg",
          ]}
        />
      </div>
    </main>
  )
}
