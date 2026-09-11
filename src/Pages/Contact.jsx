import { useState, useRef, useEffect } from "react";
import { Share2, User, Mail, MessageSquare, Send, Check, Loader2, X } from "lucide-react";
import axios from 'axios';
import { BASE_URL } from "../config/baseUrl";
import SocialLinks from "../components/SocialLinks";
import { motion, AnimatePresence } from "framer-motion";

const FormField = ({ label, name, type = "text", placeholder, value, onChange, onBlur, error, disabled, icon: Icon, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="relative group"
  >
    <label htmlFor={name} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:translate-y-1/2 peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#6366f1]">
      {label}
    </label>
    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors pointer-events-none" aria-hidden="true" />
    <input
      ref={(el) => el?.parentElement?.classList.toggle('has-value', !!el.value)}
      type={type}
      id={name}
      name={name}
      placeholder=" "
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
      className={`w-full p-4 pl-12 pr-12 bg-white/5 rounded-xl border transition-all duration-300 placeholder-transparent text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 disabled:opacity-50 disabled:cursor-not-allowed ${
        error ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/30" : "border-white/10 hover:border-white/20"
      }`}
      required
      aria-invalid={error ? "true" : "false"}
      aria-describedby={error ? `${name}-error` : undefined}
    />
    {children}
    <AnimatePresence>
      {error && (
        <motion.p
          id={`${name}-error`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-red-400 text-sm flex items-center gap-1"
          role="alert"
        >
          <X className="w-3.5 h-3.5" />
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </motion.div>
);

const TextAreaField = ({ label, name, placeholder, value, onChange, onBlur, error, disabled, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="relative group"
  >
    <label htmlFor={name} className="absolute left-4 top-4 text-gray-400 text-sm pointer-events-none transition-all duration-200 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:translate-y-1/2 peer-focus:top-1 peer-focus:text-xs peer-focus:text-[#6366f1]">
      {label}
    </label>
    <Icon className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-[#6366f1] transition-colors pointer-events-none" aria-hidden="true" />
    <textarea
      id={name}
      name={name}
      placeholder=" "
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
      className={`w-full resize-none p-4 pl-12 pr-12 bg-white/5 rounded-xl border transition-all duration-300 placeholder-transparent text-white focus:outline-none focus:ring-2 focus:ring-[#6366f1]/30 disabled:opacity-50 disabled:cursor-not-allowed h-[120px] ${
        error ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/30" : "border-white/10 hover:border-white/20"
      }`}
      required
      aria-invalid={error ? "true" : "false"}
      aria-describedby={error ? `${name}-error` : undefined}
    />
    <AnimatePresence>
      {error && (
        <motion.p
          id={`${name}-error`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-4 top-4 text-red-400 text-sm flex items-center gap-1"
          role="alert"
        >
          <X className="w-3.5 h-3.5" />
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </motion.div>
);

const SubmitButton = ({ isSubmitting, isSuccess }) => (
  <motion.button
    type="submit"
    disabled={isSubmitting || isSuccess}
    whileHover={!isSubmitting && !isSuccess ? { scale: 1.02 } : {}}
    whileTap={!isSubmitting && !isSuccess ? { scale: 0.98 } : {}}
    className={`w-full py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${
      isSuccess
        ? "bg-green-500 hover:bg-green-600 cursor-default"
        : "bg-gradient-to-r from-[#6366f1] to-[#a855f7] hover:shadow-lg hover:shadow-[#6366f1]/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
    }`}
  >
    <AnimatePresence mode="wait">
      {isSubmitting ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0, rotate: -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: 90 }}
          className="flex items-center gap-2"
        >
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Sending...</span>
        </motion.div>
      ) : isSuccess ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="flex items-center gap-2"
        >
          <Check className="w-5 h-5" />
          <span>Sent Successfully!</span>
        </motion.div>
      ) : (
        <motion.div
          key="default"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex items-center gap-2"
        >
          <Send className="w-5 h-5" />
          <span>Send Message</span>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.button>
);

const SuccessModal = ({ onClose }) => (
  <motion.div
    className="fixed inset-0 z-50 flex items-center justify-center p-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    onClick={onClose}
    role="dialog"
    aria-modal="true"
    aria-labelledby="success-title"
  >
    <motion.div
      className="absolute inset-0 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    />
    <motion.div
      className="relative w-full max-w-md bg-gray-900/95 backdrop-blur-xl rounded-2xl border border-white/10 p-8 text-center"
      onClick={(e) => e.stopPropagation()}
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        className="w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/20 flex items-center justify-center"
      >
        <motion.div
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full"
        />
        <Check className="w-8 h-8 text-green-500 absolute" />
      </motion.div>

      <motion.h3
        id="success-title"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-2xl font-bold text-white mb-2"
      >
        Message Sent!
      </motion.h3>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-gray-400 mb-6"
      >
        Thank you for reaching out. I'll get back to you as soon as possible.
      </motion.p>

      <motion.button
        onClick={onClose}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-medium transition-all"
      >
        Close
      </motion.button>
    </motion.div>
  </motion.div>
);

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const formRef = useRef(null);

  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value.trim()) return "Name is required";
        if (value.trim().length < 2) return "Name must be at least 2 characters";
        return "";
      case "email":
        if (!value.trim()) return "Email is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email";
        return "";
      case "message":
        if (!value.trim()) return "Message is required";
        if (value.trim().length < 10) return "Message must be at least 10 characters";
        return "";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      name: validateField("name", formData.name),
      email: validateField("email", formData.email),
      message: validateField("message", formData.message),
    };

    if (Object.values(newErrors).some((error) => error)) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      await axios.post(`${BASE_URL}/contacts`, formData, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });

      setIsSuccess(true);
      setShowSuccessModal(true);

      setFormData({ name: "", email: "", message: "" });
      setErrors({});
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({
        form: error.response?.data?.message || 'Something went wrong. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setIsSuccess(false), 3000);
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    setIsSuccess(false);
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center lg:mt-[5%] mt-10 mb-2 sm:px-0 px-[5%]"
      >
        <motion.h2
          className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text"
          style={{ background: "linear-gradient(45deg, #6366f1 10%, #a855f7 93%)" }}
        >
          Contact Me
        </motion.h2>
        <motion.p
          className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2"
        >
          Got a question? Send me a message, and I'll get back to you soon.
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ delay: 0.2 }}
        className="h-auto py-10 flex items-center justify-center px-[5%] md:px-0"
        id="Contact"
      >
        <div className="container px-[1%] grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-[45%_55%] 2xl:grid-cols-[35%_65%] gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl p-5 py-10 sm:p-10 transform transition-all duration-300 hover:shadow-[#6366f1]/10"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex justify-between items-start mb-8"
            >
              <div>
                <h2 className="text-4xl font-bold mb-3 text-transparent bg-clip-text" style={{ background: "linear-gradient(45deg, #6366f1 10%, #a855f7 93%)" }}>
                  Get in Touch
                </h2>
                <p className="text-gray-400">
                  Have something to discuss? Send me a message and let's talk.
                </p>
              </div>
              <motion.div
                whileHover={{ rotate: 90, scale: 1.1 }}
                transition={{ duration: 0.3 }}
                className="w-10 h-10 text-[#6366f1] opacity-50"
              >
                <Share2 />
              </motion.div>
            </motion.div>

            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-5"
              noValidate
            >
              <FormField
                label="Your Name"
                name="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.name}
                disabled={isSubmitting}
                icon={User}
              >
                {formData.name && (
                  <motion.button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, name: "" }));
                      setErrors(prev => ({ ...prev, name: "" }));
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    aria-label="Clear name"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                )}
              </FormField>

              <FormField
                label="Your Email"
                name="email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.email}
                disabled={isSubmitting}
                icon={Mail}
              >
                {formData.email && (
                  <motion.button
                    type="button"
                    onClick={() => {
                      setFormData(prev => ({ ...prev, email: "" }));
                      setErrors(prev => ({ ...prev, email: "" }));
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                    aria-label="Clear email"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                )}
              </FormField>

              <TextAreaField
                label="Your Message"
                name="message"
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                error={errors.message}
                disabled={isSubmitting}
                icon={MessageSquare}
              />

              <AnimatePresence>
                {errors.form && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="text-red-400 text-sm text-center p-3 bg-red-500/10 rounded-lg"
                    role="alert"
                  >
                    {errors.form}
                  </motion.p>
                )}
              </AnimatePresence>

              <SubmitButton isSubmitting={isSubmitting} isSuccess={isSuccess} />
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-xl rounded-3xl p-3 py-3 md:p-10 md:py-8 shadow-2xl transform transition-all duration-300 hover:shadow-[#6366f1]/10"
          >
            <SocialLinks />
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showSuccessModal && <SuccessModal onClose={handleModalClose} />}
      </AnimatePresence>
    </>
  );
};

export default ContactPage;