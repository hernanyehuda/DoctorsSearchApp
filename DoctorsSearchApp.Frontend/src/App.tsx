import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/custom.css';
import DoctorCard from './components/DoctorCard';
import FilterBar from './components/FilterBar';
import ContactModal from './components/ContactModal';
import { doctorsApi } from './services/api';
import type { Doctor, FilterOptions, ContactForm } from './types';
import { SortOption } from './types';

const App: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    showActiveOnly: false,
    showPayingOnly: false,
    sortBy: SortOption.RatingDesc,
  });

  const fetchDoctors = async (currentFilters: FilterOptions) => {
    setLoading(true);
    setError(null);
    try {
      const data = await doctorsApi.searchDoctors(currentFilters);
      setDoctors(data);
    } catch (err) {
      setError('Failed to load doctors. Please try again later.');
      console.error('Error fetching doctors:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors(filters);
  }, []);

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
    fetchDoctors(newFilters);
  };

  const handleContactClick = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setShowContactModal(true);
  };

  const handleContactSubmit = async (form: ContactForm) => {
    await doctorsApi.submitContactForm(form);
  };

  return (
    <Container className="py-5">
      <div className="text-center mb-5">
        <img 
          src="/src/assets/logo.png" 
          alt="Infomed Logo" 
          style={{ maxHeight: '80px' }}
          className="mb-3"
        />
        <h1 className="mb-4">Find Your Doctor</h1>
      </div>

      <FilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
      />

      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <>
          <div className="mb-3 text-muted">
            Found {doctors.length} doctor{doctors.length !== 1 ? 's' : ''}
          </div>
          <Row xs={1} md={2} lg={3} xl={4} className="g-4">
            {doctors.map((doctor) => (
              <Col key={doctor.id}>
                <DoctorCard
                  doctor={doctor}
                  onContact={handleContactClick}
                />
              </Col>
            ))}
          </Row>
        </>
      )}

      <ContactModal
        show={showContactModal}
        doctor={selectedDoctor}
        onHide={() => setShowContactModal(false)}
        onSubmit={handleContactSubmit}
      />
    </Container>
  );
};

export default App;