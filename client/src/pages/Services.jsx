import React from 'react';
import { servicesData } from '../data/servicesData';
import { Link } from 'react-router-dom';

const Services = () => {
  return (
    <div className="pt-28 pb-20">
      <div className="w-full px-4 md:px-8">
        <div className="text-left mb-16">
          <h1 className="text-5xl font-bold mb-4">Catering Services</h1>
          <p className="text-lg text-lighttext/70 max-w-2xl">Professional catering tailored for every occasion.</p>
          <div className="w-24 h-1 bg-secondary mt-6"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {servicesData.map(service => (
            <div key={service.id} className="bg-secondary p-8 rounded-xl hover:shadow-lg transition-shadow border border-primary/5">
              <h3 className="text-2xl font-bold mb-4 text-primary">{service.title}</h3>
              <p className="text-lighttext/80 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <div className="bg-darkbg border border-secondary p-12 rounded-xl shadow-sm text-left">
          <h2 className="text-4xl font-bold mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { num: "01", title: "Tell Us About Your Event", desc: "Share your date, venue, and guest count." },
              { num: "02", title: "Choose Your Menu", desc: "Select from our wide range of dishes." },
              { num: "03", title: "Get Your Quote", desc: "Receive a transparent and detailed pricing." },
              { num: "04", title: "Enjoy Your Celebration", desc: "Leave the cooking and serving to us." }
            ].map((step, i) => (
              <div key={i} className="relative">
                <div className="text-5xl font-serif text-secondary/30 font-bold mb-2">{step.num}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-lighttext/70 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-left">
            <Link to="/contact" className="btn-primary">Book Your Event Now</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
