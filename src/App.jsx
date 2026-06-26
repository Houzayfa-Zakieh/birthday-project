import { useEffect, useState } from "react";
import Confetti from "react-confetti";
import useSound from "use-sound";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";
const TYPING_TEXT =
    "كل عام وانت بالف خير يا رب وان شاء الله منشوفك احلى دكتور والله يوفقك وييسرلك ويجعل ايامك حلوة وتتزوجها وتجبلنا فنانير صغار اقعد استعبد ولادك شوي 💛. ";
export default function App() {
    const [step, setStep] = useState(0);
    const [giftOpen, setGiftOpen] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [typedText, setTypedText] = useState("");
    const [intro, setIntro] = useState(true);
    const [loading, setLoading] = useState(true);
    const [musicStarted, setMusicStarted] = useState(false);
    const [startScreen, setStartScreen] = useState(true);

    const [playMessage] = useSound("/music/message.mp3", { volume: 0.6 });
    const [playIntro] = useSound("/music/intro.mp3", { volume: 0.4 });
    const [playGift] = useSound("/music/open.mp3", { volume: 0.7 });
    const [playMusic] = useSound("/music/birthday.mp3", { volume: 0.5 });

    useEffect(() => {
        setTimeout(() => setIntro(false), 4000);
        setTimeout(() => setLoading(false), 3500);
    }, []);

    useEffect(() => {
        setTimeout(() => setStep(1), 8000);
        setTimeout(() => setStep(2), 14000);
        setTimeout(() => setStep(3), 20000);
    }, []);

    useEffect(() => {
        if (!showMessage) {
            setTypedText("");
            return;
        }

        let index = 0;

        const interval = setInterval(() => {
            if (index >= TYPING_TEXT.length) {
                clearInterval(interval);
                return;
            }

            const nextChar = TYPING_TEXT[index];

            if (nextChar !== undefined) {
                setTypedText((prev) => prev + nextChar);
            }

            index++;
        }, 45);

        return () => clearInterval(interval);
    }, [showMessage]);

    return (
        <>
            {startScreen && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "black",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 99999,
                    }}
                >
                    <button
                        onClick={() => {
                            playIntro();
                            playMusic();
                            setStartScreen(false);
                        }}
                        style={{
                            padding: "20px 40px",
                            background: "white",
                            color: "black",
                            borderRadius: "12px",
                            fontSize: "22px",
                            fontWeight: "bold",
                            cursor: "pointer",
                        }}
                    >
                        كبوس هون ولاك
                    </button>
                </div>
            )}

            <AnimatePresence>
                {intro && (
                    <motion.div className="fixed inset-0 z-[60] flex flex-col items-center justify-center bg-black" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <motion.div initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8 }} className="flex flex-col items-center gap-4">
                            <motion.div className="text-4xl md:text-6xl font-extrabold text-[#f09737] relative" animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 2, repeat: Infinity }}>
                                🎬 Eng.Houzayfa
                                <motion.div className="absolute -top-6 left-1/2 w-32 h-32 bg-white/40 rounded-full blur-3xl pointer-events-none" initial={{ opacity: 0, scale: 0.4 }} animate={{ opacity: [0.2, 0.5, 0.2], scale: [0.8, 1.2, 0.8] }} transition={{ duration: 3, repeat: Infinity }} />
                            </motion.div>
                            <p className="text-sm md:text-base text-white/70">
                                Presenting a special birthday surprise...
                            </p>
                        </motion.div>
                        {loading && (
                            <motion.div className="mt-10 w-64 h-2 rounded-full bg-white/10 overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                <motion.div className="h-full bg-[#f09737]" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 3.2, ease: "easeInOut" }} />
                            </motion.div>)}
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="min-h-screen overflow-hidden bg-gradient-to-br from-[#050816] via-[#111827] to-[#1f2937] text-white flex flex-col items-center justify-center relative">

                {[...Array(45)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-[#fbbf24] rounded-full opacity-70 animate-pulse pointer-events-none"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDuration: `${2 + Math.random() * 3}s`,
                        }}
                    />
                ))}
                {[...Array(10)].map((_, i) => (
                    <motion.div key={`heart-${i}`} className="absolute text-pink-400 text-xl pointer-events-none" initial={{ y: "110%", x: `${10 + i * 8}%`, opacity: 0 }} animate={{ y: "-10%", opacity: [0, 1, 0] }} transition={{ duration: 8 + i, repeat: Infinity, delay: i * 0.8, }}>
                        ❤️
                    </motion.div>
                ))}
                <motion.div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_#f59e0b_0%,_transparent_60%)] pointer-events-none" animate={{ opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 5, repeat: Infinity }} />
                <Confetti recycle={true} numberOfPieces={step >= 2 ? 250 : 0} />
                <AnimatePresence mode="wait">
                    {step === 0 && (
                        <motion.div key="s0" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center px-4">
                            <h1 className="text-3xl md:text-5xl font-bold">
                                عيد ميلاد اني غل ؟
                            </h1>
                            <p className="mt-4 text-white/70">👀 حزيييير </p>
                        </motion.div>)}
                    {step === 1 && (
                        <motion.div key="s1" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ opacity: 0 }} className="text-center px-4 relative">
                            <motion.h1
                                className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#f97316] via-[#facc15] to-[#f97316] relative"
                                animate={{
                                    textShadow: ["0 0 20px #f97316", "0 0 40px #facc15", "0 0 20px #f97316",],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}>
                                فنوووووووووور
                                <motion.div className="absolute -top-10 left-1/2 w-40 h-40 bg-white/30 rounded-full blur-3xl pointer-events-none" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: [0.2, 0.6, 0.2], scale: [0.8, 1.3, 0.8] }} transition={{ duration: 3, repeat: Infinity }} />
                            </motion.h1>
                            <motion.p className="text-xl mt-4 text-white/80" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                                ألف مبروك صار عمرك 21 سنة ولسعتك غل
                            </motion.p>
                        </motion.div>)}
                    {step === 2 && (
                        <motion.div key="s2" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center px-6">
                            <h2 className="text-3xl font-bold mb-6">وهي شوية صور وانت عجي صغير طبعا ما في وانت كبير لانو لهلق ما كبرت</h2>
                            <div className="grid grid-cols-2 gap-4 max-w-3xl mx-auto">
                                {["1", "2", "3", "4"].map((n, i) => (
                                    <motion.img key={i} src={`./photos/fanour-${n}.jpg`} className="rounded-xl shadow-xl w-full h-full object-cover" initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.25 }} whileHover={{ scale: 1.08, rotate: i % 2 === 0 ? 2 : -2, }} />
                                ))}
                            </div>
                        </motion.div>)}
                    {step === 3 && (
                        <motion.div key="s3" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center px-4 max-w-xl mx-auto relative z-50">
                            <h2 className="text-3xl font-bold mb-4">🎁 شوف اش جبتلك شوف</h2>
                            {!giftOpen && (
                                <motion.button
                                    onClick={() => {
                                        playGift();
                                        setGiftOpen(true);
                                    }} className="px-10 py-4 bg-gradient-to-r from-[#f97316] to-[#facc15] rounded-2xl text-white font-bold shadow-lg cursor-pointer z-50" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 1.4, repeat: Infinity }}>
                                    فتاح هديتك ولاك
                                </motion.button>)}
                            {giftOpen && (
                                <motion.div initial={{ scale: 0 }} animate={{ scale: [1, 1.05, 1], rotate: [0, -2, 2, 0], }} transition={{ duration: 0.7 }} className="mt-6 flex flex-col items-center relative z-50">
                                    <img src="/gift/perfume.jpg" className="w-72 h-96 object-cover rounded-3xl shadow-[0_0_80px_rgba(250,204,21,0.6)]" />
                                    <h3 className="text-2xl mt-6 font-bold text-[#facc15]">
                                        ما تركت الدولارين بخاطرك ومع وينستون جخخخخ
                                    </h3>
                                    <p className="mt-2 text-white/80">
                                        هديتك عل قد حاجتك هيك وزيادة لو كنت حبيبتي وقتا اختلف الحكي والكيس يلي ورا مو منظر طبعا بعرفك غل … لا تتاخر بالرجعة شي ما سبحك بكلشي
                                    </p>
                                    {!showMessage && (
                                        <motion.button onClick={() => { playMessage(); setShowMessage(true); }} className="mt-6 px-6 py-3 rounded-full border border-white/30 text-sm text-white/80 hover:bg-white/10 cursor-pointer z-[999]" whileHover={{ scale: 1.05 }}>
                                            💌كبوس هون ولاك و شوف الرسالة
                                        </motion.button>
                                    )}
                                    {showMessage && (
                                        <motion.div className="mt-8 text-sm md:text-base text-white/80 leading-relaxed bg-white/5 border border-white/10 rounded-2xl px-5 py-4 backdrop-blur-sm z-[999]" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                                            {typedText}
                                        </motion.div>
                                    )}
                                </motion.div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
                <div className="absolute bottom-4 text-xs md:text-sm text-white/60 pointer-events-none">
                    Made with ❤️ for فنور
                </div>
            </div>
        </>
    );
}