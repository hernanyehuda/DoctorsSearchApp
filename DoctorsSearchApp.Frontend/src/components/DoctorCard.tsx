import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { FaStar, FaPhone, FaMapMarkerAlt, FaLanguage, FaUserMd, FaAward } from 'react-icons/fa';
import type { Doctor } from '../types';

interface DoctorCardProps {
  doctor: Doctor;
  onContact: (doctor: Doctor) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onContact }) => {
  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <FaStar
        key={index}
        className={index < Math.round(rating) ? 'text-warning' : 'text-muted opacity-25'}
        size={18}
      />
    ));
  };

  const getPromotionBadge = () => {
    if (doctor.promotionLevel <= 2) {
      return { color: 'gold', label: 'Premium', gradient: 'linear-gradient(135deg, #FFD700, #FFA500)' };
    } else if (doctor.promotionLevel <= 5) {
      return { color: 'silver', label: 'Featured', gradient: 'linear-gradient(135deg, #C0C0C0, #808080)' };
    }
    return null;
  };

  const promotionBadge = getPromotionBadge();

  return (
    <Card className="doctor-card h-100 shadow-sm position-relative overflow-hidden">
      {promotionBadge && (
        <div 
          className="position-absolute top-0 end-0 px-3 py-1"
          style={{
            background: promotionBadge.gradient,
            borderBottomLeftRadius: '12px',
            zIndex: 10
          }}
        >
          <small className="text-white fw-bold d-flex align-items-center">
            <FaAward className="me-1" size={12} />
            {promotionBadge.label}
          </small>
        </div>
      )}
      
      <Card.Body className="d-flex flex-column p-4">
        <div className="text-center mb-4">
          <div 
            className="mx-auto mb-3 d-flex align-items-center justify-content-center"
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            <FaUserMd size={40} color="white" />
          </div>
          
          <h5 className="mb-2 fw-bold">{doctor.fullName}</h5>
          
          {doctor.mainSpecialty && (
            <Badge 
              bg="none"
              className="px-3 py-2"
              style={{
                background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
                color: '#1976d2',
                fontWeight: '500'
              }}
            >
              Specialty: {doctor.mainSpecialty}
            </Badge>
          )}
        </div>

        <div className="rating-section mb-3 text-center">
          <div className="d-flex align-items-center justify-content-center mb-1">
            {renderStars(doctor.rating)}
          </div>
          <small className="text-muted">
            {doctor.totalRatings > 0 
              ? `${doctor.rating.toFixed(1)} • ${doctor.totalRatings} reviews`
              : 'No reviews yet'
            }
          </small>
        </div>

        <div className="flex-grow-1">
          <div className="info-item d-flex align-items-start mb-3 px-3 py-2 rounded-3"
               style={{ backgroundColor: '#f8f9fa', minHeight: '40px' }}>
            {doctor.address ? (
              <>
                <FaMapMarkerAlt className="text-primary mt-1 me-2 flex-shrink-0" size={16} />
                <small className="text-muted">{doctor.address}</small>
              </>
            ) : (
              <small className="text-muted fst-italic">No address available</small>
            )}
          </div>

          <div className="info-item d-flex align-items-center mb-3 px-3 py-2 rounded-3"
               style={{ backgroundColor: '#f8f9fa', minHeight: '40px' }}>
            {doctor.phone ? (
              <>
                <FaPhone className="text-success me-2 flex-shrink-0" size={16} />
                <a href={`tel:${doctor.phone}`} className="text-decoration-none text-success fw-medium">
                  {doctor.phone}
                </a>
              </>
            ) : (
              <small className="text-muted fst-italic">No phone available</small>
            )}
          </div>

          <div className="info-item d-flex align-items-center mb-4 px-3 py-2 rounded-3"
               style={{ backgroundColor: '#f8f9fa', minHeight: '40px' }}>
            {doctor.languages && doctor.languages.length > 0 ? (
              <>
                <FaLanguage className="text-info me-2 flex-shrink-0" size={16} />
                <small className="text-info">{doctor.languages.join(' • ')}</small>
              </>
            ) : (
              <small className="text-muted fst-italic">No languages specified</small>
            )}
          </div>
        </div>

        <Button 
          variant="primary" 
          className="w-100 mt-auto contact-btn"
          onClick={() => onContact(doctor)}
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            border: 'none',
            padding: '12px',
            fontWeight: '600',
            borderRadius: '10px',
            fontSize: '16px'
          }}
        >
          Contact Doctor
        </Button>
      </Card.Body>
    </Card>
  );
};

export default DoctorCard;