import React, { useState } from 'react';
import { Modal, Form, Button, InputGroup } from 'react-bootstrap';
import { FaUser, FaPhone, FaEnvelope, FaCheckCircle, FaUserMd, FaTimes } from 'react-icons/fa';
import type { Doctor, ContactForm } from '../types';

interface ContactModalProps {
  show: boolean;
  doctor: Doctor | null;
  onHide: () => void;
  onSubmit: (form: ContactForm) => Promise<void>;
}

const ContactModal: React.FC<ContactModalProps> = ({ show, doctor, onHide, onSubmit }) => {
  const [form, setForm] = useState<ContactForm>({
    fullName: '',
    phone: '',
    email: '',
    doctorId: 0,
  });
  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<ContactForm> = {};
    
    if (!form.fullName || form.fullName.length < 2) {
      newErrors.fullName = 'Full name is required (min 2 characters)';
    }
    
    const phoneRegex = /^[\d-]+$/;
    if (!form.phone || !phoneRegex.test(form.phone)) {
      newErrors.phone = 'Valid phone number is required';
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email || !emailRegex.test(form.email)) {
      newErrors.email = 'Valid email is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !doctor) return;
    
    setLoading(true);
    try {
      await onSubmit({ ...form, doctorId: doctor.id });
      setSuccess(true);
      setTimeout(() => {
        onHide();
        setForm({ fullName: '', phone: '', email: '', doctorId: 0 });
        setSuccess(false);
        setErrors({});
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setForm({ fullName: '', phone: '', email: '', doctorId: 0 });
    setErrors({});
    setSuccess(false);
    onHide();
  };

  return (
    <Modal 
      show={show} 
      onHide={handleClose} 
      centered
      size="lg"
      className="contact-modal"
      style={{ direction: 'ltr' }}
    >
      <Modal.Header 
        className="border-0 pb-3 position-relative"
        style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px'
        }}
      >
        <Modal.Title className="d-flex align-items-center w-100">
          <FaUserMd className="me-2" />
          Contact {doctor?.fullName}
        </Modal.Title>
        <Button
          variant="link"
          onClick={handleClose}
          className="position-absolute"
          style={{
            right: '10px',
            top: '10px',
            padding: '8px 12px',
            borderRadius: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            color: 'white',
            fontSize: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            width: '40px',
            height: '40px'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
            e.currentTarget.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <FaTimes />
        </Button>
      </Modal.Header>
      
      <Modal.Body className="p-4" style={{ textAlign: 'left' }}>
        {success ? (
          <div className="text-center py-5">
            <FaCheckCircle size={60} className="text-success mb-3" />
            <h4 className="text-success">Message Sent Successfully!</h4>
            <p className="text-muted">We'll contact you soon.</p>
          </div>
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label className="fw-bold d-flex align-items-center">
                <FaUser className="me-2 text-primary" />
                Full Name *
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  isInvalid={!!errors.fullName}
                  placeholder="Enter your full name"
                  className="py-2"
                  style={{ 
                    borderRadius: '8px',
                    textAlign: 'left',
                    direction: 'ltr'
                  }}
                />
                <Form.Control.Feedback type="invalid" style={{ textAlign: 'left' }}>
                  {errors.fullName}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold d-flex align-items-center">
                <FaPhone className="me-2 text-success" />
                Phone Number *
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  isInvalid={!!errors.phone}
                  placeholder="052-1234567"
                  className="py-2"
                  style={{ 
                    borderRadius: '8px',
                    textAlign: 'left',
                    direction: 'ltr'
                  }}
                />
                <Form.Control.Feedback type="invalid" style={{ textAlign: 'left' }}>
                  {errors.phone}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold d-flex align-items-center">
                <FaEnvelope className="me-2 text-info" />
                Email Address *
              </Form.Label>
              <InputGroup>
                <Form.Control
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  isInvalid={!!errors.email}
                  placeholder="your.email@example.com"
                  className="py-2"
                  style={{ 
                    borderRadius: '8px',
                    textAlign: 'left',
                    direction: 'ltr'
                  }}
                />
                <Form.Control.Feedback type="invalid" style={{ textAlign: 'left' }}>
                  {errors.email}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>

            <div className="d-flex justify-content-end gap-3 mt-4">
              <Button 
                variant="outline-secondary" 
                onClick={handleClose} 
                disabled={loading}
                className="px-4 py-2"
                style={{ borderRadius: '8px' }}
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                type="submit" 
                disabled={loading}
                className="px-4 py-2"
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  borderRadius: '8px',
                  minWidth: '120px'
                }}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </Button>
            </div>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default ContactModal;