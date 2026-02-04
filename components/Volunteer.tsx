import React from 'react';

const Volunteer: React.FC = () => {
  return (
    <section id="volunteer" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
          <div className="md:w-1/2 relative bg-slate-800">
            <img 
              src="https://picsum.photos/800/800?grayscale" 
              alt="Volunteer" 
              className="absolute inset-0 w-full h-full object-cover opacity-60" 
            />
            <div className="relative z-10 p-12 h-full flex flex-col justify-center text-white">
              <h2 className="text-4xl font-bold mb-6">Join the Force</h2>
              <p className="text-lg text-slate-300 mb-8">
                Become a part of our 75+ vet and volunteer team. Whether you can spare an hour a week or a day a month, your time saves lives.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span>On-ground rescue support</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span>Social media advocacy</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span>Fundraising & Event management</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="md:w-1/2 p-8 md:p-12">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Volunteer Registration</h3>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">First Name</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Last Name</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">Phone Number</label>
                <input type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500" />
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">City</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500">
                  <option>Ahmedabad</option>
                  <option>Mumbai</option>
                  <option>Pune</option>
                  <option>Surat</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase mb-1">How can you help?</label>
                <textarea className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 h-24 focus:outline-none focus:ring-2 focus:ring-red-500"></textarea>
              </div>

              <button className="w-full bg-slate-900 text-white font-bold py-4 rounded-lg hover:bg-slate-800 transition-colors">
                Submit Application
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Volunteer;
