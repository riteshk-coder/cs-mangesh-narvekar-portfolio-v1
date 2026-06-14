import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Sparkles, Building, Phone, Mail, User, ShieldCheck } from 'lucide-react';
import { submitBookingForm } from '../lib/api';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}

export default function BookingModal({ isOpen, onClose, initialService = '' }: BookingModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [serviceType, setServiceType] = useState(initialService || 'Company Law & Secretarial');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const timeSlots = [
    '10:30 AM - 11:30 AM',
    '11:30 AM - 12:30 PM',
    '02:30 PM - 03:30 PM',
    '04:00 PM - 05:00 PM',
    '05:30 PM - 06:30 PM'
  ];

  const services = [
    'Company Law & Secretarial',
    'GST Services',
    'Income Tax Services',
    'Legal & FEMA Compliance',
    'Startup / Business Structuring',
    'General Corporate Advisory'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !phone.trim() || !date || !timeSlot || !serviceType) {
      setError('Please fill in all required fields to register your session.');
      return;
    }

    // Phone format recommendation
    if (phone.replace(/\D/g, '').length < 10) {
      setError('Please provide a valid 10-digit mobile number.');
      return;
    }

    setIsSubmitting(true);

    try {
      await submitBookingForm({
        name,
        email,
        phone,
        date,
        timeSlot,
        serviceType,
        description,
      });

      setSubmitted(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Something went wrong. Please try again later.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setPhone('');
    setDate('');
    setTimeSlot('');
    setDescription('');
    setSubmitted(false);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            id="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#000814]/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            id="modal-card"
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative z-10 w-full max-w-2xl bg-gradient-to-b from-[#0F2747] to-[#0a1e38] border border-slate-700/60 rounded-2xl shadow-2xl shadow-black/80 overflow-hidden"
          >
            {/* Top gold bar spacer */}
            <div className="w-full h-1.5 bg-gradient-to-r from-[#183B6B] via-[#C8A45D] to-[#2C62A9]" />

            {/* Close Button */}
            <button
              id="close-modal-btn"
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 border border-slate-700/50 hover:bg-slate-700 text-slate-300 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-lg bg-[#C8A45D]/15 text-[#C8A45D] border border-[#C8A45D]/30">
                    <Calendar className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold font-display text-white tracking-tight">
                      Schedule Corporate Advisory
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Instantly reserve a direct consultation with CS Mangesh Narvekar.
                    </p>
                  </div>
                </div>

                {error && (
                  <div className="p-3 mb-4 text-xs font-medium text-red-400 rounded-lg bg-red-950/40 border border-red-500/20">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Service Selection */}
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-widest mb-1.5 font-mono">
                      Consultation Practice Division *
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <select
                        value={serviceType}
                        onChange={(e) => setServiceType(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-900/90 border border-slate-700/85 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-[#C8A45D] focus:border-[#C8A45D] transition-colors appearance-none"
                        style={{ colorScheme: 'dark' }}
                      >
                        {services.map((svc) => (
                          <option key={svc} value={svc} className="bg-[#0F2747] text-slate-200">
                            {svc}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-400" />
                    </div>
                  </div>

                  {/* Name */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-widest mb-1.5 font-mono">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="e.g. Anand Mahindra"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-900/90 border border-slate-700/85 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-[#C8A45D] focus:border-[#C8A45D] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Contact Number */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-widest mb-1.5 font-mono">
                      Mobile Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="tel"
                        placeholder="e.g. 9876543210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-900/90 border border-slate-700/85 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-[#C8A45D] focus:border-[#C8A45D] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Corporate Email */}
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-widest mb-1.5 font-mono">
                      Corporate / Personal Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="email"
                        placeholder="e.g. support@yourcompany.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-900/90 border border-slate-700/85 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-[#C8A45D] focus:border-[#C8A45D] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Date Picker */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-widest mb-1.5 font-mono">
                      Preferred Date *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C8A45D]" />
                      <input
                        type="date"
                        min={new Date().toISOString().split('T')[0]}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-900/90 border border-slate-700/85 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-[#C8A45D] focus:border-[#C8A45D] transition-colors cursor-pointer"
                        style={{ colorScheme: 'dark' }}
                      />
                    </div>
                  </div>

                  {/* Time slots */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-widest mb-1.5 font-mono">
                      Preferred Time Slot *
                    </label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#C8A45D]" />
                      <select
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-slate-900/90 border border-slate-700/85 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-[#C8A45D] focus:border-[#C8A45D] transition-colors appearance-none"
                      >
                        <option value="">-- Choose Slot --</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot} className="bg-[#0F2747] text-slate-200">
                            {slot}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 border-l-4 border-r-4 border-t-4 border-transparent border-t-slate-400" />
                    </div>
                  </div>

                  {/* Business Description */}
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-[11px] font-semibold text-slate-300 uppercase tracking-widest mb-1.5 font-mono">
                      Brief of Legal / Corporate Requirement
                    </label>
                    <textarea
                      rows={3}
                      placeholder="e.g., We are an MSME and want to raise capital / convert to Pvt Ltd, seeking strategic compliant guidance..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full px-4 py-2 bg-slate-900/90 border border-slate-700/85 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-1 focus:ring-[#C8A45D] focus:border-[#C8A45D] transition-colors resize-none"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-lg border border-slate-700/80 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative px-6 py-2.5 rounded-lg bg-gradient-to-r from-[#C29B5D] to-[#E5C185] text-[#0F2747] font-bold text-xs hover:from-[#dabb7c] hover:to-[#f0d8a5] transition-all flex items-center gap-2 shadow-lg shadow-[#C8A45D]/10 disabled:opacity-55"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-[#0F2747] border-t-transparent rounded-full animate-spin" />
                        Generating Reservation...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5" />
                        Confirm Consultation
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-8 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 scale-110">
                  <ShieldCheck className="w-9 h-9" />
                </div>
                
                <h3 className="text-2xl font-bold font-display text-[#F8FAFC]">
                  Consultation Lock Successful!
                </h3>
                <p className="text-sm text-slate-300 mt-2 max-w-md">
                  Thank you, <span className="font-semibold text-[#C8A45D]">{name}</span>. Your requested slot representing <span className="font-semibold text-slate-100">{serviceType}</span> has been securely logged on our local CRM database.
                </p>

                <div className="mt-6 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-left w-full max-w-md font-mono text-xs text-slate-300 space-y-2.5">
                  <div className="flex justify-between border-b border-slate-800 pb-2">
                    <span className="text-slate-500">APPOINTMENT ID:</span>
                    <span className="text-[#C8A45D] font-bold">CSMN-{Math.floor(1000 + Math.random() * 9000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">DATE:</span>
                    <span className="text-slate-100">{date}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">TIME WINDOW:</span>
                    <span className="text-slate-100">{timeSlot}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">REPRESENTATIVE:</span>
                    <span className="text-slate-100">CS Mangesh Narvekar (FCS)</span>
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <a
                    href={`https://wa.me/919922262985?text=Hello%20CS%20Mangesh%20Narvekar%2C%20I%20have%20scheduled%20a%20consultation%20on%20${date}%20at%20${timeSlot}%20for%20${encodeURIComponent(serviceType)}.%20Please%20confirm.`}
                    target="_blank"
                    rel="noreferrer"
                    className="px-5 py-2.5 rounded-lg bg-[#25D366] text-white font-semibold text-xs hover:bg-[#20ba56] transition-colors flex items-center gap-2 shadow-lg shadow-emerald-950/20"
                  >
                    Send Instant WhatsApp Ping
                  </a>
                  <button
                    onClick={handleReset}
                    className="px-5 py-2.5 rounded-lg border border-slate-700/80 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
                  >
                    Done & Close
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
