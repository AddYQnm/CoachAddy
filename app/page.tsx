// app/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Dumbbell, Users, Target, TrendingUp, Calendar, MessageCircle, Award, ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import Image from 'next/image';

export default function CoachingLandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [step, setStep] = useState(1);
const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
  goal: '',
  instagram: '' // <- ajouté
});

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', phone: '', goal: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const scrollToForm = () => {
    document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-black text-white">
      
      {/* Fixed CTA Button */}
      <motion.button
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-4 rounded-full font-bold shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2 md:hidden"
        onClick={scrollToForm}
      >
        Postuler
        <ArrowRight className="w-5 h-5" />
      </motion.button>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-40 bg-black/80 backdrop-blur-lg border-b border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2"
            >
              <Dumbbell className="w-8 h-8 text-orange-500" />
              <span className="text-2xl font-bold">COACH<span className="text-orange-500">Addy</span></span>
            </motion.div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#coaching" className="text-gray-300 hover:text-orange-500 transition-colors">Coaching</a>
              <a href="#resultats" className="text-gray-300 hover:text-orange-500 transition-colors">Résultats</a>
              <a href="#contact" className="text-gray-300 hover:text-orange-500 transition-colors">Contact</a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToForm}
                className="bg-gradient-to-r from-orange-600 to-orange-500 px-6 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300"
              >
                Postuler au coaching
              </motion.button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="md:hidden py-6 space-y-4"
            >
              <a href="#coaching" className="block text-gray-300 hover:text-orange-500 transition-colors" onClick={() => setIsMenuOpen(false)}>Coaching</a>
              <a href="#resultats" className="block text-gray-300 hover:text-orange-500 transition-colors" onClick={() => setIsMenuOpen(false)}>Résultats</a>
              <a href="#contact" className="block text-gray-300 hover:text-orange-500 transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</a>
            </motion.nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-b from-orange-950/20 via-black to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(251,146,60,0.1),transparent_50%)]"></div>
        
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-block mb-6 px-4 py-2 bg-orange-500/10 border border-orange-500/30 rounded-full"
              >
                <span className="text-orange-500 font-semibold">🔥 T'attends quoi chef?</span>
              </motion.div>

              <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                Coaching en ligne<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400">
                  Transforme ton corps
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-gray-400 mb-8 leading-relaxed">
                Un accompagnement personnalisé, 100% à distance, adapté à ton rythme.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToForm}
                  className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-5 rounded-full text-lg font-bold shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Postuler au coaching
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                  className="border-2 border-gray-700 text-white px-8 py-5 rounded-full text-lg font-semibold hover:border-orange-500 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Comment ça marche ?
                  <ChevronDown className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-gray-800">
                <div>
                  <p className="text-3xl font-bold text-orange-500">15+</p>
                  <p className="text-sm text-gray-500">Clients accompagnés</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-orange-500">100%</p>
                  <p className="text-sm text-gray-500">Taux de réussite</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-orange-500">4.9/5</p>
                  <p className="text-sm text-gray-500">Satisfaction</p>
                </div>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="relative"
            >
              <div className="relative w-full aspect-square rounded-3xl overflow-hidden border border-gray-800 shadow-2xl">
                <Image
                 src="/images/Untitled.design (5).png"
                  alt="Coach sportif"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
              
              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-6 -left-6 bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 shadow-2xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-full flex items-center justify-center">
                    <Award className="w-6 h-6 text-orange-500" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Certifié</p>
                    <p className="text-sm text-gray-400">Coach professionnel</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Coach Presentation */}
      <section id="coaching" className="py-32 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/50 to-black"></div>
        
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
          >
            {/* Image */}
            <div className="relative order-2 md:order-1">
              <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden border border-gray-800 shadow-2xl">
                <Image
                 src="/images/IMG_5731.jpg"
                  alt="Coach professionnel"
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-2xl">
                <Dumbbell className="w-12 h-12 text-white" />
              </div>
            </div>

            {/* Content */}
            <div className="order-1 md:order-2">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Je suis <span className="text-orange-500">Addy</span>,<br />
                  coach sportif en ligne
                </h2>

                <p className="text-xl text-gray-400 mb-8 leading-relaxed">
                  J'aide des personnes à atteindre leurs objectifs physiques grâce à un accompagnement structuré, simple et efficace.
                </p>

                <div className="space-y-6">
                  {[
                    { icon: Target, text: "Coaching personnalisé adapté à tes besoins" },
                    { icon: MessageCircle, text: "Suivi à distance quotidien et réactif" },
                    { icon: TrendingUp, text: "Résultats durables et mesurables" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="w-12 h-12 bg-orange-500/10 border border-orange-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-lg text-gray-300">{item.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToForm}
                  className="mt-10 bg-gradient-to-r from-orange-600 to-orange-500 text-white px-8 py-4 rounded-full font-bold hover:shadow-lg hover:shadow-orange-500/50 transition-all duration-300 flex items-center gap-2"
                >
                  Commencer maintenant
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 px-4 bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Comment <span className="text-orange-500">ça marche</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Un processus simple en 4 étapes pour transformer ton physique
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: "01",
                icon: Calendar,
                title: "Tu postules en ligne",
                description: "Remplis le formulaire de candidature et parle-moi de tes objectifs."
              },
              {
                number: "02",
                icon: MessageCircle,
                title: "Appel découverte",
                description: "Un appel gratuit de 30 min pour analyser ta situation et définir un plan."
              },
              {
                number: "03",
                icon: Target,
                title: "Programme personnalisé",
                description: "Je crée ton programme d'entraînement et nutrition sur mesure."
              },
              {
                number: "04",
                icon: TrendingUp,
                title: "Suivi & résultats",
                description: "Accompagnement quotidien avec ajustements réguliers jusqu'aux résultats."
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                {/* Connection Line */}
                {index < 3 && (
                  <div className="hidden lg:block absolute top-20 left-full w-full h-0.5 bg-gradient-to-r from-orange-500/50 to-transparent -z-10"></div>
                )}

                <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 h-full hover:border-orange-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/10">
                  {/* Number Badge */}
                  <div className="absolute -top-4 -left-4 w-14 h-14 bg-gradient-to-br from-orange-600 to-orange-500 rounded-full flex items-center justify-center font-bold text-xl shadow-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 bg-orange-500/10 border border-orange-500/30 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <step.icon className="w-8 h-8 text-orange-500" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pour Qui */}
      <section className="py-32 px-4 bg-black">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Pour <span className="text-orange-500">qui ?</span>
            </h2>
            <p className="text-xl text-gray-400">
              Ce coaching est fait pour toi si...
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Tu veux perdre du poids de manière durable",
              "Tu veux te remettre en forme après une pause",
              "Tu cherches un cadre et de la discipline",
              "Tu veux un accompagnement 100% à distance",
              "Tu veux développer ta masse musculaire",
              "Tu as besoin de motivation et d'accountability"
            ].map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.05 }}
                className="flex items-center gap-4 bg-gradient-to-r from-gray-900 to-black border border-gray-800 p-6 rounded-xl hover:border-orange-500/50 transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Check className="w-6 h-6 text-white" />
                </div>
                <p className="text-lg text-gray-300">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Central */}
      <section className="py-32 px-4 bg-gradient-to-br from-orange-950/30 via-black to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,146,60,0.1),transparent_70%)]"></div>
        
        <div className="container mx-auto max-w-4xl relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center"
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Prêt à commencer<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-400">
                ton changement ?
              </span>
            </h2>

            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Rejoins les centaines de personnes qui ont déjà transformé leur physique avec un coaching adapté.
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToForm}
              className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-12 py-6 rounded-full text-xl font-bold shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 inline-flex items-center gap-3"
            >
              Postuler au coaching
              <ArrowRight className="w-6 h-6" />
            </motion.button>

            <p className="mt-6 text-gray-500 text-sm">
              Places limitées • Réponse sous 24h
            </p>
          </motion.div>
        </div>
      </section>

{/* Résultats/Testimonials */}
{/* Résultats/Testimonials */}
{/* Résultat client unique */}
<section id="resultats" className="py-32 px-4 bg-black">
  <div className="container mx-auto max-w-3xl">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="text-center mb-20"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-6">
        Résultat <span className="text-orange-500">prouvé</span>
      </h2>
      <p className="text-xl text-gray-400">
        Transformation de mon client
      </p>
    </motion.div>

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-300 max-w-sm mx-auto"
    >
      <div className="flex flex-col items-center gap-4 mb-4">
        <div className="relative w-64 h-64 rounded-xl overflow-hidden border-2 border-orange-500 group">
          <Image
             src="/images/IMG_5066.PNG" // <-- remplace par ton image "avant"
            alt="Avant"
            fill
            className="object-cover absolute top-0 left-0"
          />
          <Image
            src="/images/IMG_5841.jpg"  // <-- remplace par ton image "après"
            alt="Après"
            fill
            className="object-cover absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity"
          />
        </div>
        <h4 className="font-bold text-lg">Ma transformation</h4>
        <p className="text-orange-500 font-semibold">Résultat</p>
      </div>
      <p className="text-gray-400 leading-relaxed italic text-center">
        Tchai, j'ai souffert, mais j'ai réussi à transformer mon corps.
      </p>
    </motion.div>
  </div>
</section>




      {/* FAQ */}
      <section className="py-32 px-4 bg-gradient-to-b from-black via-gray-950 to-black">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Questions <span className="text-orange-500">fréquentes</span>
            </h2>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                question: "Combien de temps dure le programme ?",
                answer: "Le coaching dure minimum 3 mois pour voir des résultats durables. La plupart de mes clients continuent entre 6 et 12 mois pour optimiser leur transformation."
              },
              {
                question: "Quel matériel ai-je besoin ?",
                answer: "Tout dépend de ta situation. Je peux créer des programmes à domicile avec peu de matériel ou des programmes en salle. On en discute lors de l'appel découverte."
              },
              {
                question: "À quelle fréquence avons-nous contact ?",
                answer: "Tu as accès à moi quotidiennement via WhatsApp. On fait également des bilans vidéo toutes les 2 semaines pour ajuster le programme et suivre ta progression."
              },
              {
                question: "Quel est le tarif du coaching ?",
                answer: "Les tarifs sont communiqués lors de l'appel découverte car ils dépendent de tes objectifs et de la durée d'engagement. Plusieurs formules sont disponibles."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ delay: index * 0.05 }}
                className="bg-gradient-to-r from-gray-900 to-black border border-gray-800 rounded-xl overflow-hidden hover:border-orange-500/50 transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left"
                >
                  <span className="text-lg font-semibold">{faq.question}</span>
                  <ChevronDown className={`w-6 h-6 text-orange-500 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                </button>
                
                {openFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-8 pb-6"
                  >
                    <p className="text-gray-400 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

     {/* Formulaire multipage */}
{/* Formulaire multipage */}
<section id="application-form" className="py-32 px-4 bg-gradient-to-br from-orange-950/30 via-black to-black relative overflow-hidden">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(251,146,60,0.15),transparent_60%)]"></div>
  
  <div className="container mx-auto max-w-3xl relative z-10">
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      className="text-center mb-12"
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-6">
        Fais le premier pas<br />
        <span className="text-orange-500">aujourd'hui</span>
      </h2>
      <p className="text-xl text-gray-400">
        Remplis le formulaire et je te recontacte sous 24h
      </p>
    </motion.div>

    <motion.form
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeInUp}
      onSubmit={handleSubmit}
      className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 md:p-12 space-y-6"
    >
      {/* Step 1 : Nom + Email */}
      {step === 1 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-400">Nom complet *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-black/50 border border-gray-700 rounded-xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors"
              placeholder="John Doe"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-400">Email *</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full bg-black/50 border border-gray-700 rounded-xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors"
              placeholder="john@example.com"
            />
          </div>
        </div>
      )}

      {/* Step 2 : Téléphone + Objectif + Instagram */}
      {step === 2 && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-400">Téléphone *</label>
            <input
              type="tel"
              required
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              className="w-full bg-black/50 border border-gray-700 rounded-xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors"
              placeholder="+33 6 12 34 56 78"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-400">Quels sont tes objectifs ? *</label>
            <div className="flex flex-col gap-2">
              {['Perte de gras', 'Prise de masse', 'Maintien', 'Autre'].map((option) => (
                <label key={option} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="goal"
                    value={option}
                    checked={formData.goal === option}
                    onChange={(e) => setFormData({...formData, goal: e.target.value})}
                    className="accent-orange-500"
                    required
                  />
                  <span className="text-gray-300">{option}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-400">Ton pseudo Instagram *</label>
            <input
              type="text"
              required
              value={formData.instagram || ''}
              onChange={(e) => setFormData({...formData, instagram: e.target.value})}
              className="w-full bg-black/50 border border-gray-700 rounded-xl px-6 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors"
              placeholder="@monpseudo"
            />
          </div>
        </div>
      )}

      {/* Navigation Step */}
      <div className="flex justify-between">
        {step > 1 && (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="px-6 py-3 bg-gray-800 text-white rounded-xl hover:bg-gray-700 transition"
          >
            Précédent
          </button>
        )}

        {step < 2 ? (
          <button
            type="button"
            onClick={() => setStep(step + 1)}
            className="ml-auto px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition"
          >
            Suivant
          </button>
        ) : (
          <button
            type="submit"
            disabled={isSubmitting}
            className="ml-auto px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-xl hover:shadow-lg transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Envoi en cours..." : "Envoyer ma candidature"}
            {!isSubmitting && <ArrowRight className="w-5 h-5" />}
          </button>
        )}
      </div>

      {/* Messages de statut */}
      {submitStatus === 'success' && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-green-500 font-semibold mt-4"
        >
          ✓ Candidature envoyée ! Je te recontacte sous 24h.
        </motion.p>
      )}
      {submitStatus === 'error' && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center text-red-500 font-semibold mt-4"
        >
          ✗ Une erreur est survenue. Réessaye ou contacte-moi directement.
        </motion.p>
      )}
    </motion.form>
  </div>
</section>



      {/* Footer */}
      <footer id="contact" className="py-16 px-4 bg-black border-t border-gray-800">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Logo & Description */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Dumbbell className="w-8 h-8 text-orange-500" />
                <span className="text-2xl font-bold">COACH<span className="text-orange-500">Addy</span></span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Transforme ton physique avec un coaching personnalisé 100% en ligne.
              </p>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-lg mb-4">Contact</h4>
              <div className="space-y-3 text-gray-400">
                <p>📧 addyqnm.pro@gmail.com</p>
                <p>📍 France (coaching à distance)</p>
              </div>
            </div>

            {/* Social */}
            <div>
              <h4 className="font-bold text-lg mb-4">Réseaux sociaux</h4>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/tiego_qnm/" className="w-12 h-12 bg-gray-900 border border-gray-800 rounded-full flex items-center justify-center hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300">
                  <span className="text-xl">📷</span>
                </a>
                <a href="https://www.tiktok.com/@tiego.qnm" className="w-12 h-12 bg-gray-900 border border-gray-800 rounded-full flex items-center justify-center hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300">
                  <span className="text-xl">▶️</span>
                </a>
                <a href="#" className="w-12 h-12 bg-gray-900 border border-gray-800 rounded-full flex items-center justify-center hover:border-orange-500 hover:bg-orange-500/10 transition-all duration-300">
                  <span className="text-xl">💼</span>
                </a>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2025 CoachAddy. Tous droits réservés.
            </p>
            <div className="flex gap-6 text-gray-500 text-sm">
              <a href="#" className="hover:text-orange-500 transition-colors">Mentions légales</a>
              <a href="#" className="hover:text-orange-500 transition-colors">Politique de confidentialité</a>
              <a href="#" className="hover:text-orange-500 transition-colors">CGV</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
} 
